// ==UserScript==
// @name         BrainlyBypassPaywall
// @namespace    https://github.com/Dwyriel
// @version      1.3.1
// @description  Clears brainly's local storage to reset daily count to bypass the paywall
// @author       Dwyriel
// @license      MIT
// @match        *://*brainly.pl/*
// @match        *://*znanija.com/*
// @match        *://*brainly.lat/*
// @match        *://*brainly.com.br/*
// @match        *://*nosdevoirs.fr/*
// @match        *://*eodev.com/*
// @match        *://*brainly.ro/*
// @match        *://*brainly.co.id/*
// @match        *://*brainly.in/*
// @match        *://*brainly.ph/*
// @match        *://*brainly.com/*
// @grant        none
// @run-at       document-start
// @homepageURL  https://github.com/Dwyriel/Greasyfork-Scripts
// ==/UserScript==

(function () {
    'use strict';
    localStorage.clear();
    //Uncomment to also clear sessionStorage in case they move from localStorage to it
    //sessionStorage.clear();
})();