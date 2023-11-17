async function checkForPopup() {
	const myDrillah = document.querySelector("tp-yt-iron-overlay-backdrop.opened");
	const myDrillahTwo = document.querySelector("ytd-enforcement-message-view-model");
	const myDrillahThree = document.querySelector("button.ytp-play-button");

	if (myDrillah != null && myDrillahTwo != null) {
		await chrome.storage.sync.get(["popupsPauseOption", "dataStore"], function(result) {
			if (result.popupsPauseOption == false) {
				myDrillah.classList.remove("opened");
				myDrillahTwo.parentElement.remove();
				setPlay(myDrillahThree);

				if (result.dataStore == true) {
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

	await chrome.storage.sync.get(["removeMealbars","dataStore"], result => {
		if (daddyDrillah !== null && result.removeMealbars == true)
			daddyDrillah.remove();

			if (result.dataSture) {
				__data.mealbarsRemoved++;
				chrome.storage.sync.set({ mealbarsRemoved: __data.mealbarsRemoved });
			}

			console.log("[YAH] Removed mealbar");
	})
}