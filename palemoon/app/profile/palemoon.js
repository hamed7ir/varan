# -*- Mode: JavaScript; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 2 -*-
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

// XXX Toolkit-specific preferences should be moved into toolkit.js

#filter substitution

#
# SYNTAX HINTS:
#
#  - Dashes are delimiters; use underscores instead.
#  - The first character after a period must be alphabetic.
#  - Computed values (e.g. 50 * 1024) don't work.
#

#ifdef XP_UNIX
#ifndef XP_MACOSX
#define UNIX_BUT_NOT_MAC
#endif
#endif

#ifdef MOZ_WIDGET_GTK
#if MOZ_WIDGET_GTK == 2
#define NOT_GTK3
#endif
#endif

#ifndef MOZ_WIDGET_GTK
#define NOT_GTK3
#endif

pref("browser.chromeURL","chrome://browser/content/");
pref("browser.hiddenWindowChromeURL", "chrome://browser/content/hiddenWindow.xul");

// Display the "Get Add-ons" pane in the Add-on Manager
pref("extensions.getAddons.showPane", true);

// Enables some extra Extension System Logging (can reduce performance)
pref("extensions.logging.enabled", false);

// Disables strict compatibility, making addons compatible-by-default.
pref("extensions.strictCompatibility", false);

// Specifies a minimum maxVersion an addon needs to say it's compatible with
// for it to be compatible by default.
pref("extensions.minCompatibleAppVersion", "1.5");

pref("extensions.guid.appCompatVersion", "56.9");
pref("extensions.guid.appCompatId", "{ec8030f7-c20a-464f-9b0e-13a3a9e97384}");

#define AM_DOMAIN addons.palemoon.org
#define AM_AUS_ARGS reqVersion=%REQ_VERSION%&id=%ITEM_ID%&version=%ITEM_VERSION%&maxAppVersion=%ITEM_MAXAPPVERSION%&status=%ITEM_STATUS%&appID=%APP_ID%&appVersion=%APP_VERSION%&appOS=%APP_OS%&appABI=%APP_ABI%&locale=%APP_LOCALE%&currentAppVersion=%CURRENT_APP_VERSION%&updateType=%UPDATE_TYPE%&compatMode=%COMPATIBILITY_MODE%

// Preferences for AMO integration
pref("extensions.getAddons.cache.enabled", false);
pref("extensions.getAddons.maxResults", 10);
pref("extensions.getAddons.get.url", "https://@AM_DOMAIN@/?component=integration&type=internal&request=get&addonguid=%IDS%&os=%OS%&version=%VERSION%");
pref("extensions.getAddons.getWithPerformance.url", "https://@AM_DOMAIN@/?component=integration&type=internal&request=get&addonguid=%IDS%&os=%OS%&version=%VERSION%");
pref("extensions.getAddons.search.browseURL", "https://@AM_DOMAIN@/search/?terms=%TERMS%");
pref("extensions.getAddons.search.url", "https://@AM_DOMAIN@/?component=integration&type=internal&request=search&q=%TERMS%&locale=%LOCALE%&os=%OS%&version=%VERSION%");
pref("extensions.webservice.discoverURL", "http://@AM_DOMAIN@/?component=discover");
pref("extensions.getAddons.recommended.url", "https://@AM_DOMAIN@/?component=integration&type=internal&request=recommended&locale=%LOCALE%&os=%OS%");
pref("extensions.getAddons.browseAddons", "http://@AM_DOMAIN@/");
pref("extensions.getAddons.recommended.browseURL", "https://@AM_DOMAIN@/?component=integration&type=external&request=recommended");

// Blocklist preferences
pref("extensions.blocklist.enabled", true);
pref("extensions.blocklist.interval", 86400);
pref("extensions.blocklist.level.updated", false);
// Controls what level the blocklist switches from warning about items to forcibly
// blocking them.
pref("extensions.blocklist.level", 2);
pref("extensions.blocklist.url", "https://blocklist.palemoon.org/?version=%VERSION%");
pref("extensions.blocklist.detailsURL", "https://blocklist.palemoon.org/about.shtml");
pref("extensions.blocklist.itemURL", "https://blocklist.palemoon.org/info/?id=%blockID%");

pref("extensions.update.autoUpdateDefault", true);

// Disable add-ons that are not installed by the user in all scopes by default.
// See the SCOPE constants in AddonManager.jsm for values to use here.
pref("extensions.autoDisableScopes", 15);

// Dictionary download preference
pref("browser.dictionaries.download.url", "https://@AM_DOMAIN@/dictionaries/");

// Get More Tools link URL
pref("browser.getdevtools.url","https://@AM_DOMAIN@/?component=integration&type=external&request=devtools");

// Feedback URL
pref("browser.feedback.url", "https://forum.palemoon.org");

// Help button in slow startup dialog
pref("browser.slowstartup.help.url", "http://www.palemoon.org/support/slowstartup.shtml");

// Whether to escape to a content-less page if a user presses "Get me out of here"
// on a network error page (e.g. cert error)
pref("browser.escape_to_blank", false);

// The minimum delay in seconds for the timer to fire.
// default=2 minutes
pref("app.update.timerMinimumDelay", 120);

// App-specific update preferences

// The interval to check for updates (app.update.interval) is defined in
// palemoon-branding.js

// Alternative windowtype for an application update user interface window. When
// a window with this windowtype is open the application update service won't
// open the normal application update user interface window.
pref("app.update.altwindowtype", "Browser:About");

// Enables some extra Application Update Logging (can reduce performance)
pref("app.update.log", false);

// The number of general background check failures to allow before notifying the
// user of the failure. User initiated update checks always notify the user of
// the failure.
pref("app.update.backgroundMaxErrors", 10);

// When |app.update.cert.requireBuiltIn| is true or not specified the
// final certificate and all certificates the connection is redirected to before
// the final certificate for the url specified in the |app.update.url|
// preference must be built-in.
pref("app.update.cert.requireBuiltIn", false);

// When |app.update.cert.checkAttributes| is true or not specified the
// certificate attributes specified in the |app.update.certs.| preference branch
// are checked against the certificate for the url specified by the
// |app.update.url| preference.
pref("app.update.cert.checkAttributes", true);

// The number of certificate attribute check failures to allow for background
// update checks before notifying the user of the failure. User initiated update
// checks always notify the user of the certificate attribute check failure.
pref("app.update.cert.maxErrors", 5);

// The |app.update.certs.| preference branch contains branches that are
// sequentially numbered starting at 1 that contain attribute name / value
// pairs for the certificate used by the server that hosts the update xml file
// as specified in the |app.update.url| preference. When these preferences are
// present the following conditions apply for a successful update check:
// 1. the uri scheme must be https
// 2. the preference name must exist as an attribute name on the certificate and
//    the value for the name must be the same as the value for the attribute name
//    on the certificate.
// If these conditions aren't met it will be treated the same as when there is
// no update available. This validation will not be performed when the
// |app.update.url.override| user preference has been set for testing updates or
// when the |app.update.cert.checkAttributes| preference is set to false. Also,
// the |app.update.url.override| preference should ONLY be used for testing.
//
// Examples:
// pref("app.update.certs.1.issuerName", "CN=COMODO RSA Domain Validation Secure Server CA,O=COMODO CA Limited,L=Salford,ST=Greater Manchester,C=GB");
// pref("app.update.certs.1.commonName", "*.palemoon.org");
//
// Note: these preferences are branding-specific and should be listed in
// application branding, depending on publisher.

// Whether or not app updates are enabled
//
// Varan: DISABLED, and this is a SAFETY decision rather than a branding one.
// app.update.url (below) points at aus.palemoon.org and carries %BUILD_TARGET%.
// There is no Varan update infrastructure, so the only possible outcomes of a
// live check are (a) nothing, or (b) upstream answering about a target it has
// never built -- and an offer of an x86 build to an ARM32 install is the bad
// case. app.update.auto=false only suppresses silent INSTALL; the check and the
// offer still happen, so that is not sufficient on its own.
//
// The URL is deliberately left in place as documentation of where updates would
// come from if Varan ever publishes them. Re-enable this pref at the same time
// as pointing app.update.url somewhere real, never before.
pref("app.update.enabled", false);

// This preference turns on app.update.mode and allows automatic download and
// install to take place. We use a separate boolean toggle for this to make
// the UI easier to construct.
pref("app.update.auto", false);

// See chart in nsUpdateService.js source for more details
pref("app.update.mode", 1);

// If set to true, the Update Service will present no UI for any event.
pref("app.update.silent", false);

// If set to true, the Update Service will apply updates in the background
// when it finishes downloading them.
pref("app.update.staging.enabled", true);

// Update service URL:
pref("app.update.url", "https://aus.palemoon.org/?application=%PRODUCT%&version=%VERSION%&arch=%BUILD_TARGET%&SSE2=%CPU_SSE2%&AVX=%CPU_AVX%&AVX2=%CPU_AVX2%&flavor=%BUILD_SPECIAL%&toolkit=%WIDGET_TOOLKIT%&buildid=%BUILD_ID%&channel=%CHANNEL%");
// app.update.url.manual is in branding section
// app.update.url.details is in branding section

// User-settable override to app.update.url for testing purposes.
//pref("app.update.url.override", "");

// app.update.interval is in branding section
// app.update.promptWaitTime is in branding section

// Show the Update Checking/Ready UI when the user was idle for x seconds
pref("app.update.idletime", 180);

// Whether or not we show a dialog box informing the user that the update was
// successfully applied. This is off in Firefox by default since we show a 
// upgrade start page instead! Other apps may wish to show this UI, and supply
// a whatsNewURL field in their brand.properties that contains a link to a page
// which tells users what's new in this new update.
pref("app.update.showInstalledUI", false);

// 0 = suppress prompting for incompatibilities if there are updates available
//     to newer versions of installed addons that resolve them.
// 1 = suppress prompting for incompatibilities only if there are VersionInfo
//     updates available to installed addons that resolve them, not newer
//     versions.
pref("app.update.incompatible.mode", 0);

