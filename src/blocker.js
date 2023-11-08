const __data = { popupsRemoved: 0 };

function setup() {
	chrome.storage.sync.get(["popupsRemoved"], (result) => {
		if (result.popupsRemoved !== undefined) {
			__data.popupsRemoved = result.popupsRemoved;
		} else chrome.storage.sync.set({ popupsRemoved: __data.popupsRemoved });
	})
}

function setPlay(elem) {
	elem.click();
}

function checkForPopup() {
	const myDrillah = document.querySelector("tp-yt-iron-overlay-backdrop.opened");
  	const myDrillahTwo = document.querySelector("ytd-popup-container.style-scope.ytd-app");
	const myDrillahThree = document.querySelector("button.ytp-play-button");

	if (myDrillah != null && myDrillahTwo != null) {
		myDrillah.classList.remove("opened");
		myDrillahTwo.style.display = "none";
		setPlay(myDrillahThree);

		__data.popupsRemoved++;
		chrome.storage.sync.set({ popupsRemoved: __data.popupsRemoved });
		
		console.info("Removed popup!");
	}
}(function () {
	"use strict";
	setup();
	checkForPopup();
	setInterval(checkForPopup, 2000);
})();