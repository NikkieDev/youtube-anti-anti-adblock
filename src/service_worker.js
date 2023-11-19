const setupBasicData = new Promise(async (resolve, reject) => {
    try {
        await fetch(chrome.runtime.getURL("data/sync-storage.json"))
        .then(response => response.json()).then(async response => await chrome.storage.sync.set(response.onInstall))
        .catch(e => { throw new Error(e) });

        resolve(true);
    } catch (e) {
        reject(e);
    }
})


const setup = { dataSuccess: null, };

chrome.runtime.onInstalled.addListener(async function(event) {
    if (event.reason == "install") {
        setupBasicData.then(c => {
            console.log(`data setup: ${c}`);
            setup.dataSuccess = true;
        }).catch(e => {
            console.log(e);
            setup.dataSuccess = false;
        });
    } 
});