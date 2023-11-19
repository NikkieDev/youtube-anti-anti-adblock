class Listeners {

    static set() { // optimize later into sending update message to service worker which will 
        // buffer from message and send to runtime
        // on buffer message send, check in lastPushed buffer if any different than new buffer. If difference -> update. Else, decline update.
        const dataStoreOption = document.querySelector("#dataStoreOption__value");
        const popupOption = document.querySelector("#popupsPauseOption__value");
        const mealbarOption = document.querySelector("#mealbarsPauseOption__value");
        const autoplayOption = document.querySelector("#autoplayOption__value");

        dataStoreOption.addEventListener("click", async function() {
            await chrome.storage.sync.set({ dataStoreOption: dataStoreOption.checked });
            console.log(`[YAH] Extension datastore set to ${dataStoreOption.checked}`);
            await chrome.storage.sync.get(["dataStoreOption"], result => {
                console.log("new value: ", result);
            })
        });
    
        popupOption.addEventListener("click", async function() {
            await chrome.storage.sync.set({ popupsPauseOption: popupOption.checked });
            console.log(`[YAH] popups pause option set to ${popupOption.checked}`);
        });
    
        mealbarOption.addEventListener("click", async function() {
            await chrome.storage.sync.set({ mealbarsPauseOption: mealbarOption.checked });
            console.log(`[YAH] popups pause option set to ${mealbarOption.checked}`);
        });

        autoplayOption.addEventListener('click', async function() {
            await chrome.storage.sync.set({ autoplayOption: autoplayOption.checked });
            console.log(`[YAH] autoplay set to ${autoplayOption.checked}`);
        });
    }
}

Listeners.set(false, true, true, true);