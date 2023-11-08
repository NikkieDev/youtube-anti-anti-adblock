function update() {
    chrome.storage.sync.get(["popupsRemoved"], function(result){
        if (result.popupsRemoved == undefined){
            chrome.storage.sync.set({ popupsRemoved: 0 });
            document.querySelector("span#popupsRemoved__value").innerHTML = 0;
        } else document.querySelector("span#popupsRemoved__value").innerHTML = result.popupsRemoved;

        console.log(`[AAP] popups removed amount set to ${result.popups}`);
    });

    chrome.storage.sync.get(["popupsTrackOption"], function(result) {
        if (result.popupsTrackOption == undefined) {
            chrome.storage.sync.set({ popupsTrackOption: true });
            document.querySelector("#popupsTrackOption__value").checked = true;
        } else document.querySelector("#popupsTrackOption__value").checked = result.popupsTrackOption;

        console.log(`[AAP] popups blocked tracking set to ${result.popupsTrackOption}`);
    });

    chrome.storage.sync.get(["popupsPauseOption"], function(result) {
        if (result.popupsPauseOption == undefined) {
            chrome.storage.sync.set({ popupsPauseOption: false });
            document.querySelector("#popupsPauseOption__value").checked = false;
        } else document.querySelector("#popupsPauseOption__value").checked = result.popupsPauseOption;

        console.log(`[AAP] popups pause option set to ${result.popupsPauseOption}`);
    })
}

function setListeners() {
    const trackerOptions = document.querySelector("#popupsTrackOption__value");
    const pausedOptions = document.querySelector("#popupsPauseOption__value");

    trackerOptions.addEventListener("click", function() {
        chrome.storage.sync.set({ popupsTrackOption: trackerOptions.checked });
        console.log(`[AAP] popups blocked tracking set to ${trackerOptions.checked}`);
    });

    pausedOptions.addEventListener("click", function() {
        chrome.storage.sync.set({ popupsPauseOption: pausedOptions.checked });
        console.log(`[AAP] popups pause option set to ${pausedOptions.checked}`);
    });
}

(function() {
    'use strict';
    update();
    setListeners();
})();