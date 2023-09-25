// ==UserScript==
// @name         VKTeamsOpt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Applies few accessibility optimizations to Vk Teams interface.
// @author       Cyrmax
// @updateURL https://cyrmax.github.io/vkteamsopt
// @downloadURL https://cyrmax.github.io/vkteamsopt
// @match        https://myteam.mail.ru/webim*
// @run-at document-start
// @grant unsafeWindow
// ==/UserScript==

// Entry point, set timer which runs the main function periodically.
(function () {
    unsafeWindow.setInterval(function () {
        let element = document.querySelector('[role="tab"][tabindex="-1"]');
        if (element != null) {
            element.removeAttribute("role");
        }
    }, 1000)
})();


function optUnread() {
    let elems = document.evaluate('//span[text()="Новые сообщения"]', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
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
    for (const elem of document.querySelectorAll("div.im-recent-wrapper")) {
        elem.setAttribute("role", "region");
        let label = "Chat ";
        if (elem.querySelector("div.im-msg-counter")) {
            label += "Unread ";
        }
        elem.setAttribute("aria-label", label);
    }
}