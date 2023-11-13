const __data = { popupsRemoved: 0, checkVideoDone: null };
const video = require('./video');

export async function checkForPopup() {
	const myDrillah = document.querySelector("tp-yt-iron-overlay-backdrop.opened");
	const myDrillahTwo = document.querySelector("ytd-enforcement-message-view-model");
	const myDrillahThree = document.querySelector("button.ytp-play-button");

	if (myDrillah != null && myDrillahTwo != null) {
		await chrome.storage.sync.get(["popupsPauseOption", "popupsTrackOption"], function(result) {
			if (result.popupsPauseOption == false) {
				myDrillah.classList.remove("opened");
				myDrillahTwo.parentElement.remove();
				video.setPlay(myDrillahThree);

				if (result.popupsTrackOption == true) {
					__data.popupsRemoved++;
					chrome.storage.sync.set({ popupsRemoved: __data.popupsRemoved });
				}
				
				console.info("Removed popup!");
			}
		})
	}
}