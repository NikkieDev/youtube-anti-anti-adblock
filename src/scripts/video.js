function playNextVideo() {
	console.log("[AAP] Autoplay is on", `[AAP] Selecting next video`);

	const drillahs = document.querySelectorAll("a#thumbnail.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail");
	setTimeout(() => location.href = drillahs[6].href, 2000);
}

export async function checkIfVideoDone() {
	if (location.pathname == "/watch") {
		const myDrillah = document.querySelector("div.ytp-progress-bar");

		if (~~myDrillah.getAttribute("aria-valuenow") == ~~myDrillah.getAttribute("aria-valuemax")) {
			const autoplay = await chrome.storage.sync.get(["autoplayOption"]);

			(autoplay.autoplayOption) ? playNextVideo() : console.log("[AAP] autoplay is disabled");
		}
	}
}

export function setPlay(elem) {
	elem.click();
}