async function update() {
    // const data = await fetch(chrome.runtime.getURL("ui/json/userdata.json"), { method: "GET" });
    // console.log(data);
    let data;
    await fetch(chrome.runtime.getURL("ui/json/userdata.json"))
    .then(r => r.json()).then(r => data = r.required);

    const cloudStorage = await new Promise(resolve => {
        chrome.storage.sync.get(data, resolve);
    });
    
    for (const cloudItem of data) {
        const value = cloudStorage[cloudItem];
        console.log(value);
        console.log(cloudStorage);
    }

    // chrome.storage.sync.get(["popupsRemoved"], function(result){
    //     document.querySelector("span#popupsRemoved__value").innerHTML = result.popupsRemoved ?? 0;
    //     console.log(`[AAP] popups removed amount set to ${result.popups}`);
    // });

    // chrome.storage.sync.get(["popupsTrackOption"], function(result) {
    //     document.querySelector("#popupsTrackOption__value").checked = result.popupsTrackOption ?? true;
    //     console.log(`[AAP] popups blocked tracking set to ${result.popupsTrackOption}`);
    // });

    // chrome.storage.sync.get(["popupsPauseOption"], function(result) {
    //     document.querySelector("#popupsPauseOption__value").checked = result.popupsPauseOption ?? false;
    //     console.log(`[AAP] popups pause option set to ${result.popupsPauseOption}`);
    // })

    // chrome.storage.sync.get(["autoplayOption"], function(result) {
    //     document.querySelector("#autoplayOption__value").checked = result.autoplayOption ?? true;
    //     console.log(`[AAP] autoplay set to ${result.autoplayOption}`);
    // });
}