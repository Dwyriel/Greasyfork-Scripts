// ==UserScript==
// @name         Fextralife Remove Twitch and Fix Layout
// @namespace    https://github.com/Dwyriel
// @version      1.2
// @description  Removes twitch stream and fix layout for better readability.
// @author       Dwyriel
// @license      MIT
// @match        https://*.fextralife.com/*
// @grant        none
// @homepageURL  https://github.com/Dwyriel/Greasyfork-Scripts
// ==/UserScript==

(function () {
    'use strict';
    const minMargin = 16, snapWidth = 480, desktopWidth = 1200, largeMobile = 768, maxMargin = 73.5 - minMargin, buggyNavbarBreakpoint = 1218;

    const wrapper = document.getElementById("wrapper");
    const fexMain = document.querySelector(".fex-main");
    const navbar = document.querySelector(".navbar");

    const removeStreamAndSidebar = () => {
        document.getElementById("sidebar-wrapper")?.remove();
        document.getElementById("fextrastream")?.remove();
    };

    //makes the main content look good on bigger screens and remove the giant spacing on the upper part
    const desktopFix = () => {
        fexMain.style = "max-width: 1024px;";
        document.getElementById("form-header").style = "max-height: 60px; margin-top: 0px;";
    };

    //navbar won't show up when width is between 1200 and 1218 otherwise
    const navbarFix = (windowWidth) => {
        navbar.style = windowWidth > desktopWidth && windowWidth < buggyNavbarBreakpoint ? "display: block !important" : "";
    };

    //Bunch of small changes to make it look more consistent
    const smallSpacingFixes = (windowWidth) => {
        wrapper.style.paddingLeft = windowWidth > snapWidth ? "4px" : "0px";
        let marginSize = "0px";
        if (windowWidth > desktopWidth)
            marginSize = "auto";
        else if (windowWidth >= largeMobile)
            marginSize = `${((windowWidth - largeMobile) / (desktopWidth - largeMobile) * maxMargin) + minMargin}px`;
        else if (windowWidth > snapWidth)
            marginSize = `${minMargin}px`;
        fexMain.style.marginLeft = marginSize;
        fexMain.style.marginRight = marginSize;
    };

    //function to be called every 'resize' event
    const fixLayout = () => {
        let windowWidth = window.innerWidth;
        navbarFix(windowWidth);
        smallSpacingFixes(windowWidth);
    };

    removeStreamAndSidebar();
    desktopFix();
    fixLayout();
    window.addEventListener('resize', () => fixLayout());
})();