function handleAlive({id, found}) {
    document.querySelector("#live").textContent = found;
}

function onMessage(message) {
	handleAlive(message);
}

browser.runtime.onMessage.addListener(onMessage);
browser.runtime.sendMessage({type: "find_dead"});

