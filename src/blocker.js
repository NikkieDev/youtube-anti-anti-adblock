const __data = { popupsRemoved: 0, checkVideoDone: null };

async function setup() {
	await chrome.storage.sync.get(["popupsRemoved", "popupsPauseOption", "popupsTrackOption", "autoplayOption"], (result) => {
		if (result.popupsRemoved !== undefined) {
			__data.popupsRemoved = result.popupsRemoved;
		} else chrome.storage.sync.set({ popupsRemoved: __data.popupsRemoved });

		if (result.popupsPauseOption == undefined)
			chrome.storage.sync.set({ popupsPauseOption: false });
		if (result.popupsTrackOption == undefined)
			chrome.storage.sync.set({ popupsTrackOption: true });
		if (result.autoplayOption == undefined)
			chrome.storage.sync.set({ autoplayOption: true });
	});
}

function setPlay(elem) {
	elem.click();
}

async function checkForPopup() {
	const myDrillah = document.querySelector("tp-yt-iron-overlay-backdrop.opened");
	const myDrillahTwo = document.querySelector("ytd-enforcement-message-view-model");
	const myDrillahThree = document.querySelector("button.ytp-play-button");

	if (myDrillah != null && myDrillahTwo != null) {
		await chrome.storage.sync.get(["popupsPauseOption", "popupsTrackOption"], function(result) {
			if (result.popupsPauseOption == false) {
				myDrillah.classList.remove("opened");
				myDrillahTwo.parentElement.remove();
				setPlay(myDrillahThree);

				if (result.popupsTrackOption == true) {
					__data.popupsRemoved++;
					chrome.storage.sync.set({ popupsRemoved: __data.popupsRemoved });
				}
				
				console.info("Removed popup!");
			}
		})
	}
}

function playNextVideo() {
	console.log("[AAP] Autoplay is on", 
		`[AAP] Selecting next video`);

	const drillahs = document.querySelectorAll("a#thumbnail.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail");
	setTimeout(function() {
		location.href = drillahs[6].href;
	}, 2000)
}

async function checkIfVideoDone() {
	if (location.pathname == "/watch") {
		const myDaddyDrillah = document.querySelector("div.ad-created.ad-showing.ad-interrupting");
		
		if (myDaddyDrillah == null) {
			const myDrillah = document.querySelector("div.ytp-progress-bar");

			if (~~myDrillah.getAttribute("aria-valuenow") == ~~myDrillah.getAttribute("aria-valuemax")) {
				const autoplay = await chrome.storage.sync.get(["autoplayOption"]);

				if (autoplay.autoplayOption == true)
					playNextVideo();
				else
					console.log(`[AAP] autoplay is disabled.`);
			}
		} else console.log(`[AAP] playing ad, ignoring autoplay`);
	}
}

(async function() {
	"use strict";
	await setup();
	setInterval(await checkForPopup, 2000);
	__data.checkVideoDone = setInterval(checkIfVideoDone, 5000);
})();
