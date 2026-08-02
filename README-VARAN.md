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
