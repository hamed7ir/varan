#! /bin/sh
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

# Application Basename and Vendor
# MOZ_APP_BASENAME and MOZ_APP_VENDOR must not have spaces.
# These values where appropriate are hardcoded in application.ini
# to "Pale Moon" and "Moonchild Productions" respectively for
# Pale Moon
MOZ_APP_BASENAME=Palemoon
MOZ_APP_VENDOR=Moonchild

# Varan (rename): the executable name. Defaults from MOZ_APP_BASENAME (-> palemoon.exe); pin it to
# "varan" so the binary is varan.exe. UA-safe: MOZ_APP_UA_NAME (below) is what the UA uses, not this.
MOZ_APP_NAME=varan

# Varan (rename): the PROFILE ROOT. Sets application.ini's "Profile" field, which
# nsXREDirProvider.cpp:1523-1534 uses on Windows as
#     Profile non-empty -> %APPDATA%\<Profile>\
#     otherwise         -> %APPDATA%\<Vendor>\<Name>\
# so this yields %APPDATA%\Varan\ instead of %APPDATA%\Moonchild Productions\Pale Moon\.
#
# WHY THIS LEVER AND NOT MOZ_APP_VENDOR/MOZ_APP_BASENAME: application.ini HARDCODES
# Vendor= and Name= with the @MOZ_APP_VENDOR@/@MOZ_APP_BASENAME@ lines commented out
# directly above them (upstream does this to get the space in "Pale Moon"), so editing
# those two variables would not change the packaged file at all. MOZ_APP_PROFILE is
# live: AC_SUBST at old-configure.in:4813 -> uxp/build/moz.build:35-36 -> the #ifdef
# already present in app/application.ini. It also avoids %APPDATA%\Varan\Varan\.
#
# !! MOVING THIS ORPHANS ANY EXISTING PROFILE. Bookmarks, history, hand-set prefs and
# installed extensions stay at the old path and a fresh profile is created silently.
# Release-note it; on VENICE the old tree must be copied by hand if it matters.
MOZ_APP_PROFILE=Varan

# Varan (rename): pin the UA app token so the Varan display rebrand cannot leak into the
# User-Agent. Empty MOZ_APP_UA_NAME => nsHttpHandler.cpp:319-326 falls back to application.ini
# Name ("Pale Moon" -> stripped "PaleMoon"); pinning it here short-circuits that chain so the UA
# app token stays byte-identical ("PaleMoon/<ver>") regardless of any downstream branding change.
# Google sign-in + YouTube are proven on this exact UA. Do NOT change this token.
MOZ_APP_UA_NAME=PaleMoon

# Application Version
# MOZ_APP_VERSION is read from ./config/version.txt
# MOZ_APP_VERSION_DISPLAY is not used in Pale Moon so set it
# to MOZ_APP_VERSION
MOZ_APP_VERSION=`cat ${_topsrcdir}/$MOZ_BUILD_APP/config/version.txt`
MOZ_APP_VERSION_DISPLAY=$MOZ_APP_VERSION

# Application ID
# This is a unique identifier used for the application
# Most frequently the AppID is used for targetApplication
# in extensions and for chrome manifests
MOZ_APP_ID={8de7fcbb-c55c-4fbe-bfc5-fc555c87dbc4}

# Use static Application INI File
MOZ_APP_STATIC_INI=1

# Application Branding
# The default is MOZ_BRANDING_DIRECTORY and should never point to
# official branding by default.
# Changing MOZ_*BRANDING_DIRECTORY requires a clobber because branding
# dependencies are broken.
# MOZ_APP_DISPLAYNAME will be set by [branding]/configure.sh
MOZ_BRANDING_DIRECTORY=palemoon/branding/unofficial
MOZ_OFFICIAL_BRANDING_DIRECTORY=palemoon/branding/official

# Enables conditional code in the platform for Pale Moon only
MC_PALEMOON=1

# Enables conditional code in the platform for historically
# Firefox-like browsers
MOZ_PHOENIX=1

# Lightweight Themes
MOZ_PERSONAS=1

# Which SIMD set the installer should check for on 64-bit.
# Default set in configure script, can be overridden here.
# INSTALLER_ARCH="AVX"

# Browser Feature: Profile Migration Component
MOZ_PROFILE_MIGRATOR=

# Platform Feature: Application Update Service
# MAR_CHANNEL_ID must not contained the follow 3 characters: ",\t"
# ACCEPTED_MAR_CHANNEL_IDS should usually be the same as MAR_CHANNEL_ID
# If more than one ID is needed, then you should use a comma seperated list.
MOZ_UPDATER=
MAR_CHANNEL_ID=unofficial
ACCEPTED_MAR_CHANNEL_IDS=unofficial,unstable,beta,release

# Platform Feature: Developer Tools
# XXX: Devtools are disabled until they can be made to work with Pale Moon
MOZ_DEVTOOLS=1

# Platform Feature: Dual-GUID system
# Allows the installation of Firefox GUID targeted extensions despite having
# a different Application ID.
UXP_APPCOMPAT_GUID=1

# Platform Feature: Sync Service
MOZ_SERVICES_COMMON=1
MOZ_SERVICES_SYNC=1

# Platform Feature: JS based Downloads Manager
MOZ_JSDOWNLOADS=1

# Platform Feature: Conformant WebGL
# Exposes the "webgl" context name, which is reserved for
# conformant implementations.
MOZ_WEBGL_CONFORMANT=1

# Platform Feature: Enable drawing in the titlebar on Windows
if test "$OS_ARCH" = "WINNT"; then
  MOZ_CAN_DRAW_IN_TITLEBAR=1
fi

# Set the chrome packing format
# Possible values are omni, jar, and flat
# Currently, only omni and flat are supported
MOZ_CHROME_FILE_FORMAT=omni
JAR_COMPRESSION=brotli
OMNIJAR_NAME=palemoon.res

# Include bundled fonts by default on Windows and GTK
if test "$MOZ_WIDGET_TOOLKIT" = "windows" -o \
        "$MOZ_WIDGET_TOOLKIT" = "gtk2" -o \
        "$MOZ_WIDGET_TOOLKIT" = "gtk3"; then
  MOZ_BUNDLED_FONTS=1
fi

# Short-circuit a few services to be removed
MOZ_SERVICES_HEALTHREPORT=