// Symmetric (can be overridden by individual extensions) update preferences.
// e.g.
//  extensions.{GUID}.update.enabled
//  extensions.{GUID}.update.url
//  .. etc ..
//
pref("extensions.update.enabled", true);
pref("extensions.update.url", "https://@AM_DOMAIN@/?component=aus&@AM_AUS_ARGS@");
pref("extensions.update.interval", 86400);  // Check for updates to Extensions and 
                                            // Themes every day
// Non-symmetric (not shared by extensions) extension-specific [update] preferences
pref("extensions.dss.enabled", false);          // Dynamic Skin Switching                                               
pref("extensions.dss.switchPending", false);    // Non-dynamic switch pending after next
                                                // restart.

pref("extensions.{972ce4c6-7e08-4474-a285-3208198ce6fd}.name", "chrome://browser/locale/browser.properties");
pref("extensions.{972ce4c6-7e08-4474-a285-3208198ce6fd}.description", "chrome://browser/locale/browser.properties");

pref("xpinstall.whitelist.required", false);
// Allow installing XPI add-ons by direct URL requests (no referrer)
pref("xpinstall.whitelist.directRequest", true);
// Allow installing XPI add-ons from file referrers (chrome/file)
pref("xpinstall.whitelist.fileRequest", true);

pref("extensions.install.requireBuiltInCerts", false);
// Only allow installation of extensions from https, chrome or file schemes
pref("extensions.install.requireSecureOrigin", false);
// Allow installation of distribution/bundles extensions
pref("extensions.installDistroAddons", true);

pref("lightweightThemes.update.enabled", true);
pref("lightweightThemes.animation.enabled", false);

pref("keyword.enabled", true);

pref("general.useragent.locale", "@AB_CD@");
pref("general.skins.selectedSkin", "classic/1.0");

// Native UA mode by default for unbranded
pref("general.useragent.compatMode", 0);
pref("general.useragent.compatMode.gecko", false);
pref("general.useragent.compatMode.firefox", false);

pref("general.smoothScroll", true);
#ifdef UNIX_BUT_NOT_MAC
pref("general.autoScroll", false);
#else
pref("general.autoScroll", true);
#endif

pref("general.useragent.complexOverride.moodle", false); // bug 797703

// At startup, check if we're the default browser and prompt user if not.
pref("browser.shell.checkDefaultBrowser", true);
pref("browser.shell.shortcutFavicons",true);
pref("browser.shell.mostRecentDateSetAsDefault", "");
pref("browser.shell.skipDefaultBrowserCheckOnFirstRun", false);
pref("browser.shell.skipDefaultBrowserCheck", true);
pref("browser.shell.defaultBrowserCheckCount", 0);
pref("browser.defaultbrowser.notificationbar", false);

// 0 = blank, 1 = home (browser.startup.homepage), 2 = last visited page, 3 = resume previous browser session
// The behavior of option 3 is detailed at: http://wiki.mozilla.org/Session_Restore
pref("browser.startup.page",                1);
pref("browser.startup.homepage",            "chrome://branding/locale/browserconfig.properties");

pref("browser.slowStartup.notificationDisabled", false);
pref("browser.slowStartup.timeThreshold", 60000);
pref("browser.slowStartup.maxSamples", 5);

pref("browser.enable_automatic_image_resizing", true);
pref("browser.chrome.site_icons", true);
pref("browser.chrome.favicons", true);
// If enabled, will process favicons by drawing them on a canvas,
// optimizing display size for the UI. This also strips animations.
pref("browser.chrome.favicons.process", false);
// browser.warnOnQuit == false will override all other possible prompts when quitting or restarting
pref("browser.warnOnQuit", true);
// browser.showQuitWarning specifically controls the quit warning dialog. We
// might still show the window closing dialog with showQuitWarning == false.
pref("browser.showQuitWarning", false);
pref("browser.fullscreen.autohide", true);
pref("browser.fullscreen.animateUp", 1);
pref("browser.overlink-delay", 80);

pref("browser.urlbar.clickSelectsAll", true);
pref("browser.urlbar.doubleClickSelectsAll", false);
pref("browser.urlbar.autoFill", true);
pref("browser.urlbar.autoFill.typed", true);
// 0: Match anywhere (e.g., middle of words)
// 1: Match on word boundaries and then try matching anywhere
// 2: Match only on word boundaries (e.g., after / or .)
// 3: Match at the beginning of the url or title
pref("browser.urlbar.matchBehavior", 1);
pref("browser.urlbar.filter.javascript", true);

// the maximum number of results to show in autocomplete when doing richResults
pref("browser.urlbar.maxRichResults", 12);
// The amount of time (ms) to wait after the user has stopped typing
// before starting to perform autocomplete.  50 is the default set in
// autocomplete.xml.
pref("browser.urlbar.delay", 50);

// The special characters below can be typed into the urlbar to either restrict
// the search to visited history, bookmarked, tagged pages; or force a match on
// just the title text or url.
pref("browser.urlbar.restrict.history", "^");
pref("browser.urlbar.restrict.bookmark", "*");
pref("browser.urlbar.restrict.tag", "+");
pref("browser.urlbar.restrict.openpage", "%");
pref("browser.urlbar.restrict.typed", "~");
pref("browser.urlbar.match.title", "#");
pref("browser.urlbar.match.url", "@");

// The default behavior for the urlbar can be configured to use any combination
// of the match filters with each additional filter adding more results (union).
pref("browser.urlbar.suggest.history",              true);
pref("browser.urlbar.suggest.bookmark",             true);
pref("browser.urlbar.suggest.openpage",             true);

// Restrictions to current suggestions can also be applied (intersection).
// Typed suggestion works only if history is set to true.
pref("browser.urlbar.suggest.history.onlyTyped",    false);

pref("browser.urlbar.formatting.enabled", true);
pref("browser.urlbar.trimURLs", false);

// Display punycode in identity panel:
// 0 = Display IDN name
// 1 = Display punycode name for DV domains
// 2 = Also display punycode for HTTP sites if IDN name used
pref("browser.identity.display_punycode", 1);

// Address bar RSS icon control, show by default
pref("browser.urlbar.rss", true);

// If changed to true, copying the entire URL from the location bar will put
// the human readable (percent-decoded) URL on the clipboard.
pref("browser.urlbar.decodeURLsOnCopy", false);

pref("browser.altClickSave", true);

// Enable logging downloads operations to the Error Console.
pref("browser.download.debug", false);

// Number of milliseconds to wait for the http headers (and thus
// the Content-Disposition filename) before giving up and falling back to 
// picking a filename without that info in hand so that the user sees some
// feedback from their action.
pref("browser.download.saveLinkAsFilenameTimeout", 4000);

// Do not use default download location as standard, but ask.
pref("browser.download.useDownloadDir", false);

pref("browser.download.folderList", 1);
pref("browser.download.manager.showAlertOnComplete", true);
pref("browser.download.manager.showAlertInterval", 2000);
pref("browser.download.manager.retention", 2);
pref("browser.download.manager.showWhenStarting", true);
pref("browser.download.manager.closeWhenDone", false);
pref("browser.download.manager.focusWhenStarting", false);
pref("browser.download.manager.flashCount", 10);
pref("browser.download.manager.addToRecentDocs", true);
pref("browser.download.manager.quitBehavior", 2);
pref("browser.download.manager.scanWhenDone", true);
pref("browser.download.manager.resumeOnWakeDelay", 10000);

// This records whether or not the panel has been shown at least once.
pref("browser.download.panel.shown", false);

// This records whether or not at least one session with the Downloads Panel
// enabled has been completed already.
pref("browser.download.panel.firstSessionCompleted", false);

// search engines URL
pref("browser.search.searchEnginesURL",      "https://@AM_DOMAIN@/?component=integration&type=external&request=searchplugins");

// pointer to the default engine name
pref("browser.search.defaultenginename",      "chrome://browser-region/locale/region.properties");

// disable logging for the search service by default
pref("browser.search.log", false);

// Ordering of Search Engines in the Engine list. 
pref("browser.search.order.1",                "chrome://browser-region/locale/region.properties");
pref("browser.search.order.2",                "chrome://browser-region/locale/region.properties");
pref("browser.search.order.3",                "chrome://browser-region/locale/region.properties");
pref("browser.search.order.4",                "chrome://browser-region/locale/region.properties");

// search bar results always open in a new tab
pref("browser.search.openintab", false);

// do not swap focus to the context search tab.
pref("browser.search.context.loadInBackground", true);

// if no result, add the search term so that the panel of the new UI is shown anyway
pref("browser.search.showOneOffButtons", true);

// send ping to the server to update
pref("browser.search.update", true);

// disable logging for the search service update system by default
pref("browser.search.update.log", false);

// Check whether we need to perform engine updates every 6 hours
pref("browser.search.update.interval", 21600);

// enable search suggestions by default
pref("browser.search.suggest.enabled", true);

#ifdef MOZ_OFFICIAL_BRANDING
// {moz:official} expands to "official"
pref("browser.search.official", true);
#endif

pref("browser.sessionhistory.max_entries", 50);

// handle links targeting new windows
// 1=current window/tab, 2=new window, 3=new tab in most recent window
pref("browser.link.open_newwindow", 3);

// handle external links (i.e. links opened from a different application)
// default: use browser.link.open_newwindow
// 1-3: see browser.link.open_newwindow for interpretation
pref("browser.link.open_newwindow.override.external", -1);

// 0: no restrictions - divert everything
// 1: don't divert window.open at all
// 2: don't divert window.open with features
pref("browser.link.open_newwindow.restriction", 2);

// If true, this pref causes windows opened by window.open to be forced into new
// tabs (rather than potentially opening separate windows, depending on
// window.open arguments) when the browser is in fullscreen mode.
// We set this differently on Mac because the fullscreen implementation there is
// different.
#ifdef XP_MACOSX
pref("browser.link.open_newwindow.disabled_in_fullscreen", true);
#else
pref("browser.link.open_newwindow.disabled_in_fullscreen", false);
#endif

