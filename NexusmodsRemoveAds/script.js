// ==UserScript==
// @name         Nexusmods Remove Ads
// @namespace    https://github.com/Dwyriel
// @version      1.0
// @description  Removes most, if not all, ads from Nexusmods.
// @author       Dwyriel
// @license      MIT
// @match        *://*.nexusmods.com/*
// @grant        none
// @homepageURL  https://github.com/Dwyriel/Greasyfork-Scripts
// ==/UserScript==

(function () {
    'use strict';
    const elementsByIdToRemove = [];
    const elementsByNameToRemove = [];
    const elementsByClassToRemove = [
        "sidebar-sticky",
        "ads",
        "video-ad"
    ];
    const specialFirstQuery = [
        'a[href="https://users.nexusmods.com/account/billing/premium"]'
    ]
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
        let nodes = document.querySelectorAll(specialFirstQuery);
        for (let node of nodes){
            if(node.parentElement.matches("div"))
                node.parentElement.remove();
        }
    };
    const config = { attributes: true, childList: true, subtree: true };
    new MutationObserver(callback).observe(document.body, config);
})();