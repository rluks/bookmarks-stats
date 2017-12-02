/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function handleDead({bookmark, error}) {
	console.log("DEAD");
}

function handleAlive({id, found}) {
    document.querySelector("#live").textContent = found;
}

function onMessage(message) {
    if (message.type === "dead") {
        handleDead(message);
    } else if (message.type === "alive") {
        handleAlive(message);
    }
}

browser.runtime.onMessage.addListener(onMessage);
browser.runtime.sendMessage({type: "find_dead"});

