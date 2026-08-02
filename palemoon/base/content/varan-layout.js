// -*- Mode: javascript; indent-tabs-mode: nil; js-indent-level: 2 -*-
// NOTE: this file is NOT preprocessed (no `*` on its jar.mn line), so a `#` in
// column 0 would be a JS syntax error rather than a preprocessor comment.
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Varan -- user-selectable BOTTOM placement for the navigation bar and the
 * tab strip.
 *
 * WHY THIS IS JS AND NOT CSS. `-moz-box-ordinal-group` only reorders siblings
 * within one box. #nav-bar and #TabsToolbar are children of #navigator-toolbox
 * while the page is inside #browser -- different parents -- so no stylesheet
 * can move one bar past the content. Crossing that boundary needs a real DOM
 * reparent, which is what this file does. (Reordering the three #browser-panel
 * siblings IS possible in CSS, but that moves the WHOLE toolbox -- menubar and
 * bookmarks included -- which is not the feature.)
 *
 * WHY IT IS SAFE TO REPARENT A TOOLBAR. #addon-bar already ships as a
 * customizable toolbar living OUTSIDE the toolbox, in #browser-bottombox,
 * staying wired to toolbar customization purely via toolboxid= (browser.xul).
 * That is the in-tree precedent this mirrors: setting toolboxid registers the
 * toolbar into toolbox.externalToolbars (toolbar.xml, `toolbox` getter), which
 * is what restores the customize palette, item wrapping, currentset
 * persistence, and per-toolbar iconsize upkeep
 * (browser.js retrieveToolbarIconsizesFromTheme iterates externalToolbars).
 *
 * WHY applyEarly RUNS FROM AN INLINE <script> AT THE END OF browser.xul.
 * At that point every element exists but frame construction has not happened,
 * so the toolbars are only ever laid out in their final position: no visible
 * re-flow when a window opens, and -- the part that matters -- the tab strip is
 * never reframed after <tabbrowser> has bound to it.
 *
 * FAILURE POLICY: every entry point is wrapped. A fault in optional layout
 * polish must never stop a browser window from opening, so on any error we
 * report and leave the DOM exactly as the markup shipped it.
 */

