function update() {
    chrome.storage.sync.get(["popupsRemoved"], function(result){
        document.querySelector("span#popupsRemoved__value").innerHTML = result.popupsRemoved ?? 0;
        console.log(`[AAP] popups removed amount set to ${result.popups}`);
    });

    chrome.storage.sync.get(["popupsTrackOption"], function(result) {
        document.querySelector("#popupsTrackOption__value").checked = result.popupsTrackOption ?? true;
        console.log(`[AAP] popups blocked tracking set to ${result.popupsTrackOption}`);
    });

    chrome.storage.sync.get(["popupsPauseOption"], function(result) {
        document.querySelector("#popupsPauseOption__value").checked = result.popupsPauseOption ?? false;
        console.log(`[AAP] popups pause option set to ${result.popupsPauseOption}`);
    })

    chrome.storage.sync.get(["autoplayOption"], function(result) {
        document.querySelector("#autoplayOption__value").checked = result.autoplayOption ?? true;
        console.log(`[AAP] autoplay set to ${result.autoplayOption}`);
    });
}

function setListeners() {
    const trackerOptions = document.querySelector("#popupsTrackOption__value");
    const pausedOptions = document.querySelector("#popupsPauseOption__value");
    const autoplayOption = document.querySelector("#autoplayOption__value");

    trackerOptions.addEventListener("click", function() {
        chrome.storage.sync.set({ popupsTrackOption: trackerOptions.checked });
        console.log(`[AAP] popups blocked tracking set to ${trackerOptions.checked}`);
    });

    pausedOptions.addEventListener("click", function() {
        chrome.storage.sync.set({ popupsPauseOption: pausedOptions.checked });
        console.log(`[AAP] popups pause option set to ${pausedOptions.checked}`);
    });

    autoplayOption.addEventListener('click', function() {
        chrome.storage.sync.set({ autoplayOption: autoplayOption.checked });
        console.log(`[AAP] autoplay set to ${autoplayOption.checked}`);
    });
}

(async function() {
    'use strict';
    // await setup();
    update();
    setListeners();
})();