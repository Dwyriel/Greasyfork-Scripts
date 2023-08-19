// ==UserScript==
// @name         Youtube Remove Video Watermark
// @namespace    https://github.com/Dwyriel
// @version      1.2
// @description  Simply removes the branding watermark from some videos, for slightly better video visibility.
// @author       Dwyriel
// @license      MIT
// @match        *://*.youtube.com/*
// @grant        none
// @homepageURL  https://github.com/Dwyriel/Greasyfork-Scripts
// ==/UserScript==

(function () {
    'use strict';
    const elementByClassToRemove = "branding-img"; // the image inside the button, removing this makes the button have a size of 0x0, keeping its functionality to avoid errors but essentially removing it.
    const callback = () => {
        let elements = document.getElementsByClassName(elementByClassToRemove);
        for (let element of elements)
            element.remove();
    };
    const config = { attributes: true, childList: true, subtree: true };
    new MutationObserver(callback).observe(document.body, config);
})();