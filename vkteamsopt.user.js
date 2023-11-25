// ==UserScript==
// @name         VKTeamsOpt
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Applies few accessibility optimizations to Vk Teams interface.
// @author       Cyrmax
// @updateURL https://github.com/cyrmax/vk-teams-a11y-improvements/releases/latest/download/vkteamsopt.user.js
// @downloadURL https://github.com/cyrmax/vk-teams-a11y-improvements/releases/latest/download/vkteamsopt.user.js
// @match        https://myteam.mail.ru/webim*
// @run-at document-start
// @grant unsafeWindow
// ==/UserScript==

// Entry point. Create observer wich reacts to mutations and applies accessibility optimizations.
(function () {
    const OBSERVER_CONFIG = { subtree: true, childList: true };
    const callback = function (_, _) {
        // Run all opt functions
        optUnread();
        optThreadsHeaders();
        optMessagesList();
        optChatList();
    };
    const observer = new MutationObserver(callback);
    observer.observe(document.body, OBSERVER_CONFIG);
    /* Half-finished better code which should work faster
    const callback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        // Apply different accessibility fixes depending on the element attributes.
                        // Code from optUnread function
                        if (node.tagName == "span" && (node.text.includes("New messages") || node.text.includes("Новые сообщения"))) {
                            node.setAttribute("role", "heading");
                        }
                        // Code from optThreadHeaders
                        if (node.tagName == "div" && node.classList.contains("im-thread-flow__header")) {
                            node.setAttribute("role", "heading");
                        }
                    }
                });
            }
        }
    }
    */
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
        elem.setAttribute("tabindex", "0");
    }
    for (const elem of document.querySelectorAll("div.im-messages__date")) {
        elem.setAttribute("role", "heading");
    }
}
