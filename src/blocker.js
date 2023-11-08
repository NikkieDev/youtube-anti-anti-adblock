const __data = { popupsRemoved: 0 };

async function setup() {
	await chrome.storage.sync.get(["popupsRemoved"], (result) => {
		if (result.popupsRemoved !== undefined) {
			__data.popupsRemoved = result.popupsRemoved;
		} else chrome.storage.sync.set({ popupsRemoved: __data.popupsRemoved });
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
}(async function () {
	"use strict";
	await setup();
	await checkForPopup();
	setInterval(await checkForPopup, 2000);
})();