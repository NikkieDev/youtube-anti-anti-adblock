function set() {
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