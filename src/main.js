const __data = { popupsRemoved: 0, checkVideoDone: null };
const blocker = require('./scripts/blocker');
const video = require('./scripts/video');

class Main {
    constructor() { };

    static async setup() {
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
}

(async function() {
    'use strict';

    await Main.setup();
    setInterval(blocker.checkForPopup, 2000);
    __data.checkVideoDone = setInterval(video.checkIfVideoDone, 5000);
})()