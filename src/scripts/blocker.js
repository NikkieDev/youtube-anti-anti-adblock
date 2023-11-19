const __data = { popupsRemoved: 0, checkVideoDone: null };
const { setPlay } = import('./video');

export async function checkForPopup() {
	const drillahList = [
		document.querySelector("tp-yt-iron-overlay-backdrop.opened"),
		document.querySelector("ytd-enforcement-message-view-model"),
		document.querySelector("button.ytp-play-button")
	];

	const drillahRequirements = ["popupsPauseOption", "popupsTrackOption"];

	if (drillahList[0] != null && drillahList[1] != null) {
		await chrome.storage.sync.get(drillahRequirements, function(result) {
			if (result.popupsPauseOption == false) {
				drillahList[0].classList.remove("opened");
				drillahList[1].parentElement.remove();
				setPlay(drillahList[2]);

				if (result.popupsTrackOption == true) {
					__data.popupsRemoved++;
					chrome.storage.sync.set({ popupsRemoved: __data.popupsRemoved });
				}
				
				console.info("Removed popup!");
			}
		})
	}
}