var VaranLayout = {
  PREF_NAVBAR: "browser.varan.layout.navbarAtBottom",
  PREF_TABS:   "browser.varan.layout.tabsAtBottom",

  // Read prefs through raw XPCOM rather than Services.jsm: applyEarly runs
  // while the document is still parsing and must not depend on what any other
  // script has imported yet.
  _getBool: function(aName) {
    try {
      return Components.classes["@mozilla.org/preferences-service;1"]
                       .getService(Components.interfaces.nsIPrefBranch)
                       .getBoolPref(aName);
    } catch (e) {
      return false;
    }
  },

  PREF_BOOKMARKS:   "browser.varan.layout.bookmarksAtBottom",
  PREF_ACC_CHROME:  "browser.varan.accent.chrome",
  PREF_ACC_TABS:    "browser.varan.accent.tabs",
  PREF_ACC_DWM:     "browser.varan.accent.useDwm",
  PREF_HIDE_BM:     "browser.varan.layout.hideBookmarksBar",

  get navbarAtBottom()    { return this._getBool(this.PREF_NAVBAR); },
  get tabsAtBottom()      { return this._getBool(this.PREF_TABS); },
  get bookmarksAtBottom() { return this._getBool(this.PREF_BOOKMARKS); },

  /**
   * Move the requested toolbars into #browser-bottombox.
   *
   * Resulting bottom stack, top-to-bottom:
   *     #global-notificationbox   (stays closest to the page)
   *     #TabsToolbar              (if tabsAtBottom)
   *     #nav-bar                  (if navbarAtBottom)
   *     #addon-bar                (status bar stays the last row)
   *
   * The visual order is pinned in CSS, not by this insertion order, because
   * browser.css carries an id-based `#TabsToolbar { -moz-box-ordinal-group:
   * 100 }` that keeps matching after the move and would otherwise win.
   */
  applyEarly: function() {
    try {
      let navbarAtBottom = this.navbarAtBottom;
      let tabsAtBottom   = this.tabsAtBottom;
      let bmAtBottom     = this.bookmarksAtBottom;

      // The accent attributes are independent of placement -- tab accent is
      // wanted with tabs at the TOP too -- so they are stamped before the
      // early-out, not inside the relocation branches.
      let root = document.getElementById("main-window");
      if (root) {
        if (this._getBool(this.PREF_ACC_CHROME)) root.setAttribute("varan-accent-chrome", "true");
        if (this._getBool(this.PREF_ACC_TABS))   root.setAttribute("varan-accent-tabs", "true");
      }

      // Hiding is independent of placement, so it runs before the early-out.
      // `collapsed` is the same attribute View > Toolbars toggles, so the two
      // agree rather than fight: this just sets the startup state.
      this._setCollapsed("PersonalToolbar", this._getBool(this.PREF_HIDE_BM));

      if (!navbarAtBottom && !tabsAtBottom && !bmAtBottom) {
        return;
      }

      let win       = document.getElementById("main-window");
      let bottombox = document.getElementById("browser-bottombox");
      let addonBar  = document.getElementById("addon-bar");
      if (!win || !bottombox) {
        return;
      }

      if (tabsAtBottom) {
        let tabs = document.getElementById("TabsToolbar");
        if (tabs) {
          // The caption-button / appmenu placeholders reserve room for the
          // window controls painted into the titlebar. They travel with the
          // toolbar and would leave dead gaps at the bottom of the window.
          let placeholders = tabs.getElementsByAttribute("class",
                                                         "titlebar-placeholder");
          for (let i = placeholders.length - 1; i >= 0; i--) {
            placeholders[i].parentNode.removeChild(placeholders[i]);
          }
          this._relocate(tabs, bottombox, addonBar);
          win.setAttribute("varan-tabs", "bottom");
        }
      }

      if (navbarAtBottom) {
        let navbar = document.getElementById("nav-bar");
        if (navbar) {
          this._relocate(navbar, bottombox, addonBar);
          win.setAttribute("varan-navbar", "bottom");
        }
      }

      // Bookmarks last, so it lands between the address bar and the status bar
      // -- the order the bars appear in reading position from the page down.
      if (bmAtBottom) {
        let bm = document.getElementById("PersonalToolbar");
        if (bm) {
          this._relocate(bm, bottombox, addonBar);
          win.setAttribute("varan-bookmarks", "bottom");
        }
      }
    } catch (e) {
      Components.utils.reportError("VaranLayout.applyEarly failed, chrome " +
                                   "layout left as shipped: " + e);
    }
  },

  _setCollapsed: function(aId, aHide) {
    try {
      let el = document.getElementById(aId);
      if (!el) return;
      if (aHide) {
        el.setAttribute("collapsed", "true");
      }
      // Deliberately NOT an else-branch that un-collapses: #addon-bar ships
      // collapsed="true" by default and the user may have hidden either bar from
      // View > Toolbars. Forcing them visible when the pref is off would override
      // a choice made elsewhere in the UI.
    } catch (e) {}
  },

  _relocate: function(aToolbar, aBottombox, aBefore) {
    // toolboxid keeps the toolbar registered with #navigator-toolbox for
    // customization even though it no longer lives inside it.
    aToolbar.setAttribute("toolboxid", "navigator-toolbox");
    if (aBefore && aBefore.parentNode == aBottombox) {
      aBottombox.insertBefore(aToolbar, aBefore);
    } else {
      aBottombox.appendChild(aToolbar);
    }
  },

  /**
   * Runs from gBrowserInit.onLoad, once browser.js's objects exist.
   *
   * Suppresses drawing tabs into the titlebar while a bottom layout is active.
   * Uses TabsInTitlebar.allowedBy -- the same mechanism browser.js already uses
   * for "customizing-toolbars" and "tabs-on-top" -- deliberately IN PREFERENCE
   * to overwriting browser.tabs.drawInTitlebar: this is a per-window, fully
   * reversible suppression that never edits a pref the user owns.
   */
  applyLate: function() {
    try {
      if ((this.navbarAtBottom || this.tabsAtBottom || this.bookmarksAtBottom) &&
          typeof TabsInTitlebar == "object" && TabsInTitlebar) {
        TabsInTitlebar.allowedBy("varan-bottom-layout", false);
      }
      if (this._getBool(this.PREF_ACC_CHROME) || this._getBool(this.PREF_ACC_TABS)) {
        this._applySystemAccent();
      }
    } catch (e) {
      Components.utils.reportError("VaranLayout.applyLate: " + e);
    }
  },

  // ACCENT FROM PAGE was implemented and REMOVED: it never took effect on device
  // and could not be diagnosed without a debuggable build there. Shipping a
  // checkbox that does nothing is worse than not offering it. The accent
  // plumbing is source-agnostic (everything reads --varan-accent), so it can be
  // reinstated later by populating that variable from a different source.,

  /**
   * Read the user's Windows accent colour and publish it as --varan-accent.
   *
   * WHY NOT -moz-win-accentcolor: that system colour and the
   * @media (-moz-windows-accent-color-applies) query gating it are WINDOWS-10-ERA.
   * On Windows 8.1 the query never matches, so a stylesheet written against it is
   * completely inert -- which is what shipped first, and why no accent appeared
   * anywhere. A media query that never matches is indistinguishable from correct
   * CSS: no error, no warning, just nothing.
   *
   * WINDOWS EXPOSES TWO COLOURS AND THEY NEED NOT MATCH -- the device owner saw
   * both on screen at once:
   *   ColorizationColor  ARGB  what the window frame / titlebar is tinted with
   *   AccentColor        ABGR  the accent picked in Personalisation
   * Which to follow is therefore a preference, not a bug.
   *
   * AND THE ACCENT KEY MOVED BETWEEN RELEASES (carried from the TelegArm project,
   * which hit this and logged it): reading the Windows 10 key on 8.1 silently
   * returns nothing and falls back to blue, so it presents as "accent is broken"
   * rather than "wrong key".
   */
  _readSystemAccent: function() {
    try {
      let useDwm = this._getBool(this.PREF_ACC_DWM);
      let major = 6;
      try {
        let v = Components.classes["@mozilla.org/system-info;1"]
                  .getService(Components.interfaces.nsIPropertyBag2)
                  .getProperty("version");          // "6.3" = 8.1, "10.0" = Win10
        major = parseInt(String(v).split(".")[0], 10) || 6;
      } catch (e) {}

      let path, name;
      if (useDwm) {
        path = "Software\\Microsoft\\Windows\\DWM";
        name = "ColorizationColor";
      } else if (major >= 10) {
        path = "Software\\Microsoft\\Windows\\DWM";
        name = "AccentColor";
      } else {
        path = "Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Accent";
        name = "AccentColor";
      }

      let key = Components.classes["@mozilla.org/windows-registry-key;1"]
                  .createInstance(Components.interfaces.nsIWindowsRegKey);
      key.open(key.ROOT_KEY_CURRENT_USER, path, key.ACCESS_READ);
      let raw;
      try {
        if (!key.hasValue(name)) { key.close(); return null; }
        raw = key.readIntValue(name);
      } finally {
        key.close();
      }
      if (raw === null || raw === undefined) return null;

      let r, g, b;
      if (useDwm) {
        r = (raw >> 16) & 0xFF; g = (raw >> 8) & 0xFF; b = raw & 0xFF;   // ARGB
      } else {
        r = raw & 0xFF; g = (raw >> 8) & 0xFF; b = (raw >> 16) & 0xFF;   // ABGR
      }

      // Foreground from relative luminance, so text stays readable on a LIGHT
      // accent instead of assuming white.
      let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return { bg: "rgb(" + r + "," + g + "," + b + ")",
               fg: lum > 0.6 ? "black" : "white" };
    } catch (e) {
      return null;
    }
  },

  _applySystemAccent: function() {
    try {
      let root = document.getElementById("main-window");
      if (!root) return;
      let a = this._readSystemAccent();
      if (a) {
        root.style.setProperty("--varan-accent", a.bg);
        root.style.setProperty("--varan-accent-text", a.fg);
        // Only now may the accent rules fire. Without this they could apply with
        // an undefined variable and paint bars in whatever `initial` resolves to.
        root.setAttribute("varan-accent-ok", "true");
      }
    } catch (e) {}
  }
};
