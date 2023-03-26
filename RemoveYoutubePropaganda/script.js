// ==UserScript==
// @name         Remove Youtube Propaganda
// @namespace    https://github.com/Dwyriel
// @version      1.3
// @description  Tries to remove any banner and other dismissibles that are plain annoying (or straight up propaganda).
// @author       Dwyriel
// @license      MIT
// @match        *://*.youtube.com/*
// @grant        none
// @homepageURL  https://github.com/Dwyriel/Greasyfork-Scripts
// ==/UserScript==

(function () {
    'use strict';
    const idsToRemove = [
        "big-yoodle", //main page banner
        "clarify-box" //video page "clarification"
    ];
    const elementsToRemove = [
        "ytm-statement-banner-renderer", "ytd-statement-banner-renderer", //main page banner
        "ytm-clarification-renderer", "ytd-clarification-renderer", //search page "clarification" (specific topics only)
        "ytm-info-panel-container-renderer", "ytd-info-panel-container-renderer" //search page "clarification" (specific topics only)
    ];
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