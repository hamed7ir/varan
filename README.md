# Varan — a Pale Moon fork for ARM32 Windows RT

Varan is [Pale Moon](https://www.palemoon.org/) built for **32-bit ARM Windows RT**
(Surface RT / Surface 2, Tegra 3 / Cortex-A9), a target upstream does not build for.
This repository is the **application** half; the platform half is
[varan-uxp](https://github.com/hamed7ir/varan-uxp).

> **This is not Pale Moon and is not endorsed by or affiliated with Moonchild
> Productions.** Pale Moon's name and logo are their trademarks; the branding and
> logo assets have been removed from this fork per their redistribution terms.
> Report bugs here, never to the Pale Moon project.

## Provenance

| | |
|---|---|
| upstream | `https://repo.palemoon.org/MoonchildProductions/Pale-Moon` |
| fork point | `0d869b85feca1409f5aadb55e6eaabb08db134ad` — Pale Moon **34.3.1_Release** |
| platform | [varan-uxp](https://github.com/hamed7ir/varan-uxp), fork point `659c690d5b34cc3e46c5ba8a6e00f134d8d20c35` (UXP `RB_20260624`) |

GitHub cannot draw a fork relationship to a Gitea-hosted upstream, so the fork
point is recorded here instead. `git merge-base HEAD <fork point>` should return
the fork point exactly; if it does not, this README is stale.

The app and platform fork points are the **exact pair** — the `platform` gitlink
in upstream `0d869b85` is `659c690d`. Building against a mismatched pair is not
supported.

## Building

`platform/` must be the **varan-uxp** tree, not upstream UXP. Build from this
directory (it is the topsrcdir). See `RELEASE-BUILD.md` in the build tree for the
release configuration and the gates that verify a build.

## "VENICE" in the comments

**VENICE is the test device** — a Surface RT (Tegra 3, 4×Cortex-A9, Windows RT
8.1). Source comments name it when recording something that was proven *on real
silicon* rather than reasoned about: `"VENICE's I-cache is device-proven NOT
auto-coherent"` means someone measured that, and the distinction between measured
and assumed is load-bearing in a port like this one. The name is kept
deliberately.

## Licence

Mozilla Public License 2.0, as upstream. Modifications are disclosed by the git
history: every Varan commit is prefixed `Varan:` and the full diff against the
fork point above is the complete set of changes.

Upstream copyright notices are preserved. Pale Moon trademark **assets** are
removed; where the upstream name is retained it is either an MPL attribution
requirement or a compatibility token (the User-Agent deliberately still reports
`PaleMoon/34.3.1`, because changing it breaks site compatibility that this port
depends on).

## Diagnostics shipped in release builds

`VaranPhases` (six-phase main-thread accounting) is compiled in and **inert
unless** `VARAN_PHASES` is set in the environment. It writes nothing when off.
Disclosed here rather than left to be discovered.

---

# Building

Everything below has been run end to end from a clean clone. If a step here is
wrong, that is a bug — please report it.

**Host:** 64-bit Windows. The target is ARM32, so this is always a cross-compile;
you cannot build this on the Surface itself.
**Time:** ~50 minutes for a clobber build on a modern 8-core desktop.

## 1. Prerequisites

| | |
|---|---|
| **MozillaBuild 3.x** | `d:\mozilla-build` — provides the MSYS shell, `mozmake`, Python 3 |
| **LLVM / clang-cl 18** | `C:\Program Files\LLVM`. **18.1.8 is what this is built and tested with.** Newer may work; the toolchain-bug workarounds in this tree are calibrated to 18. |
| **MSVC 14.16** (VS2017 toolset) | for the **ARM** libraries |
| **Windows SDK 10.0.19041.0** | ARM libraries + `d3dcompiler_47.dll` |
| **NSIS 3.01** | on `PATH` |

### 1a. The host x64 library directories

The build links **host** tools as x64 while targeting ARM32, so it needs x64
import libraries on `HOST_LDFLAGS`. These are **Microsoft's and cannot be
redistributed here**, so collect them yourself into three directories:

```
hostx64-crt/    from  <VS>\VC\Tools\MSVC\14.16.*\lib\x64
hostx64-ucrt/   from  <SDK>\Lib\10.0.19041.0\ucrt\x64
hostx64-um/     from  <SDK>\Lib\10.0.19041.0\um\x64
```

Point `HOST_LDFLAGS` at wherever you put them (see the mozconfig below).

## 2. Get the source — two repositories

`platform/` is a submodule and **must be varan-uxp, not upstream UXP**. Upstream
does not contain the Varan commits and the checkout will fail.

```bash
git clone https://github.com/hamed7ir/varan.git
cd varan
git submodule update --init          # pulls varan-uxp into platform/
```

Fork points, which `git merge-base` should reproduce exactly:

| repo | fork point | upstream |
|---|---|---|
| `varan` | `0d869b85` (Pale Moon **34.3.1_Release**) | `repo.palemoon.org/MoonchildProductions/Pale-Moon` |
| `varan-uxp` | `659c690d` (UXP **RB_20260624**) | `repo.palemoon.org/MoonchildProductions/UXP` |

These are the **exact pair** — upstream `0d869b85`'s own gitlink is `659c690d`.

## 3. Build the ARM EABI shim

Tegra 3 has no hardware integer divide, and the MSVC ARM CRT does not ship the
combined `__aeabi_*divmod` helpers that SpiderMonkey names:

```bash
sh platform/build/varan/build-aeabi-shim.sh     # produces aeabi-shim.lib beside itself
```

## 4. mozconfig

Save as `mozconfig-varan` next to the source, adjusting the five absolute paths:

```sh
mk_add_options MOZ_OBJDIR=D:/repo/varan-release/obj-release
mk_add_options AUTOCLOBBER=1
mk_add_options MOZ_MAKE_FLAGS="-j8 -k"

ac_add_options --enable-application=palemoon
ac_add_options --target=armv7-pc-mingw32
ac_add_options --host=x86_64-pc-mingw32

export CC="clang-cl --target=thumbv7-unknown-windows-msvc -fuse-ld=lld"
export CXX="clang-cl --target=thumbv7-unknown-windows-msvc -fuse-ld=lld"
export CFLAGS="-FI<path>/platform/build/varan/arm-winnt-shim.h -Wno-error=c++11-narrowing"
export CXXFLAGS="-FI<path>/platform/build/varan/arm-winnt-shim.h -Wno-error=c++11-narrowing"
export HOST_CC="clang-cl"
export HOST_CXX="clang-cl"
export LD="lld-link"
export AR="llvm-lib"
export LDFLAGS="<path>/aeabi-shim.lib"
export HOST_LDFLAGS="-LIBPATH:<path>/hostx64-crt -LIBPATH:<path>/hostx64-ucrt -LIBPATH:<path>/hostx64-um"

ac_add_options --enable-optimize="-O2 -Oi"
ac_add_options --enable-ctypes
ac_add_options --disable-tests
ac_add_options --disable-updater
ac_add_options --disable-npapi
ac_add_options --disable-crashreporter
ac_add_options --disable-maintenance-service
ac_add_options --disable-accessibility
ac_add_options --disable-trace-logging
```

⚠️ **`MOZ_OBJDIR` must be a Windows-style path** (`D:/...`), not MSYS (`/d/...`).
`client.mk` cannot resolve the MSYS form and fails with
`No rule to make target '.../config.status'` — while `config.status` sits at
exactly that path.

⚠️ **`--enable-optimize="-O2 -Oi"` is not optional.** The default is `-O1`, and
**clang-cl lowers `-O1` to `-Os`** — the entire browser builds optimised for size
unless you set this.

## 5. Build

`mach` needs the MozillaBuild login shell, not a plain Git-Bash:

```bash
d:/mozilla-build/msys/bin/bash.exe --login
export MOZCONFIG=/path/to/mozconfig-varan
cd /path/to/varan
./mach build
```

## 6. Post-link fixups — MANDATORY

⚠️ **A build that skips this produces binaries that crash on the device.**
Two clang-cl/lld codegen defects are corrected *after* linking, and **any relink
wipes them**:

- **vcall thunks** — clang-cl emits MSVC virtual pointer-to-member thunks using
  `r1` (AAPCS arg1) as scratch instead of `r12`, destroying the first argument of
  any virtual member-function-pointer call. Corrected by a link-time COMDAT
  override.
- **`__imp_` Thumb bit** — lld writes a local `__imp_` pointer to a statically
  folded function without bit 0 set, so `blx` enters ARM state and faults. A
  post-link 1-bit fix.

Both are applied, with their gates, by `varan-fixup.sh` from the build tooling.

## 7. Verify

A passing run reports, with denominators:

```
thunks examined = 178  (correct=178 broken=0 unresolved=0)
GATE PASS: all 178 vcall thunks use r12 (arg1 preserved)
GATE PASS: ... all local .text function pointers have the Thumb bit
gate-branding: PASS
gate-release:  PASS
```

Every machine-code artifact must be **ARMNT (`0x1C4`) and Thumb-2**. A32 passes
every build check and then fails *intermittently* on hardware, because Windows RT
drops `CPSR.T` across preemption. Verify by disassembly, never by "it linked".

## 8. Install on the device

Windows RT will not load unsigned ARM binaries under its default policy. Varan
requires the device to be in **test-signing mode** — the supported Microsoft
mechanism for running self-signed code, not a modification of Windows.

1. Put the device in test-signing mode.
2. Copy the **entire** `dist/bin` folder to the device.
   ⚠️ **Never copy `xul.dll` alone.** Configure-level changes make the whole
   folder a matched set; a partial swap gives "entry point not found".
3. Run `varan.exe`.

The profile is created at `%APPDATA%\Varan\`.

## Known issues

Honest ones, on a 2012 Tegra 3:

- **Page load is slow** — a cold YouTube watch page is ~60 s. Network is only
  2.7–5.4% of that; the rest is local processing, and the main thread is blocked
  57–74% of the post-DOMContentLoaded window.
- **Video can stall on a cold tab.** MSE buffer operations are main-thread, so a
  long script entry starves them.
- **WebGL is off by default** — deliberate; no usable GPU path on Tegra 3 here.
- **wasm/asm.js are off.**
- **Hardware H.264 is off.** Forcing it (`media.hardware-video-decoding.force-enabled`)
  is **device-proven to break H.264 decoding entirely** — do not set it. Software
  H.264 decodes fine.
- **One unreproduced crash** — heap corruption on the touch-keyboard (TSF) path,
  seen once.
- `too much recursion` appears in the console on YouTube. This is **not** a Varan
  defect: desktop Pale Moon logs the same errors at the same lines.

## Diagnostics

`VaranPhases` (six-phase main-thread accounting) is compiled in and **inert
unless** `VARAN_PHASES` is set. `MOZ_LOG` is available as upstream. Neither writes
anything unless you ask it to.
