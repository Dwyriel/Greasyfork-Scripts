// ==UserScript==
// @name         Return Youtube Dislike On Mobile
// @namespace    https://github.com/Dwyriel
// @version      1.0
// @description  Return dislikes on youtube mobile page. Uses returnyoutubedislike.com API
// @author       Dwyriel
// @license      MIT
// @match        *://*.youtube.com/*
// @grant        none
// @homepageURL  https://github.com/Dwyriel/Greasyfork-Scripts
// ==/UserScript==

(function () {
    'use strict';
    const API_URL = "https://returnyoutubedislikeapi.com/votes?videoId="
    const buttonTag = "ytm-toggle-button-renderer";
    const dislikeButtonID = "dislikeButtonID_198wa16df78ms1d";

    let dislikeCache = {};
    let oldURL = "";
    let videoID;
    let fetching = false;

    const config = { attributes: true, childList: true, subtree: true };
    let mutationObserver = new MutationObserver(() => { });

    const getVideoID = () => {
        return (new Proxy(new URLSearchParams(window.location.search), { get: (UrlSearchParams, key) => UrlSearchParams.get(key) })).v;
    }

    const formatedDislikeNumber = () => {
        let dislikes = dislikeCache[videoID];
        let formattedNum = 0, character = '';
        if (dislikes / 1000000000 >= 1) {
            formattedNum = Math.round(dislikes / 1000000000);
            character = 'B';
        } else if (dislikes / 1000000 >= 1) {
            formattedNum = Math.round(dislikes / 1000000);
            character = 'M';
        } else if (dislikes / 1000 >= 1) {
            formattedNum = Math.round(dislikes / 1000);
            character = 'K';
        } else
            formattedNum = dislikes;
        return formattedNum + character;
    }

    const modifyDislikeButton = () => { //check explanation at the end of the file
        let elements = document.getElementsByTagName(buttonTag);
        if (elements.length == 0)
            return;
        document.getElementById(dislikeButtonID)?.remove();

        let dislikeButton = elements[1].children[0];

        dislikeButton.children[0].style = "margin: 0 6px 0 -6px";

        let dislikes = elements[0].children[0].children[1].cloneNode(true);
        dislikes.id = dislikeButtonID;
        dislikeButton.appendChild(dislikes);
        dislikeButton.appendChild(dislikeButton.children[1]);

        let dislikeString = formatedDislikeNumber();
        dislikes.children[0].innerHTML = dislikeString;

        dislikeButton.style = `width: ${56 + (8 * dislikeString.length)}px`;
    }

    let hookObserver = async () => {
        let buttons = document.getElementsByTagName(buttonTag);
        if (buttons.length > 0) {
            mutationObserver.disconnect();
            modifyDislikeButton();
            mutationObserver.observe(buttons[1].parentNode, config);
        }
        else
            await new Promise(() => setTimeout(hookObserver, 100));
    }

    const callback = () => {
        let currURL = window.location.href;
        if (window.location.pathname != "/watch") {
            oldURL = currURL;
            return;
        }
        if (fetching || (oldURL == currURL))
            return;
        fetching = true;
        oldURL = currURL;

        videoID = getVideoID();
        if (typeof videoID != 'string') {
            fetching = false;
            return;
        }

        if (dislikeCache[videoID] != undefined) {
            fetching = false;
            hookObserver();
            return;
        }

        let request = new Request(API_URL + videoID);
        fetch(request).then(response => response.json(), (reason) => { fetching = false; console.error("Couldn't fetch dislikes", reason) }).then(response => {
            dislikeCache[videoID] = response.dislikes;
            fetching = false;
            hookObserver();
        }, (reason) => { fetching = false; console.error("Couldn't fetch dislikes", reason) });
    };

    mutationObserver = new MutationObserver(() => {
        hookObserver();
    });

    const old_pushState = history.pushState;
    history.pushState = function pushState() {
        let origFuncReturn = old_pushState.apply(this, arguments);
        window.dispatchEvent(new Event('historyChanged'));
        return origFuncReturn;
    };
    window.addEventListener('popstate', () => window.dispatchEvent(new Event('historyChanged')));

    window.addEventListener('load', () => {
        callback();
    });
    window.addEventListener('historyChanged', () => {
        mutationObserver.disconnect();
        callback();
    });
})();

/* modifyDislikeButton function explanation

    let elements = document.getElementsByTagName(likeButtonTag); //get both like and dislike buttons if they exist
    if (elements.length == 0)
        return;
    document.getElementById(dislikeButtonID)?.remove(); //remove if it was already created before

    let likeButtonElement = elements[0]; //like button is always the first
    let actualLikeButton = likeButtonElement.children[0]; //only has 1 children (a Button tag)
    let likes = actualLikeButton.children[1]; //like/dislike count is always the second children (the first is the icon)

    let dislikeButtonElement = elements[1];//same as above, for the second(dislike) button
    let actualDislikeButton = dislikeButtonElement.children[0];

    let dislikeIcon = actualDislikeButton.children[0];
    dislikeIcon.style = "margin: 0 6px 0 -6px"; //applies the same margin that the like icon has

    let dislikes = likes.cloneNode(true);
    actualDislikeButton.appendChild(dislikes); //appends cloned Node as the last child
    actualDislikeButton.appendChild(actualDislikeButton.children[1]); //move second Node to last pos to keep them consistent

    dislikeButton.style = `width: ${56 + (8 * dislikeString.length)}px`; //increase dislike button size using a similar formula of the like button

    let dislikeText = dislikes.children[0]; //get span inside dislike div
    dislikeText.innerHTML = dislikeCount;

*/