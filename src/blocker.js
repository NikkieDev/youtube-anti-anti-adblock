const __data = { popupsRemoved: 0 };

function setup() {
	chrome.storage.sync.get(["popupsRemoved"], (result) => {
		if (result.popupsRemoved !== undefined) {
			__data.popupsRemoved = result.popupsRemoved;
			document.querySelector("span#popupsRemoved__value").innerHTML = result
		} else console.warn("undefined lmao")
	})
}

function checkForPopup() {
	const myDrillah = document.querySelector("tp-yt-iron-overlay-backdrop.opened");
  	const myDrillahTwo = document.querySelector(
    	"ytd-popup-container.style-scope.ytd-app",
  	);

	if (myDrillah != null && myDrillahTwo != null) {
		myDrillah
			.querySelector("tp-yt-paper-dialog")
			.classList.remove("opened");

		myDrillahTwo.style.display = "none";
		console.info("Removed popup!");
		__data.popupsRemoved++;
		chrome.storage.sync.set({ popupsRemoved: __data.popupsRemoved });
		document.querySelector("div#popupsRemoved__value>span").innerHTML = __data.popupsRemoved;
	}
}(function () {
	"use strict";
	setup();
	checkForPopup();
	setInterval(checkForPopup, 2000);
})();