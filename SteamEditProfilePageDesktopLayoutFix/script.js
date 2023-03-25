// ==UserScript==
// @name         Steam Edit Profile Page Desktop Layout Fix
// @namespace    https://github.com/Dwyriel
// @version      1.0
// @description  Fixes the desktop layout of steam's profile edit page.
// @author       Dwyriel
// @license      MIT
// @match        *://*steamcommunity.com/id/*/edit/*
// @grant        none
// @homepageURL  https://github.com/Dwyriel/Greasyfork-Scripts
// ==/UserScript==

(function () {
    'use strict';
    window.onload = () => {
        const header = document.getElementById("responsive_page_template_content");
        if (!header) return;
        header.removeAttribute("class");
        header.style = "max-height: 120px";
        document.getElementsByClassName("maincontent")[0].parentElement.remove();//needs to be here otherwise it breaks the site
        const appRoot = document.getElementById("application_root");
        if (!appRoot) return;
        appRoot.style = `max-width: 978px; margin: 0 auto 0 auto; padding-bottom: 1px`;
        header.parentNode.insertBefore(header, appRoot);
    }
})();