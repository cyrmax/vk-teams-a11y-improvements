// ==UserScript==
// @name         VKTeamsOpt
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Applies few accessibility optimizations to Vk Teams interface.
// @author       Cyrmax
// @updateURL https://cyrmax.github.io/vkteamsopt
// @downloadURL https://cyrmax.github.io/vkteamsopt
// @match        https://myteam.mail.ru/webim*
// @run-at document-start
// @grant unsafeWindow
// ==/UserScript==

// Entry point, set timers which run opt functions periodically.
(function () {
    unsafeWindow.setInterval(optUnread, 500);
    unsafeWindow.setInterval(optThreadsHeaders, 2000);
    unsafeWindow.setInterval(optChatList, 2000);
    unsafeWindow.setInterval(optMessagesList, 500);
})();


function optUnread() {
    let elems = document.evaluate('//span[text()="New messages"]', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
    let elemsArray = [];
    while ((node = elems.iterateNext())) {
        elemsArray.push(node);
    }
    for (const elem of elemsArray) {
        elem.setAttribute("role", "heading");
    }
}


function optThreadsHeaders() {
    for (const elem of document.querySelectorAll("div.im-thread-flow__header")) {
        elem.setAttribute("role", "heading");
    }
}


function optChatList() {
    let chatList = document.querySelector("div.im-recent-list");
    if (chatList) {
        chatList.setAttribute("role", "list");
    }
    for (const elem of document.querySelectorAll("div.im-recent-wrapper")) {
        elem.setAttribute("role", "listitem");
        let innerElem = elem.querySelector("div.im-recent-item__box");
        innerElem.setAttribute("role", "link");
        let label = "";
        if (unreadElem = elem.querySelector("div.im-msg-counter")) {
            label += unreadElem.textContent + " Unread ";
        }
        if (e = elem.querySelector(".im-recent-item__title>span")) {
            label += e.textContent + ". ";
        }
        // if (e = elem.querySelector(".im-recent-item__lastmsg>span")) {
        //     label += e.textContent + ". ";
        // }
        if (e = elem.querySelector(".im-recent-item__lastmsg")) {
            label += e.textContent + ". ";
        }
        if (elem.querySelector("div.im-msg-seenby")) {
            label += "seen ";
        }
        innerElem.setAttribute("aria-label", label);
    }
}


function optMessagesList() {
    for (const elem of document.querySelectorAll("div.im-chat__messages-wrap")) {
        elem.setAttribute("role", "list");
    }
    for (const elem of document.querySelectorAll("div.imMessage,div.im-message")) {
        elem.setAttribute("role", "listitem");
    }
    for (const elem of document.querySelectorAll("div.im-messages__date")) {
        elem.setAttribute("role", "heading");
    }
}