// Tabbed browser
pref("browser.tabs.autoHide", false);
pref("browser.tabs.closeWindowWithLastTab", true);
pref("browser.tabs.insertAllAfterCurrent", false);
pref("browser.tabs.insertRelatedAfterCurrent", true);
pref("browser.tabs.warnOnClose", true);
pref("browser.tabs.warnOnCloseOtherTabs", true);
pref("browser.tabs.warnOnOpen", true);
pref("browser.tabs.maxOpenBeforeWarn", 15);
pref("browser.tabs.loadInBackground", true);
pref("browser.tabs.opentabfor.middleclick", true);
pref("browser.tabs.loadDivertedInBackground", false);
pref("browser.tabs.loadBookmarksInBackground", false);
pref("browser.tabs.noWindowActivationOnExternal", false);
pref("browser.tabs.tabClipWidth", 140);
pref("browser.tabs.animate", true);
pref("browser.tabs.onTop", false);

// Varan -- bottom placement of the navigation bar / tab strip, for tablet use.
//
// NOT the same axis as browser.tabs.onTop, which only chooses above-vs-below
// the address bar with BOTH still above the page. These move the bar below the
// PAGE, to the true bottom of the window, which needs a DOM reparent (see
// base/content/varan-layout.js) rather than a CSS reorder.
//
// Default false on both: the shipped layout is unchanged unless the user opts
// in from Preferences > Tabs. Applied when a window is built, so a change takes
// effect in newly opened windows -- the pref pane says a restart is required
// rather than promising a live reflow it cannot deliver.
pref("browser.varan.layout.navbarAtBottom", false);
pref("browser.varan.layout.tabsAtBottom", false);
pref("browser.varan.layout.bookmarksAtBottom", false);

// Hide either bar outright, wherever it sits. These set the same `collapsed`
// attribute that View > Toolbars toggles, so the two mechanisms agree. Turning a
// pref back off does NOT force the bar visible -- that would override a choice
// made from the Toolbars menu.
pref("browser.varan.layout.hideBookmarksBar", false);

// Varan -- ACCENT. Reuses the SAME system colour the titlebar already uses
// (-moz-win-accentcolor), so top and bottom agree by construction. All of it is
// gated on @media (-moz-windows-accent-color-applies) and :not(:-moz-lwtheme),
// so a user with accent-on-titlebar off gets system colours, and an installed
// Pale Moon theme always wins.
pref("browser.varan.accent.chrome", false);
pref("browser.varan.accent.tabs", false);
// WHICH system colour to follow. Windows exposes TWO and they need not match:
//   false -> Explorer\Accent\AccentColor (8.1) / DWM\AccentColor (10+), the
//            accent the user picks in Personalisation. ABGR.
//   true  -> DWM\ColorizationColor, what the window frame/titlebar is tinted
//            with. ARGB. Pick this to match the titlebar exactly.
pref("browser.varan.accent.useDwm", false);
#ifdef XP_WIN
pref("browser.tabs.drawInTitlebar", true);
#else
pref("browser.tabs.drawInTitlebar", false);
#endif
pref("browser.tabs.resize_immediately", false);

// Where to show tab close buttons:
// 0  on active tab only
// 1  on all tabs until tabClipWidth is reached, then active tab only
// 2  no close buttons at all
// 3  at the end of the tabstrip
pref("browser.tabs.closeButtons", 1);

// When tabs opened by links in other tabs via a combination of 
// browser.link.open_newwindow being set to 3 and target="_blank" etc are
// closed:
// true   return to the tab that opened this tab (its owner)
// false  return to the adjacent tab (old default)
pref("browser.tabs.selectOwnerOnClose", true);

pref("browser.tabs.showAudioPlayingIcon", true);
// This should match Chromium's audio indicator delay.
pref("browser.tabs.delayHidingAudioPlayingIconMS", 3000);

// Whether dragging a tab off the tab bar to tear it off into its own
// window is enabled.
pref("browser.tabs.allowTabDetach", true);

// Whether to fade tab labels instead of using ellipses when cutting off
// long page titles.
pref("browser.tabs.fadeLabels", true);

pref("browser.allTabs.previews", true);
pref("browser.allTabs.hidePinnedTabs", false);
pref("browser.ctrlTab.previews", true);
pref("browser.ctrlTab.hidePinnedTabs", false);
pref("browser.ctrlTab.recentlyUsedLimit", 7);

// By default, do not export HTML at shutdown.
// If true, at shutdown the bookmarks in your menu and toolbar will
// be exported as HTML to the bookmarks.html file.
pref("browser.bookmarks.autoExportHTML",          false);

// The maximum number of daily bookmark backups to 
// keep in {PROFILEDIR}/bookmarkbackups. Special values:
// -1: unlimited
//  0: no backups created (and deletes all existing backups)
pref("browser.bookmarks.max_backups",             10);

// Scripts & Windows prefs
pref("dom.disable_open_during_load",              true);
pref("dom.max_chrome_script_run_time",            30);
// Varan 2026-07-30 (device trip partE-pkg1): 15 -> 0 = the watchdog is OFF for content.
// FACT, XPCJSContext.cpp:1265-1270 -- `limit = Preferences::GetInt("dom.max_script_run_time")`
// then `if (limit == 0 || duration < limit/2.0) return true;`. So 0 disables it outright,
// and 15 means the check fires after 15 s of CONTINUOUS script time (two halves of 7.5 s).
//
// This is the other half of the always_stop_slow_scripts pair below, and shipping only that
// half swapped one failure for another: instead of KILLING YouTube's init script silently, the
// browser now put up a MODAL "Warning: Unresponsive script" dialog over
// kevlar_base_sync_mod_chunk and waited. The dialog blocks the main thread, so the page stalls
// and PLAYING VIDEO STOPS behind it -- which is exactly what the device reported ("video
// loaded first but it stopped with one error before ui loaded"), with the dialog in the
// screenshot. Both configurations of the watchdog break this device; the mechanism itself is
// the problem, because 15 s of script is NORMAL here when a whole page load is 23-135 s.
//
// TRADE, stated: a genuinely runaway script can no longer be interrupted from inside the
// browser; recovery is closing the window / ending the process. Accepted because we KNOW
// legitimate scripts exceed any threshold we could pick, and a wrong threshold reintroduces
// the exact modal stall we are removing. Chrome scripts keep their 30 s limit above -- a
// hang in OUR OWN chrome JS is a bug we want to see, not one to suppress.
pref("dom.max_script_run_time",                   0);
// Automatically terminate non-responsive scripts if script_run_time expires.
// Varan 2026-07-30: was true (silent kill, no prompt -- nsGlobalWindow.cpp:11322 returns
// KillSlowScript immediately). Set to the PLATFORM DEFAULT of false so the user gets a
// prompt instead. On VENICE a page load is 23-135 s, so the ~7.5 s threshold (half of
// max_script_run_time, checked twice) was truncating YouTube's init scripts.
// DEVICE-CONFIRMED: with this false the YouTube UI loads fully.
// NB with max_script_run_time now 0 this pref is belt-and-braces: the callback returns early
// before ShowSlowScriptDialog is ever reached. Kept because it is the correct value on its own
// merits, and because it is what makes the behaviour a prompt rather than a kill if anyone
// ever restores a nonzero limit.
pref("dom.always_stop_slow_scripts",              false);

pref("javascript.options.showInConsole",          true);
#ifdef DEBUG
pref("general.warnOnAboutConfig",                 false);
#endif

// Enable unlinking of ghost windows so they can be garbage collected.
pref("browser.ghostbuster.enabled",               true);
// Disable GC on memory pressure, avoid incessant recycling when websites
// misbehave. Should also avoid spurious GCs during ghostbusting.
//
// VARAN B4 (2026-08-01): FLIPPED TO true FOR ARM32. This deliberately overrides the
// Pale Moon decision above, so the reasoning is recorded rather than assumed.
//   WHY: on Windows RT this is a 2 GB process with NO automatic low-memory warning at
//   all -- AvailableMemoryTracker is _M_IX86-gated, so the 24 automatic consumers of
//   the memory-pressure notification are inert on ARM32. Upstream ships true; the app
//   turned it off to avoid GC churn from a signal that, here, almost never arrives.
//   BLAST RADIUS IS SMALL AND MEASURED: review-4 A5 found the signal never fires
//   automatically on ARM32 -- only 3 of 9 explicit firing sites are live -- so the
//   "incessant recycling" this pref was disabled to prevent cannot happen at the
//   frequency it was disabled for. What it buys is that when pressure IS signalled,
//   we actually collect instead of walking into an OOM with no warning.
//   THIS IS OOM ROBUSTNESS, NOT SPEED. Do not expect it to help page load.
//   REVERT: set this back to false. One line, no rebuild dependency beyond the pref file.
pref("javascript.options.gc_on_memory_pressure",  true);
// Use the stub implementation of the WeakRef API to not expose GC internals
// to web content unnecessarily. This is fully within spec that makes no
// guarantees about GC being triggered or finalization callbacks being made.
pref("javascript.options.weakrefs",               false);

// This is the pref to control the location bar, change this to true to 
// force this - this makes the origin of popup windows more obvious to avoid
// spoofing. We would rather not do it by default because it affects UE for web
// applications, but without it there isn't a really good way to prevent chrome
// spoofing, see bug 337344
pref("dom.disable_window_open_feature.location",  true);
// Allow JS to set status messages
pref("dom.disable_window_status_change",          false);
// allow JS to move and resize existing windows
pref("dom.disable_window_move_resize",            false);
// prevent JS from monkeying with window focus, etc
pref("dom.disable_window_flip",                   true);

// Disable touch events on Desktop Firefox by default until they are properly
// supported (bug 736048)
pref("dom.w3c_touch_events.enabled",        0);

