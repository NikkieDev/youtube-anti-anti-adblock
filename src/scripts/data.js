async function update() {
    console.log("Updating")
    await fetch(chrome.runtime.getURL("data/sync-storage.json"))
    .then(response => response.json()).then(async response => {
        console.log(response);
        // await chrome.storage.sync.get(Object.keys(response.required), function(result) {
        //     console.log(result);
        // })
    });
    // chrome.storage.sync.get(["popupsRemoved"], function(result){
    //     document.querySelector("span#popupsRemoved__value").innerHTML = result.popupsRemoved ?? 0;
    //     console.log(`[YAH] popups removed amount set to ${result.popups}`);
    // });

    // chrome.storage.sync.get(["dataStore"], function(result) {
    //     document.querySelector("#dataStore__value").checked = result.popupsTrackOption ?? true;
    //     console.log(`[YAH] datastore permission set to ${result.popupsTrackOption}`);
    // });

    // chrome.storage.sync.get(["popupsPauseOption"], function(result) {
    //     document.querySelector("#popupsPauseOption__value").checked = result.popupsPauseOption ?? false;
    //     console.log(`[YAH] popups pause option set to ${result.popupsPauseOption}`);
    // })

    // chrome.storage.sync.get(["autoplayOption"], function(result) {
    //     document.querySelector("#autoplayOption__value").checked = result.autoplayOption ?? true;
    //     console.log(`[YAH] autoplay set to ${result.autoplayOption}`);
    // });
}