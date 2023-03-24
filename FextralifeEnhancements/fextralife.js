// ==UserScript==
// @name         Fextralife Remove Twitch and Fix Layout
// @namespace    https://github.com/Dwyriel
// @version      1.0
// @description  Removes twitch stream and fix layout for better readability.
// @author       Dwyriel
// @license      MIT
// @match        https://*.fextralife.com/*
// @grant        none
// @homepageURL  https://github.com/Dwyriel/Fextralife-Enhancements
// ==/UserScript==

(function () {
    'use strict';
    const minMargin = 16, snapWidth = 480, desktopWidth = 1200, largeMobile = 768, maxMargin = 73.5 - minMargin;
    document.getElementById("sidebar-wrapper")?.remove();
    document.getElementById("wrapper").style.paddingLeft = "0px";
    let fexMain = document.querySelector(".fex-main");
    fexMain.style = "max-width: 1024px;";
    const fixLayout = () => {
        let windowWidth = window.innerWidth;
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
    fixLayout();
    window.addEventListener('resize', () => fixLayout());
})();