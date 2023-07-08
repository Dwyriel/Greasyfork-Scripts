// ==UserScript==
// @name         Fextralife Remove Twitch and Fix Layout
// @namespace    https://github.com/Dwyriel
// @version      1.1
// @description  Removes twitch stream and fix layout for better readability.
// @author       Dwyriel
// @license      MIT
// @match        https://*.fextralife.com/*
// @grant        none
// @homepageURL  https://github.com/Dwyriel/Greasyfork-Scripts
// ==/UserScript==

(function () {
    'use strict';
    const minMargin = 16, snapWidth = 480, desktopWidth = 1200, largeMobile = 768, maxMargin = 73.5 - minMargin;
    document.getElementById("sidebar-wrapper")?.remove();
    document.getElementById('fextrastream')?.remove();
    let wrapper = document.getElementById("wrapper");
    let fexMain = document.querySelector(".fex-main");
    //makes the main content look good on bigger screens and remove the giant spacing on the upper part
    fexMain.style = "max-width: 1024px;";
    document.getElementById("form-header").style = "max-height: 60px; margin-top: 0px;";
    const fixLayout = () => {
        //window.innerWidth AND window.outerWidth had problems when the width was in the ranges of 475-480, body size was still correct but window size was going all over the place.. for whatever reason
        let windowWidth = document.body.clientWidth;
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
    fixLayout();
    window.addEventListener('resize', () => fixLayout());
})();