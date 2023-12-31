async function checkForPopup() {
	const drillahList = [
		document.querySelector("tp-yt-iron-overlay-backdrop.opened"),
		document.querySelector("ytd-enforcement-message-view-model"),
		document.querySelector("button.ytp-play-button")
	];

	if (drillahList[0] != null && drillahList[1] != null) {
		await chrome.storage.sync.get(["popupsPauseOption", "dataStoreOption"], function(result) {
			if (result.popupsPauseOption == false) {
				drillahList[0].classList.remove("opened");
				drillahList[1].parentElement.remove();
				setPlay(drillahList[2]);

				if (result.dataStoreOption == true) {
					__data.popupsRemoved++;
					chrome.storage.sync.set({ popupsRemoved: __data.popupsRemoved });
				}
				
				console.info("[YAH] Removed popup!");
			}
		})
	}
}

async function checkForMealbar() {
	// <yt-mealbar-promo-renderer no-button-line="" dialog="true" class="style-scope ytd-popup-container" tabindex="-1" has-full-height-image="">	
	const myDrillah = document.querySelector("yt-mealbar-promo-renderer.style-scope.ytd-popup-container");
	let daddyDrillah = myDrillah.parentElement;

	await chrome.storage.sync.get(["removeMealbars","dataStoreOption"], result => {
		if (daddyDrillah !== null && result.removeMealbars == true)
			daddyDrillah.remove();

			if (result.dataStoreOption) {
				__data.mealbarsRemoved++;
				chrome.storage.sync.set({ mealbarsRemoved: __data.mealbarsRemoved });
			}

			console.log("[YAH] Removed mealbar");
	})
}