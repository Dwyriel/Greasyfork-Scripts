// ==UserScript==
// @name         Remove Youtube Propaganda
// @namespace    https://github.com/Dwyriel
// @version      1.2
// @description  Tries to remove any banner and other dismissibles that are plain annoying (or straight up propaganda).
// @author       Dwyriel
// @license      MIT
// @match        *://*.youtube.com/*
// @grant        none
// @homepageURL  https://github.com/Dwyriel/Greasyfork-Scripts
// ==/UserScript==

(function () {
    'use strict';
    const idsToRemove = ["big-yoodle", "clarify-box"];
    const elementsToRemove = ["ytm-statement-banner-renderer", "ytd-clarification-renderer"];
    const callback = () => {
        for (let id of idsToRemove)
            document.getElementById(id)?.remove();
        for (let elementName of elementsToRemove) {
            let elements = document.getElementsByTagName(elementName);
            for (let element of elements)
                element.remove();
        }
    };
    const config = { attributes: true, childList: true, subtree: true };
    new MutationObserver(callback).observe(document.body, config);
})();