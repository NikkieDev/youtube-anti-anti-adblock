function playNextVideo() {
	console.log("[YAH] Autoplay is on", 
		`[YAH] Selecting next video`);

	const drillahs = document.querySelectorAll("a#thumbnail.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail");
	setTimeout(function() {
		location.href = drillahs[6].href;
	}, 2000)
}

async function checkIfVideoDone() {
	if (location.pathname == "/watch") {
		const myDrillah = document.querySelector("div.ytp-progress-bar");

		if (~~myDrillah.getAttribute("aria-valuenow") == ~~myDrillah.getAttribute("aria-valuemax")) {
			const autoplay = await chrome.storage.sync.get(["autoplayOption"]);

			if (autoplay.autoplayOption == true)
				playNextVideo();
			else
				console.log(`[YAH] autoplay is disabled.`);
		}
	}
}

function setPlay(elem) {
	elem.click();
}