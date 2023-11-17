class Listeners {
    setTrackerOptions = null;
    setPausedOptions = null;
    setAutoplayOption = null;

    Listeners(trackerOptions, pausedOptions, autoplayOption) {
        this.setTrackerOptions = trackerOptions;
        this.setPausedOptions = pausedOptions;
        this.setAutoplayOption = autoplayOption;
    }

    static set() {
        const trackerOptions = document.querySelector("#dataStore__value");
        const pausedOptions = document.querySelector("#popupsPauseOption__value");
        const autoplayOption = document.querySelector("#autoplayOption__value");

        this.setTrackerOptions ? trackerOptions.addEventListener("click", function() {
            chrome.storage.sync.set({ popupsTrackOption: trackerOptions.checked });
            console.log(`[YAH] popups blocked tracking set to ${trackerOptions.checked}`);
        }) : null;
    
        this.setPausedOptions ? pausedOptions.addEventListener("click", function() {
            chrome.storage.sync.set({ popupsPauseOption: pausedOptions.checked });
            console.log(`[YAH] popups pause option set to ${pausedOptions.checked}`);
        }) : null;
    
        this.setAutoplayOption ? autoplayOption.addEventListener('click', function() {
            chrome.storage.sync.set({ autoplayOption: autoplayOption.checked });
            console.log(`[YAH] autoplay set to ${autoplayOption.checked}`);
        }) : null;
    }
}

if (document.querySelector("#wrapper").getAttribute("location") === "main")
    Listeners.set(false, true, true);