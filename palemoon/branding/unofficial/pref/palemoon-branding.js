/* This Source Code Form is subject to the terms of the Mozilla Public
   License, v. 2.0. If a copy of the MPL was not distributed with this
   file, You can obtain one at http://mozilla.org/MPL/2.0/. */

pref("app.vendorURL", "http://www.palemoon.org/");
pref("browser.identity.ssl_domain_display", 1);
pref("browser.newtab.url","about:blank");
pref("extensions.getMoreThemesURL", "https://addons.palemoon.org/themes/");
pref("extensions.update.autoUpdateDefault", true);
pref("extensions.getAddons.maxResults", 10);
pref("extensions.getAddons.cache.enabled", false);
// Varan v1.1 (B1): the two dom.max_*script_run_time prefs were REMOVED from here.
//
// Default pref files load REVERSE-ALPHABETICALLY (modules/libpref/Preferences.cpp,
// pref_CompareFileNames returns Compare(filename2, filename1), and the doc comment
// above it says so), giving the order:
//     palemoon.js  ->  palemoon-l10n.js  ->  palemoon-branding.js  ->  devtools.js
// The LAST write wins, so these two lines silently overrode the deliberate,
// device-evidenced values in palemoon/app/profile/palemoon.js:566 and :586.
// max_script_run_time shipped as 20 instead of 0 and max_chrome as 90 instead of 30:
// the fix at palemoon.js:586 HAD NEVER BEEN IN EFFECT IN ANY BUILD.
//
// It matters because palemoon.js:574-585 records why 0 was chosen, from a device trip:
// at a non-zero limit the browser raises a MODAL "Unresponsive script" dialog over
// kevlar_base_sync_mod_chunk; the dialog blocks the main thread, so the page stalls and
// PLAYING VIDEO STOPS behind it. 15 s of script is normal on this device when a whole
// page load is 23-135 s, so any threshold is wrong. Shipping 20 was exactly the
// configuration that finding says breaks the device.
//
// Defined in ONE place now: palemoon/app/profile/palemoon.js. Do not re-add them here.
pref("plugin.expose_full_path", true);
pref("dom.ipc.plugins.timeoutSecs", 20);
pref("nglayout.initialpaint.delay", 300);
pref("image.mem.max_ms_before_yield", 50);
pref("image.mem.decode_bytes_at_a_time", 65536);

pref("geo.wifi.uri", "http://ip-api.com/json/?fields=lat,lon,status,message");

pref("services.sync.serverURL","https://pmsync.palemoon.org/sync/index.php/");
pref("services.sync.jpake.serverURL","https://keyserver.palemoon.org/");
pref("services.sync.termsURL", "http://www.palemoon.org/sync/terms.shtml");
pref("services.sync.privacyURL", "http://www.palemoon.org/sync/privacy.shtml");
pref("services.sync.statusURL", "https://pmsync.palemoon.org/status/");
pref("services.sync.syncKeyHelpURL", "http://www.palemoon.org/sync/help/recoverykey.shtml");
pref("services.sync.APILevel", 1);

pref("accessibility.force_disabled", 1);
pref("devtools.selfxss.count", 5);
pref("startup.homepage_welcome_url","http://www.palemoon.org/unofficial.shtml");
pref("startup.homepage_override_url","http://www.palemoon.org/unofficial.shtml");
pref("app.releaseNotesURL", "http://www.palemoon.org/releasenotes.shtml");
pref("app.update.enabled", false);
pref("app.update.url", "");
