// ==UserScript==
// @name         BrainlyBypassPaywall
// @namespace    https://github.com/Dwyriel
// @version      1.0
// @description  Clears brainly's local storage to reset daily count an bypass the paywall
// @author       Dwyriel
// @license      MIT
// @match        *://*brainly.in/*
// @match        *://*brainly.com/*
// @match        *://*brainly.it/*
// @match        *://*brainly.co.id/*
// @match        *://*brainly.ro/*
// @match        *://*brainly.ph/*
// @match        *://*brainly.lat/*
// @match        *://*brainly.pl/*
// @match        *://*brainly.com.br/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    localStorage.clear();
})();
