const __data = { popupsRemoved: 0 };

async function setup() {
	await chrome.storage.sync.get(["popupsRemoved", "popupsPauseOption", "popupsTrackOption", "autoPlayOption"], (result) => {
		if (result.popupsRemoved !== undefined) {
			__data.popupsRemoved = result.popupsRemoved;
		} else chrome.storage.sync.set({ popupsRemoved: __data.popupsRemoved });

		if (result.popupsPauseOption == undefined)
			chrome.storage.sync.set({ popupsPauseOption: false });
		if (result.popupsTrackOption == undefined)
			chrome.storage.sync.set({ popupsTrackOption: true });
		if (result.autoPlayOption == undefined)
			chrome.storage.sync.set({ autoPlayOption: true });
	})
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
	console.log(`[AAP] Selecting next video`);
	const drillahs = document.querySelectorAll("a#thumbnail.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail");
	setTimeout(function() {
		location.href = drillahs[6].href;
	}, 2000)
}

async function autoPlayIsOn() {
	await chrome.storage.sync.get(['autoPlayOption'], function(result) {

	});
}

function checkIfVideoDone() {
	if (location.pathname == "/watch") {
		const myDrillah = document.querySelector("div.ytp-progress-bar");
		autoPlayIsOn().then((r) => {
			if (r == true && ~~myDrillah.getAttribute('aria-valuenow') == ~~myDrillah.getAttribute('aria-valuemax'))
				playNextVideo();
		}).catch(e => console.error(e));
	}
}

(async function () {
	"use strict";
	await setup();
	await checkForPopup();
	setInterval(await checkForPopup, 2000);
	setInterval(checkIfVideoDone, 5000);		
})();