// Whether performanceObservers are enabled by default.
// While this can be used for fingerprinting (and regularly is), its widespread
// use forces our hand here for web compatibility reasons.
pref("dom.enable_performance_observer", true);
// Whether performance.GetEntries* will contain an entry for the active document
// Disabled by default in Pale Moon (unlike in UXP) since it can be used for
// tracking/profiling.
pref("dom.enable_performance_navigation_timing", false);

// popups.policy 1=allow,2=reject
pref("privacy.popups.policy",               1);
pref("privacy.popups.usecustom",            true);
pref("privacy.popups.showBrowserMessage",   true);

pref("privacy.item.cookies",                false);

pref("privacy.clearOnShutdown.history",     true);
pref("privacy.clearOnShutdown.formdata",    true);
pref("privacy.clearOnShutdown.passwords",   false);
pref("privacy.clearOnShutdown.downloads",   true);
pref("privacy.clearOnShutdown.cookies",     true);
pref("privacy.clearOnShutdown.cache",       true);
pref("privacy.clearOnShutdown.sessions",    true);
pref("privacy.clearOnShutdown.offlineApps", false);
pref("privacy.clearOnShutdown.siteSettings", false);
pref("privacy.clearOnShutdown.connectivityData", false);

pref("privacy.cpd.history",                 true);
pref("privacy.cpd.formdata",                true);
pref("privacy.cpd.passwords",               false);
pref("privacy.cpd.downloads",               true);
pref("privacy.cpd.cookies",                 true);
pref("privacy.cpd.cache",                   true);
pref("privacy.cpd.sessions",                true);
pref("privacy.cpd.offlineApps",             false);
pref("privacy.cpd.siteSettings",            false);
pref("privacy.cpd.connectivityData",        false);

// What default should we use for the time span in the sanitizer:
// 0 - Clear everything
// 1 - Last Hour
// 2 - Last 2 Hours
// 3 - Last 4 Hours
// 4 - Today
pref("privacy.sanitize.timeSpan", 1);
pref("privacy.sanitize.sanitizeOnShutdown", false);

pref("privacy.sanitize.migrateFx3Prefs",    false);

// Enable including the content title in the window title for console errors.
// Default disabled for PBM users to avoid a possible source of disk leaks.
pref("privacy.exposeContentTitleInWindow", true);
pref("privacy.exposeContentTitleInWindow.pbm", false);

pref("network.proxy.share_proxy_settings",  false); // use the same proxy settings for all protocols

// Speculative half-open connections. Upstream Pale Moon disables these (0). Varan
// 2026-07-29: restored to the Gecko default of 6. On VENICE, TLS setup is a large share of
// time-to-first-byte and page loads run 23-135 s, so pre-establishing connections is a
// straight win; the privacy rationale for 0 is not worth that cost on this device.
pref("network.http.speculative-parallel-limit", 6);

// Enable pipelining over SSL
pref("network.http.pipelining.ssl", true);

// Disable predictor/prefetch of URIs
pref("network.predictor.enabled", false);
pref("network.prefetch-next", false);

// Enable DNS prefetching
pref("network.dns.disablePrefetch", false);

// Tune DNS lookups
pref("network.dnsCacheEntries", 800);
pref("network.dnsCacheExpiration", 180);            // 3 minutes if no TTL given by DNS resolver
pref("network.dns.get-ttl", true);                  // Get and use DNS resolver TTL
pref("network.dnsCacheExpirationGracePeriod", 60);  // 1 minute grace period for stale entry

// simple gestures support
pref("browser.gesture.swipe.left", "Browser:BackOrBackDuplicate");
pref("browser.gesture.swipe.right", "Browser:ForwardOrForwardDuplicate");
pref("browser.gesture.swipe.up", "cmd_scrollTop");
pref("browser.gesture.swipe.down", "cmd_scrollBottom");
#ifdef XP_MACOSX
pref("browser.gesture.pinch.latched", true);
pref("browser.gesture.pinch.threshold", 150);
#else
pref("browser.gesture.pinch.latched", false);
pref("browser.gesture.pinch.threshold", 25);
#endif
#ifdef XP_WIN
// Enabled for touch input display zoom.
pref("browser.gesture.pinch.out", "cmd_fullZoomEnlarge");
pref("browser.gesture.pinch.in", "cmd_fullZoomReduce");
pref("browser.gesture.pinch.out.shift", "cmd_fullZoomReset");
pref("browser.gesture.pinch.in.shift", "cmd_fullZoomReset");
#else
// Disabled by default due to issues with track pad input.
pref("browser.gesture.pinch.out", "");
pref("browser.gesture.pinch.in", "");
pref("browser.gesture.pinch.out.shift", "");
pref("browser.gesture.pinch.in.shift", "");
#endif
pref("browser.gesture.twist.latched", false);
pref("browser.gesture.twist.threshold", 0);
pref("browser.gesture.twist.right", "cmd_gestureRotateRight");
pref("browser.gesture.twist.left", "cmd_gestureRotateLeft");
pref("browser.gesture.twist.end", "cmd_gestureRotateEnd");
pref("browser.gesture.tap", "cmd_fullZoomReset");

pref("browser.snapshots.limit", 0);

// 0: Nothing happens
// 1: Scroll contents
// 2: Go back or go forward, in your history
// 3: Zoom in or out
// 4: Scroll contents with X and Y swapped
#ifdef XP_MACOSX
// On OS X, if the wheel has one axis only, shift+wheel comes through as a
// horizontal scroll event. Thus, we can't assign anything other than normal
// scrolling to shift+wheel.
pref("mousewheel.with_alt.action", 2);
pref("mousewheel.with_shift.action", 1);
// On MacOS X, control+wheel is typically handled by system and we don't
// receive the event.  So, command key which is the main modifier key for
// acceleration is the best modifier for zoom-in/out.  However, we should keep
// the control key setting for backward compatibility.
pref("mousewheel.with_meta.action", 3); // command key on Mac
// Disable control-/meta-modified horizontal mousewheel events, since
// those are used on Mac as part of modified swipe gestures (e.g.
// Left swipe+Cmd = go back in a new tab).
pref("mousewheel.with_control.action.override_x", 0);
pref("mousewheel.with_meta.action.override_x", 0);
#else
pref("mousewheel.with_alt.action", 1);
pref("mousewheel.with_shift.action", 2);
pref("mousewheel.with_meta.action", 1); // win key on Win, Super/Hyper on Linux
#endif
pref("mousewheel.with_control.action",3);
pref("mousewheel.with_win.action", 1);

pref("browser.xul.error_pages.enabled", true);
pref("browser.xul.error_pages.expert_bad_cert", false);

// Work Offline is best manually managed by the user.
pref("network.manage-offline-status", false);

// We want to make sure known external protocol URLs are handled externally.
pref("network.protocol-handler.external.mailto", true); // for mail
pref("network.protocol-handler.external.news", true);   // for news
pref("network.protocol-handler.external.snews", true);  // for secure news
pref("network.protocol-handler.external.nntp", true);   // also news
#ifdef XP_WIN
pref("network.protocol-handler.external.ms-windows-store", true);
#endif

// Configure external handler warning dialogs.
pref("network.protocol-handler.warn-external.mailto", false);
pref("network.protocol-handler.warn-external.news", true);
pref("network.protocol-handler.warn-external.snews", true);
pref("network.protocol-handler.warn-external.nntp", true);
#ifdef XP_WIN
pref("network.protocol-handler.warn-external.ms-windows-store", false);
#endif

// By default, all protocol handlers are exposed.  This means that
// the browser will respond to openURL commands for all URL types.
// It will also try to open link clicks inside the browser before
// failing over to the system handlers.
pref("network.protocol-handler.expose-all", true);
pref("network.protocol-handler.expose.mailto", false);
pref("network.protocol-handler.expose.news", false);
pref("network.protocol-handler.expose.snews", false);
pref("network.protocol-handler.expose.nntp", false);

pref("accessibility.typeaheadfind", false);
pref("accessibility.typeaheadfind.timeout", 5000);
pref("accessibility.typeaheadfind.linksonly", false);
pref("accessibility.typeaheadfind.flashBar", 1);

// by default we show an infobar message when pages require plugins that are blocked, or are outdated
pref("plugins.hide_infobar_for_blocked_plugin", false);
pref("plugins.hide_infobar_for_outdated_plugin", false);

// Pale Moon:pref to always show the plugin indicator or not (default=false)
pref("plugins.always_show_indicator", false);

//Enable tri-state option (Always/Never/Ask)
pref("plugins.click_to_play", true);

// Platform pref is to enable all plugins by default.
// This pref defaults them to click-to-play
pref("plugin.default.state", 1);

// Don't load plugin instances with no src declared.
// These prefs are documented in detail in all.js.
pref("plugins.favorfallback.mode", "follow-ctp");
pref("plugins.favorfallback.rules", "nosrc");

#ifdef XP_WIN
pref("browser.preferences.instantApply", false);
#else
pref("browser.preferences.instantApply", true);
#endif
#ifdef XP_MACOSX
pref("browser.preferences.animateFadeIn", true);
#else
pref("browser.preferences.animateFadeIn", false);
#endif

pref("browser.download.show_plugins_in_list", true);
pref("browser.download.hide_plugins_without_extensions", true);

// Backspace and Shift+Backspace behavior
// 0 goes Back/Forward
// 1 act like PgUp/PgDown
// 2 and other values, nothing
#ifdef UNIX_BUT_NOT_MAC
pref("browser.backspace_action", 2);
#else
pref("browser.backspace_action", 0);
#endif

// Pale Moon never eats the space with word selection, regardless of O.S.
pref("layout.word_select.eat_space_to_next_word", false);

// this will automatically enable inline spellchecking (if it is available) for
// editable elements in HTML
// 0 = spellcheck nothing
// 1 = check multi-line controls [default]
// 2 = check multi/single line controls
pref("layout.spellcheckDefault", 1);

pref("browser.send_pings", false);

