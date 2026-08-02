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

  get navbarAtBottom() { return this._getBool(this.PREF_NAVBAR); },
  get tabsAtBottom()   { return this._getBool(this.PREF_TABS); },

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
      if (!navbarAtBottom && !tabsAtBottom) {
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
    } catch (e) {
      Components.utils.reportError("VaranLayout.applyEarly failed, chrome " +
                                   "layout left as shipped: " + e);
    }
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
      if ((this.navbarAtBottom || this.tabsAtBottom) &&
          typeof TabsInTitlebar == "object" && TabsInTitlebar) {
        TabsInTitlebar.allowedBy("varan-bottom-layout", false);
      }
    } catch (e) {
      Components.utils.reportError("VaranLayout.applyLate: " + e);
    }
  }
};
