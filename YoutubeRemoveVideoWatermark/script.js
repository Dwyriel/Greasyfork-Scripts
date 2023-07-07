// ==UserScript==
// @name         Youtube Remove Video Watermark
// @namespace    https://github.com/Dwyriel
// @version      1.1
// @description  Simply removes the branding watermark from some videos, for slightly better video visibility.
// @author       Dwyriel
// @license      MIT
// @match        *://*.youtube.com/*
// @grant        none
// @homepageURL  https://github.com/Dwyriel/Greasyfork-Scripts
// ==/UserScript==

(function () {
    'use strict';
    const elementsByIdToRemove = [];
    const elementsByNameToRemove = [];
    const elementsByClassToRemove = [
        "branding-img" // the image inside the button, removing this makes the button have a size of 0x0, keeping its functionality to avoid errors but essencially removing it.
    ];
    const callback = () => {
        for (let id of elementsByIdToRemove)
            document.getElementById(id)?.remove();
        for (let elementName of elementsByNameToRemove) {
            let elements = document.getElementsByTagName(elementName);
            for (let element of elements)
                element.remove();
        }
        for (let className of elementsByClassToRemove){
            let elements = document.getElementsByClassName(className);
            for (let element of elements)
                element.remove();
        }
    };
    const config = { attributes: true, childList: true, subtree: true };
    new MutationObserver(callback).observe(document.body, config);
})();