/* initial web feed readers list */
pref("browser.contentHandlers.types.0.title", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.0.uri", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.0.type", "application/vnd.mozilla.maybe.feed");
pref("browser.contentHandlers.types.1.title", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.1.uri", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.1.type", "application/vnd.mozilla.maybe.feed");
pref("browser.contentHandlers.types.2.title", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.2.uri", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.2.type", "application/vnd.mozilla.maybe.feed");
pref("browser.contentHandlers.types.3.title", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.3.uri", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.3.type", "application/vnd.mozilla.maybe.feed");
pref("browser.contentHandlers.types.4.title", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.4.uri", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.4.type", "application/vnd.mozilla.maybe.feed");
pref("browser.contentHandlers.types.5.title", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.5.uri", "chrome://browser-region/locale/region.properties");
pref("browser.contentHandlers.types.5.type", "application/vnd.mozilla.maybe.feed");

pref("browser.feeds.handler", "ask");
pref("browser.videoFeeds.handler", "ask");
pref("browser.audioFeeds.handler", "ask");

// At startup, if the handler service notices that the version number in the
// region.properties file is newer than the version number in the handler
// service datastore, it will add any new handlers it finds in the prefs (as
// seeded by this file) to its datastore.  
pref("gecko.handlerService.defaultHandlersVersion", "chrome://browser-region/locale/region.properties");

// The default set of web-based protocol handlers shown in the application
// selection dialog for webcal: ; I've arbitrarily picked 4 default handlers
// per protocol, but if some locale wants more than that (or defaults for some
// protocol not currently listed here), we should go ahead and add those.

// webcal
pref("gecko.handlerService.schemes.webcal.0.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.webcal.0.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.webcal.1.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.webcal.1.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.webcal.2.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.webcal.2.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.webcal.3.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.webcal.3.uriTemplate", "chrome://browser-region/locale/region.properties");

// mailto
pref("gecko.handlerService.schemes.mailto.0.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.mailto.0.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.mailto.1.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.mailto.1.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.mailto.2.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.mailto.2.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.mailto.3.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.mailto.3.uriTemplate", "chrome://browser-region/locale/region.properties");

// irc
pref("gecko.handlerService.schemes.irc.0.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.irc.0.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.irc.1.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.irc.1.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.irc.2.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.irc.2.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.irc.3.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.irc.3.uriTemplate", "chrome://browser-region/locale/region.properties");

// ircs
pref("gecko.handlerService.schemes.ircs.0.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.ircs.0.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.ircs.1.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.ircs.1.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.ircs.2.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.ircs.2.uriTemplate", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.ircs.3.name", "chrome://browser-region/locale/region.properties");
pref("gecko.handlerService.schemes.ircs.3.uriTemplate", "chrome://browser-region/locale/region.properties");

// By default, we don't want protocol/content handlers to be registered from a different host, see bug 402287
pref("gecko.handlerService.allowRegisterFromDifferentHost", false);

pref("browser.geolocation.warning.infoURL", "http://www.palemoon.org/info-url/geolocation.shtml");
pref("browser.mixedcontent.warning.infoURL", "http://www.palemoon.org/info-url/mixedcontent.shtml");
pref("browser.push.warning.infoURL", "https://www.palemoon.org/info-url/push.shtml");

pref("browser.EULA.version", 3);
pref("browser.rights.version", 3);
pref("browser.rights.3.shown", false);

#ifdef DEBUG
// Don't show the about:rights notification in debug builds.
pref("browser.rights.override", true);
#endif

pref("browser.sessionstore.resume_from_crash", true);
pref("browser.sessionstore.resume_session_once", false);

// minimal interval between two save operations in milliseconds
pref("browser.sessionstore.interval",60000);
// maximum amount of POSTDATA to be saved in bytes per history entry (-1 = all of it)
// (NB: POSTDATA will be saved either entirely or not at all)
pref("browser.sessionstore.postdata", 0);
// on which sites to save text data, POSTDATA and cookies
// 0 = everywhere, 1 = unencrypted sites, 2 = nowhere
pref("browser.sessionstore.privacy_level", 0);
// the same as browser.sessionstore.privacy_level, but for saving deferred session data
pref("browser.sessionstore.privacy_level_deferred", 1);
// how many tabs can be reopened (per window)
pref("browser.sessionstore.max_tabs_undo", 10);
// how many windows can be reopened (per session) - on non-OS X platforms this
// pref may be ignored when dealing with pop-up windows to ensure proper startup
pref("browser.sessionstore.max_windows_undo", 3);
// number of crashes that can occur before the about:sessionrestore page is displayed
// (this pref has no effect if more than 6 hours have passed since the last crash)
pref("browser.sessionstore.max_resumed_crashes", 1);
// number of back button session history entries to save (-1 = all of them)
pref("browser.sessionstore.max_serialize_back", 10);
// number of forward button session history entries to save (-1 = all of them)
pref("browser.sessionstore.max_serialize_forward", -1);
// restore_on_demand overrides browser.sessionstore.max_concurrent_tabs
// and restore_hidden_tabs. When true, tabs will not be restored until they are
// focused (also applies to tabs that aren't visible). When false, the values
// for browser.sessionstore.max_concurrent_tabs and restore_hidden_tabs are 
// respected. Selected tabs are always restored regardless of this pref.
pref("browser.sessionstore.restore_on_demand", true);
// The number of tabs that can restore concurrently.
// Sane values are 1..10, default 3.
pref("browser.sessionstore.max_concurrent_tabs", 3);
// Whether to automatically restore hidden tabs (i.e., tabs in other tab groups) or not
pref("browser.sessionstore.restore_hidden_tabs", false);
// If restore_on_demand is set, pinned tabs are restored on startup by default.
// When set to true, this pref overrides that behavior, and pinned tabs will only
// be restored when they are focused.
pref("browser.sessionstore.restore_pinned_tabs_on_demand", false);
// Pale Moon: Allow the user to bypass cached versions of pages when restoring
// tabs from a previous session
// 0 = pull fully from cache
// 1 = perform a soft refresh when restoring a tab (check network)
// 2 = perform a hard refresh when restoring a tab (bypass cache completely)
pref("browser.sessionstore.cache_behavior", 0);
// Pale Moon: Allow exact positioning of windows to previous locations, even
// if they would be outside of the screen bounds
pref("browser.sessionstore.exactPos", false);

// allow META refresh by default
pref("accessibility.blockautorefresh", false);

// Whether history is enabled or not.
pref("places.history.enabled", true);

// the (maximum) number of the recent visits to sample
// when calculating frecency
pref("places.frecency.numVisits", 10);

// buckets (in days) for frecency calculation
pref("places.frecency.firstBucketCutoff", 4);
pref("places.frecency.secondBucketCutoff", 14);
pref("places.frecency.thirdBucketCutoff", 31);
pref("places.frecency.fourthBucketCutoff", 90);

// weights for buckets for frecency calculations
pref("places.frecency.firstBucketWeight", 100);
pref("places.frecency.secondBucketWeight", 70);
pref("places.frecency.thirdBucketWeight", 50);
pref("places.frecency.fourthBucketWeight", 30);
pref("places.frecency.defaultBucketWeight", 10);

// bonus (in percent) for visit transition types for frecency calculations
pref("places.frecency.embedVisitBonus", 0);
pref("places.frecency.framedLinkVisitBonus", 0);
pref("places.frecency.linkVisitBonus", 100);
pref("places.frecency.typedVisitBonus", 2000);
pref("places.frecency.bookmarkVisitBonus", 75);
pref("places.frecency.downloadVisitBonus", 0);
pref("places.frecency.permRedirectVisitBonus", 0);
pref("places.frecency.tempRedirectVisitBonus", 0);
pref("places.frecency.defaultVisitBonus", 0);

// bonus (in percent) for place types for frecency calculations
pref("places.frecency.unvisitedBookmarkBonus", 140);
pref("places.frecency.unvisitedTypedBonus", 200);

// Controls behavior of the "Add Exception" dialog launched from SSL error pages
// 0 - don't pre-populate anything
// 1 - pre-populate site URL, but don't fetch certificate
// 2 - pre-populate site URL and pre-fetch certificate
pref("browser.ssl_override_behavior", 2);

// Controls the behavior of data storage for offline apps
// 0 - Deny storage of offline app data without prompting (breaks sites!)
// 1 - Ask the user if a website wants to store offline app data
// 2 - Allow storage of offline app data without prompting (default)
pref("offline-apps.permissions", 2);
// True if storage of offline app data is allowed without prompting.
pref("offline-apps.allow_by_default", true);
// True if the user should be prompted when a web application supports
// offline apps.
pref("browser.offline-apps.notify", true);

// if true, use full page zoom instead of text zoom
pref("browser.zoom.full", true);

// Whether or not to save and restore zoom levels on a per-site basis.
pref("browser.zoom.siteSpecific", true);

// Whether or not to update background tabs to the current zoom level.
pref("browser.zoom.updateBackgroundTabs", true);

// base URL for web-based support pages
pref("app.support.baseURL", "http://www.palemoon.org/support/");

// Name of alternate about: page for certificate errors (when undefined, defaults to about:neterror)
pref("security.alternate_certificate_error_page", "certerror");

// Whether to start the private browsing mode at application startup
pref("browser.privatebrowsing.autostart", false);

// Whether to immediately open the bookmark edit panel for new bookmarks
pref("browser.bookmarks.editDialog.showForNewBookmarks", false);

// Don't try to alter this pref, it'll be reset the next time you use the
// bookmarking dialog
pref("browser.bookmarks.editDialog.firstEditField", "namePicker");

// Prompt for master password on application startup?
pref("signon.startup.prompt", false);

// Whether to use a panel that looks like an OS X sheet for customization
#ifdef XP_MACOSX
pref("toolbar.customization.usesheet", true);
#else
pref("toolbar.customization.usesheet", false);
#endif

#ifdef MOZ_ENABLE_NPAPI
// Whether plugins are run out-of-process. Only applicable in non-GTK3
#ifdef NOT_GTK3
pref("dom.ipc.plugins.enabled", true);
#endif

// This pref governs whether we attempt to work around problems caused by
// plugins using OS calls to manipulate the cursor while running out-of-
// process.  These workarounds all involve intercepting (hooking) certain
// OS calls in the plugin process, then arranging to make certain OS calls
// in the browser process.  Eventually plugins will be required to use the
// NPAPI to manipulate the cursor, and these workarounds will be removed.
// See bug 621117.
#ifdef XP_MACOSX
pref("dom.ipc.plugins.nativeCursorSupport", true);
#endif
#endif /* MOZ_ENABLE_NPAPI */

#ifdef XP_WIN
pref("browser.taskbar.previews.enable", false);
pref("browser.taskbar.previews.max", 20);
pref("browser.taskbar.previews.cachetime", 5);
pref("browser.taskbar.lists.enabled", true);
pref("browser.taskbar.lists.frequent.enabled", true);
pref("browser.taskbar.lists.recent.enabled", false);
pref("browser.taskbar.lists.maxListItemCount", 7);
pref("browser.taskbar.lists.tasks.enabled", true);
pref("browser.taskbar.lists.refreshInSeconds", 120);
#endif

#ifdef MOZ_SERVICES_SYNC
// Info when outdated sync detected
pref("services.sync.outdated.url", "http://www.palemoon.org/sync/update/");
// The sync engines to use.
pref("services.sync.registerEngines", "Bookmarks,Form,History,Password,Prefs,Tab,Addons");
// Preferences to be synced by default
pref("services.sync.prefs.sync.accessibility.blockautorefresh", true);
pref("services.sync.prefs.sync.accessibility.browsewithcaret", true);
pref("services.sync.prefs.sync.accessibility.typeaheadfind", true);
pref("services.sync.prefs.sync.accessibility.typeaheadfind.linksonly", true);
pref("services.sync.prefs.sync.addons.ignoreUserEnabledChanges", true);
// The addons prefs related to repository verification are intentionally
// not synced for security reasons. If a system is compromised, a user
// could weaken the pref locally, install an add-on from an untrusted
// source, and this would propagate automatically to other,
// uncompromised Sync-connected devices.
pref("services.sync.prefs.sync.app.update.mode", true);
pref("services.sync.prefs.sync.browser.download.manager.closeWhenDone", true);
pref("services.sync.prefs.sync.browser.download.manager.retention", true);
pref("services.sync.prefs.sync.browser.download.manager.scanWhenDone", true);
pref("services.sync.prefs.sync.browser.download.manager.showWhenStarting", true);
pref("services.sync.prefs.sync.browser.formfill.enable", true);
pref("services.sync.prefs.sync.browser.link.open_newwindow", true);
pref("services.sync.prefs.sync.browser.offline-apps.notify", true);
pref("services.sync.prefs.sync.browser.search.selectedEngine", true);
pref("services.sync.prefs.sync.browser.search.update", true);
pref("services.sync.prefs.sync.browser.sessionstore.restore_on_demand", true);
pref("services.sync.prefs.sync.browser.startup.homepage", true);
pref("services.sync.prefs.sync.browser.startup.page", true);
pref("services.sync.prefs.sync.browser.tabs.autoHide", true);
pref("services.sync.prefs.sync.browser.tabs.closeButtons", true);
pref("services.sync.prefs.sync.browser.tabs.loadInBackground", true);
pref("services.sync.prefs.sync.browser.tabs.warnOnClose", true);
pref("services.sync.prefs.sync.browser.tabs.warnOnOpen", true);
pref("services.sync.prefs.sync.browser.urlbar.autocomplete.enabled", true);
pref("services.sync.prefs.sync.browser.urlbar.default.behavior", true);
pref("services.sync.prefs.sync.browser.urlbar.maxRichResults", true);
pref("services.sync.prefs.sync.dom.disable_open_during_load", true);
pref("services.sync.prefs.sync.dom.disable_window_flip", true);
pref("services.sync.prefs.sync.dom.disable_window_move_resize", true);
pref("services.sync.prefs.sync.dom.enable_performance_observer", true);
pref("services.sync.prefs.sync.dom.event.contextmenu.enabled", true);
pref("services.sync.prefs.sync.extensions.personas.current", true);
pref("services.sync.prefs.sync.extensions.update.enabled", true);
pref("services.sync.prefs.sync.intl.accept_languages", true);
pref("services.sync.prefs.sync.javascript.enabled", true);
pref("services.sync.prefs.sync.layout.spellcheckDefault", true);
pref("services.sync.prefs.sync.lightweightThemes.isThemeSelected", true);
pref("services.sync.prefs.sync.lightweightThemes.usedThemes", true);
pref("services.sync.prefs.sync.network.cookie.cookieBehavior", true);
pref("services.sync.prefs.sync.network.cookie.lifetimePolicy", true);
pref("services.sync.prefs.sync.permissions.default.image", true);
pref("services.sync.prefs.sync.pref.advanced.images.disable_button.view_image", true);
pref("services.sync.prefs.sync.pref.advanced.javascript.disable_button.advanced", true);
pref("services.sync.prefs.sync.pref.downloads.disable_button.edit_actions", true);
pref("services.sync.prefs.sync.pref.privacy.disable_button.cookie_exceptions", true);
pref("services.sync.prefs.sync.privacy.clearOnShutdown.cache", true);
pref("services.sync.prefs.sync.privacy.clearOnShutdown.cookies", true);
pref("services.sync.prefs.sync.privacy.clearOnShutdown.downloads", true);
pref("services.sync.prefs.sync.privacy.clearOnShutdown.formdata", true);
pref("services.sync.prefs.sync.privacy.clearOnShutdown.history", true);
pref("services.sync.prefs.sync.privacy.clearOnShutdown.offlineApps", true);
pref("services.sync.prefs.sync.privacy.clearOnShutdown.passwords", true);
pref("services.sync.prefs.sync.privacy.clearOnShutdown.sessions", true);
pref("services.sync.prefs.sync.privacy.clearOnShutdown.siteSettings", true);
pref("services.sync.prefs.sync.privacy.clearOnShutdown.connectivityData", true);
pref("services.sync.prefs.sync.privacy.donottrackheader.enabled", true);
pref("services.sync.prefs.sync.privacy.sanitize.sanitizeOnShutdown", true);
pref("services.sync.prefs.sync.security.OCSP.enabled", true);
pref("services.sync.prefs.sync.security.OCSP.require", true);
pref("services.sync.prefs.sync.security.default_personal_cert", true);
pref("services.sync.prefs.sync.security.tls.version.min", true);
pref("services.sync.prefs.sync.security.tls.version.max", true);
pref("services.sync.prefs.sync.signon.rememberSignons", true);
pref("services.sync.prefs.sync.signon.startup.prompt", true);
pref("services.sync.prefs.sync.spellchecker.dictionary", true);
pref("services.sync.prefs.sync.xpinstall.whitelist.required", true);
#endif



// Enable the error console
pref("devtools.errorconsole.enabled", true);

// Whether the character encoding menu is under the main Firefox button. This
// preference is a string so that localizers can alter it.
pref("browser.menu.showCharacterEncoding", "chrome://browser/locale/browser.properties");

// Allow using tab-modal prompts when possible.
pref("prompts.tab_modal.enabled", true);
// Allow tab-modal prompts to switch tab focus
pref("prompts.tab_modal.focusSwitch", true);

// Defines the url to be used for new tabs.
// Varan: a new tab opens QUICK DIAL, not the logo page.
// BOTH prefs must agree: newtaburl.js getNewtabChoice() derives the menu
// selection back FROM the url, so setting only `choice` would show Quickdial
// selected while still opening the old page (and vice versa).
//   choice 4  <-> url about:newtab  = the Quickdial page   (newtaburl.js case 4)
//   choice 1  <-> url about:logopage = "A blank page"      (upstream default)
pref("browser.newtab.url", "about:newtab");
pref("browser.newtab.choice", 4);

// Activates preloading of the new tab url.
pref("browser.newtab.preload", false);

// Toggles the content of 'about:newtab'. Shows the grid when enabled.
pref("browser.newtabpage.enabled", true);

// Disables capturing of page thumbnails
pref("browser.pagethumbnails.capturing_disabled", false);

// enables showing basic placeholders for missing thumbnails
pref("browser.newtabpage.thumbnailPlaceholder", false);

// number of columns of newtab grid
pref("browser.newtabpage.columns", 4);

// number of rows of newtab grid
pref("browser.newtabpage.rows", 3);

// Enable the DOM fullscreen API.
pref("full-screen-api.enabled", true);

// about:permissions
// Maximum number of sites to return from the places database.
// 0-100 (currently)
pref("permissions.places-sites-limit", 50);

// Built-in default permissions.
pref("permissions.manager.defaultsUrl", "resource://app/defaults/permissions");

// Startup Crash Tracking
// number of startup crashes that can occur before starting into safe mode automatically
// (this pref has no effect if more than 6 hours have passed since the last crash)
pref("toolkit.startup.max_resumed_crashes", 3);

// The maximum amount of decoded image data we'll willingly keep around (we
// might keep around more than this, but we'll try to get down to this value).
// (This is intentionally on the high side; see bug 746055.)
pref("image.mem.max_decoded_image_kb", 256000);

// Turn on the CSP 1.0 parser for Content Security Policy headers
pref("security.csp.speccompliant", true);

// Block insecure active content on https pages
pref("security.mixed_content.block_active_content", true);

// Disable Microsoft Family Safety MitM support
pref("security.family_safety.mode", 0);

// Override the Gecko-default value of false for Pale Moon.
pref("plain_text.wrap_long_lines", true);

pref("media.webaudio.enabled", true);

// If this turns true, Moz*Gesture events are not called stopPropagation()
// before content.
pref("dom.debug.propagate_gesture_events_through_content", false);

// The request URL of the GeoLocation backend.
pref("geo.wifi.uri", "http://ip-api.com/json/?fields=lat,lon,status,message");

//Pale Moon padlock overlay preferences
pref("browser.padlock.shown", true);
/* Where to show the padlock
   1 = inside identity button, right side
   2 = inside identity button, left side
   3 = urlbar, right side (next to bookmark star)
   4 = statusbar
   5 = tabs bar, right side 
   6-10 = same locations, classic style padlock */
pref("browser.padlock.style", 1);
// address bar border, 0 = no border, 1 = border, 2 = border only on secure sites
pref("browser.padlock.urlbar_background", 2);

//Pale Moon standalone image background color
pref("browser.display.standalone_images.background_color", "#2E3B41");

// These are the thumbnail width/height set in about:newtab.
// If you change this, make sure the size is sufficient for tile sizes
// in about:newtab. These values are in CSS pixels.
pref("toolkit.pageThumbs.minWidth", 250);
pref("toolkit.pageThumbs.minHeight", 180);

// On GTK, we now default to showing the menubar only when alt is pressed:
#ifdef MOZ_WIDGET_GTK
pref("ui.key.menuAccessKeyFocuses", true);
#endif

// When a user cancels this number of authentication dialogs coming from
// a single web page (eTLD+1) in a row, all following authentication dialogs
// will be blocked (automatically canceled) for that page.
// This counter is per-tab and per-domain to minimize false positives.
// The counter resets when the page is reloaded from the UI
// (content-reloads do NOT clear this to mitigate reloading tricks).
pref("prompts.authentication_dialog_abuse_limit", 3);

// ****************** s4e prefs ******************
pref("status4evar.addonbar.borderStyle", false);
pref("status4evar.addonbar.closeButton", false);
pref("status4evar.addonbar.legacyShim", true);
pref("status4evar.addonbar.windowGripper", true);

pref("status4evar.advanced.status.detectFullScreen", false);
pref("status4evar.advanced.status.detectVideo", true);

pref("status4evar.download.button.action", 1);
pref("status4evar.download.button.action.command", "");
pref("status4evar.download.color.active", "#333399");
pref("status4evar.download.color.paused", "#808080");
pref("status4evar.download.force", false);
pref("status4evar.download.label", 0);
pref("status4evar.download.label.force", true);
pref("status4evar.download.notify.animate", true);
pref("status4evar.download.notify.timeout", 60);
pref("status4evar.download.progress", 1);
pref("status4evar.download.tooltip", 2);

pref("status4evar.firstRun", true);

pref("status4evar.progress.toolbar.css", "#333399");
pref("status4evar.progress.toolbar.force", false);
pref("status4evar.progress.toolbar.style", false);
pref("status4evar.progress.toolbar.style.advanced", false);

pref("status4evar.status", 1);
pref("status4evar.status.default", true);
pref("status4evar.status.network", true);
pref("status4evar.status.network.xhr", true);
pref("status4evar.status.timeout", 30);
pref("status4evar.status.linkOver", 1);
pref("status4evar.status.linkOver.delay.show", 0);
pref("status4evar.status.linkOver.delay.hide", 0);

pref("status4evar.status.toolbar.maxLength", 0);

pref("status4evar.status.popup.invertMirror", false);
pref("status4evar.status.popup.mouseMirror", true);

// Varan (Varan JIT, task #33) -- BASELINE-ONLY on ARM32 Windows RT.
//
// The ARM32 build compiles the whole JIT backend (JS_CODEGEN_ARM: there is no
// "Baseline-only backend" build option -- ENABLE_ION gates the entire jit). Baseline
// is device-proven (trip 2: oracle 127/127, hardfp + unaligned paths). Ion is NOT yet
// device-hardened -- the I-cache-flush-on-invalidation path (PatchWrite_Imm32) and the
// C4/C5/C6 invalidation-walk interworking defects are reachable only when Ion INVALIDATES
// a frame, which never happens while Ion is off. Disabling Ion here is the browser
// equivalent of js.exe's `--no-ion`: it keeps Baseline (baselinejit stays true) and defers
// every Ion device risk past the trip-3 success criterion. Flip to true only after the Ion
// hardening track lands. Harmless on the interpreter (JS_CODEGEN_NONE) build -- no Ion exists
// there either.
//
// ★ FLIPPED TO TRUE 2026-07-23 for the Ion MEASUREMENT TRIP. The blockers named above are
// resolved: C5/C6 (the invalidation-walk interworking defects) are FIXED and proven -- 174042
// in-slot observations, 0 footprint violations, and the fix alone removed ~280 failing
// invocations. Task #32 (PatchWrite_Imm32 I-cache flush) is CLOSED with an enumerated verdict:
// one writer (Ion.cpp:3150), one reader (JitFrames.cpp:162) that reads it as DATA via
// GetPointer, and the word is unreachable as code because PatchWrite_NearCall redirects the OSI
// point in the same loop iteration -- so no flush is needed. The Ion JS tier is gate-clean:
// 0 T2-only failures against a CONTEMPORANEOUS A32 control, oracle 127/127 on all three tiers.
//
// ⚠️ This pref is the A/B control for the trip: it is flippable in about:config, so the SAME
// binary measures ion=true vs ion=false with every other variable (compositor, build, prefs)
// held identical. Do NOT compare against the older Baseline-only package instead.
pref("javascript.options.ion", true);

// ★ WASM/ASM.JS OFF -- A STANDING DECISION, NOT A ONE-TRIP MEASURE (re-decided 2026-07-28).
//
// This block used to say "FOR THIS TRIP ONLY ... re-enable once the wasm gate is met" while
// shipping in every build, so the file contradicted the product. Reviewed against the actual
// gate state and DELIBERATELY LEFT OFF. Status of each condition the old comment named:
//   * B12 (12 even-target jump-table branches)  -- FIXED.
//   * VaranBwInRange x5                         -- CLOSED by (D)-uniform-3-slot (5dc1072820),
//                                                  device-confirmed on VENICE 2026-07-25.
//   * AllowUnaligned                            -- STILL OPEN. No closing evidence found.
//   * wasm/asm.js jit-test residual             -- STILL 95 FAILING (wasm 30, asm.js 65),
//                                                  varan-jit/MANIFEST.md:662, unchanged.
//   * four wasm files with unaudited ARM paths  -- STILL UNAUDITED (WasmFrameIterator.cpp 15
//                                                  arms, WasmTypes.cpp 6, WasmJS.cpp 2,
//                                                  WasmTypes.h 1).
//
// Two of five conditions are met. Turning wasm on would admit an execution surface with 95
// known failures onto a device build. The four-arm devbox bisect (2026-07-28) is sometimes
// cited the other way, so state precisely what it showed: with wasm/asm.js OFF, YouTube's
// player still worked and the site merely shipped a different JS bundle. That is evidence
// that keeping them off costs nothing visible -- it is NOT evidence that turning them on is
// safe, and it is the former that this pref needs.
//
// RE-ENABLE WHEN: the wasm/asm.js jit-test residual reaches 0 and AllowUnaligned is closed.
// Both are tracked in varan-jit/MANIFEST.md; neither is blocked on anything in this file.
pref("javascript.options.wasm", false);
pref("javascript.options.asmjs", false);

// ============================================================================
// VARAN UA OVERRIDE -- web.whatsapp.com  (added 2026-07-28)
// ============================================================================
// * THIS IS OURS, NOT ADOPTED. Stock Pale Moon 34.3.1 ships ZERO site-specific UA
// overrides -- verified against the shipped omni.ja, not just the source tree. So this
// is a Varan-only addition and nothing upstream depends on it.
//
// web.whatsapp.com refuses the browser outright ("WhatsApp works with Google Chrome
// 100+"). That is UA sniffing, not an engine defect: our UA is pinned byte-identical to
// Pale Moon via MOZ_APP_UA_NAME=PaleMoon, and WhatsApp allowlists specific browsers.
//
// Firefox 102, deliberately NOT Chrome. Claiming Chrome invites Chrome-only code paths
// this engine (Goanna 6.9.0, ESR52-era) cannot run; Firefox 102 is a Gecko claim that is
// closer to true and degrades more gracefully. 102 is the last ESR before several APIs
// we lack became baseline.
//
// !! EXPECT THIS TO FAIL PAST THE GATE. It gets us through the browser check; it does
// not give us Service Workers or modern syntax. The value is diagnostic -- it tells us
// WHERE WhatsApp breaks instead of stopping at the front door. If it turns out to fail
// in a way that looks like a browser bug to a user, remove it: a site that refuses
// honestly is better than one that half-loads.
//
// Mechanism verified in-tree (all three, by reading the source):
//   %OS_SLICE%  netwerk/protocol/http/UserAgentOverrides.jsm:171 -- real token, replaced
//               from gOSSlice = PLATFORM + "; " + OSCPU + ";" (it supplies its own ";").
//   default prefs honoured  :182-193 -- buildOverrides() enumerates via
//               gPrefBranch.getChildList(""), which returns default prefs too.
//   master switch  modules/libpref/init/all.js:33
//               general.useragent.site_specific_overrides defaults true.
//
// NO google.com OVERRIDE, on purpose: sign-in currently works and is a trip stop-rule, a
// modern UA would fetch heavier bundles onto the phase that already owns the load time,
// and Google penalises a UA/capability mismatch.
pref("general.useragent.override.web.whatsapp.com", "Mozilla/5.0 (%OS_SLICE% rv:102.0) Gecko/20100101 Firefox/102.0");

// ============================================================================
// VARAN PERFORMANCE PREFS (baked 2026-07-29, from the verified review #2 register)
// Evidence for every line is in VARAN-REVIEW2-REPORT.md; the plan is in
// VARAN-VP9-SPEED-PLAN.md. Each was read out of the source, not assumed.
// ============================================================================

// Video-decode suspend. MediaDecoderStateMachine.cpp:2261 arms a 10 s timer whenever the
// video frame is not visible and then calls SetVideoBlankDecode(true) ->
// MediaFormatReader.cpp:2366 Flush() + ShutdownDecoder(). nsFrame.cpp:702 makes a REBUILT
// video frame start out APPROXIMATELY_NONVISIBLE, so a player that reparents its <video>
// can trip this while the main thread is too busy to deliver the refresh tick that would
// clear it.
// ** DEVICE-TESTED 2026-07-29: turning this off did NOT fix the YouTube stop. ** The
// mechanism is real but it is not that bug. Kept off anyway: this device never usefully
// backgrounds video, and a spurious decoder shutdown has no upside here.
pref("media.suspend-bkgnd-video.enabled", false);

// (network.http.speculative-parallel-limit is changed AT ITS ORIGINAL SITE above, not
// duplicated here -- two definitions of the same pref in one file is how a fix silently
// gets reverted later.)

// image.multithreaded_decoding.limit -- DELIBERATELY NOT SET. Do not re-add without a
// device measurement.
//
// It was pinned to 2 here, and that was WRONG DIRECTION. image/DecodePool.cpp:234-250
// reads gfxPrefs::ImageMTDecodingLimit() (default -1) and auto-sizes: <=1 core -> 1,
// 2 cores -> 2, otherwise numCores-1. Tegra 3 reports 4 cores, so the default gives 3
// decode threads and already reserves a core for the main thread -- which is the entire
// point of the upstream heuristic. Pinning to 2 REDUCED decode parallelism, and the
// justification given ("only about 2 cores are usefully available") was an assertion
// about the companion core that nothing measured.
//
// Same shape as the MSE eviction-threshold mistake: an unmeasured override of a tuned
// default, moving in the restrictive direction. Restored to the default.

// APZ (async pan/zoom = off-main-thread scrolling). layers.async-pan-zoom.enabled is
// already true, but it is INERT on its own: gfxPlatform.cpp:2255 requires
// apz.desktop.enabled first, because for XUL apps APZ is only used with e10s or an
// explicit opt-in -- and e10s does not exist in this build. So all scrolling has been
// synchronous on the main thread, which is the worst possible arrangement on a device
// whose main thread is saturated during page load.
// ! HIGHER RISK THAN THE OTHERS. It changes how scrolling and painting meet the
// compositor, and ours is the restored D3D9 path with a 2048 texture gate (which also
// halves the displayport). If scrolling misbehaves or blank regions appear, set false --
// nothing else depends on it.
pref("apz.desktop.enabled", true);

// --- DEVICE-CONFIRMED 2026-07-29/30 on VENICE. Do not remove without a device test. ---

// P1 (slow-script killer) is fixed AT ITS ORIGINAL SITE above, near
// dom.max_script_run_time -- not duplicated here. Two definitions of one pref in a
// single file is how a fix silently gets reverted later.

// P2. media.video-max-decode-error defaults to 2, so the THIRD consecutive decode error is
// fatal and tears the pipeline down. On this device transient errors are common enough to
// hit three in a row. DEVICE RESULT: with 20, video PLAYS and seeking works.
// This raises tolerance; it does not fix whatever produces the errors.
pref("media.video-max-decode-error", 20);

// P4. Content rasterisation backend. Was "direct2d1.1,cairo" (goanna.js:751), but D2D1.1 is
// UNREACHABLE here -- D3D11 is only attempted at feature levels 10_1/10_0/9_3
// (gfxWindowsPlatform.cpp:354-356) and Tegra 3 is FL9_1 -- so every page fell through to
// cairo/pixman. And pixman has NO ARM fast paths at all: pixman-arm.obj is one instruction,
// `bx lr`, and the hot routines measure 0 NEON registers (fast_composite_over_n_8_8888, used
// by EVERY antialiased text run, is 126 scalar instructions).
// Skia needs no rebuild to select: gfxWindowsPlatform.cpp:464 puts SKIA in the content mask
// UNCONDITIONALLY. It already carries ~10x more SIMD than pixman purely from -O2
// auto-vectorisation (SkOpts.obj 1451 NEON insns vs pixman-fast-path.obj 145) -- and its
// hand-written NEON is still switched off, so there is more to come.
// DEVICE RESULT: renders correctly AND the UI loads MUCH better.
pref("gfx.content.azure.backends", "skia,cairo");

// Pairs with the -STACK:4194304 raise in uxp/config/config.mk. The JS recursion ceiling is
//   kStackQuota = min(GetWindowsStackSize(), main_thread_stack_quota_cap)
// (XPCJSContext.cpp:3288/3320). Without raising this cap the min() clamps us to 2 MB and
// most of the extra stack is unreachable from JS. 3.5 MB leaves headroom below the 4 MB
// reserve for native frames that are not JS.
// !! Judgement call, not a proven fix -- see the config.mk comment. Revert both together.
pref("javascript.options.main_thread_stack_quota_cap", 3670016);

// A4. Cycle collector slicing. goanna.js:1148 ships dom.cycle_collector.incremental=false (a
// desktop-tuned Pale Moon choice), and it is live via sIncrementalCC, so every CC is ONE
// unbounded main-thread block instead of 5 ms slices with 32 ms gaps. Independent review cut
// the expected win (ScanRoots+CollectWhite is unsliceable anyway, slices grow to 40 ms, and CC
// reverts to unlimited past 2 s) -- taken because it is free, not because it is large.
// NOT device-isolated.
pref("dom.cycle_collector.incremental", true);

// A5. Content-sink event probe. all.js wraps pref("content.sink.pending_event_mode", 0) in
// #ifndef XP_WIN, so Windows keeps the code default of 1, which does two win32k syscalls on
// EVERY tree operation while parsing. Review graded this SMALL (bounded by tree-op count, and
// the probe is skipped for the last op of each flush batch). Free, so taken.
// NOT device-isolated.
pref("content.sink.pending_event_mode", 0);

// NOT SET, ON PURPOSE: media.hardware-video-decoding.force-enabled stays false.
// The downstream path does look open now (gfxWindowsPlatform.cpp:383 skips
// TextureSharingWorks because prefer-d3d9 is baked true; WMFVideoMFTManager.cpp:397
// accepts LAYERS_D3D9; DXVA2Manager.cpp:461 gives a natively-hosted D3D9SurfaceImage with
// zero CPU copies). But when it was set on device, together with two other prefs, the
// result was total decode failure ("could not be decoded" x5). It gets tested ALONE
// before it is ever baked.
//
// VARAN B2 (2026-08-01): *** THE ALONE-TEST IS DONE. THIS PREF IS THE CULPRIT. ***
// DEVICE-PROVEN HARMFUL, ISOLATED TO THIS ONE PREF. Same avc1 video, same build,
// same profile shape, ONE pref different:
//   force-enabled = FALSE -> plays. stats-for-nerds: avc1.4d401e (134) / opus (251),
//                            640x360, 7174 frames, 0 dropped, buffer health 35.6 s.
//                            [currentTime, readyState, error] = [165.19, 4, null]
//   force-enabled = TRUE  -> "Media resource blob:... could not be decoded." x4,
//                            repeated across two different videos.
//                            [currentTime, readyState, error] = [0, 0, null]
// So the earlier three-pref trip's "could not be decoded x5" was THIS pref all along.
// It is no longer merely suspected or confounded -- it is isolated and confirmed.
//
// MECHANISM: forcing DXVA past the blocklist makes H.264 decoder CREATION fail on
// FL9_1/Tegra 3, and there is no fallback to the software WMF path -- so instead of
// losing hardware acceleration we lose H.264 decoding entirely.
//
// COROLLARY, and it corrects an earlier reading: about:support's
// "Hardware H264 Decoding: No; Failed to create H264 decoder" was measured in the
// profile that had THIS PREF ON. It was accurately reporting the damage the pref does,
// not a missing OS decoder. H.264 decodes FINE on this device when the pref is false.
//
// *** DO NOT SET THIS. DO NOT RETEST IT. It is closed, against evidence. ***
// The Track B trip ships a SECOND fresh profile whose user.js sets ONLY this pref,
// so it differs from the baseline profile in exactly one variable -- which is what
// "tested ALONE" requires, and what the earlier three-pref attempt could not give.
// It is deliberately NOT baked here: the trip's PRIORITY is the B1 InvalidStateError
// capture, and B1 needs video to play far enough to throw. Baking a pref with a
// recorded history of TOTAL decode failure into the baseline profile would risk
// destroying the priority measurement to obtain a secondary one.
// If the isolated profile shows hardware decode working, bake it then.
// Chain, for whoever runs it: media.hardware-video-decoding.enabled (all.js:378, true)
//   && media.windows-media-foundation.use-dxva (true) && gfxInfo FEATURE_STATUS
//   -> (status==OK || force-enabled) -> sLayersSupportsHardwareVideoDecoding
//   -> gfxVars::CanUseHardwareVideoDecoding -> sDXVAEnabled (WMFDecoderModule.cpp:52)
//   -> aDXVAEnabled -> mDXVAEnabled -> the gate at WMFVideoMFTManager.cpp:392.
// The failure reason is already plumbed: mDXVAFailureReason surfaces in about:support.

// ============================================================================
// VARAN DEVICE-TEST GPU ACTIVATION (baked so the tester need not hand-set them).
// D3D9 hardware compositing is DEVICE-PROVEN on Tegra 3 (M5: about:support
// Compositing = Direct3D 9, GPU-accelerated 1/1). These three are what turn it on:
//   disabled=false : without this NOTHING accelerates (it was baked true for the
//                    software-only default; M4.3 E1).
//   force=true     : bypasses the UNKNOWN_DEVICE_VENDOR blocklist (UserForceEnable).
//   prefer-d3d9    : offer D3D9 FIRST and disable the D3D11 attempt that fails at FL9_1.
// prefer-opengl stays false (a doomed WGL/EGL attempt) and allow-d3d9-fallback stays
// true -- both already correct in all.js.
// For the Ion A/B this is a CONSTANT across ion=true/false, so Ion stays the only variable.
// ============================================================================
pref("layers.acceleration.disabled", false);
pref("layers.acceleration.force",    true);
pref("layers.prefer-d3d9",           true);
