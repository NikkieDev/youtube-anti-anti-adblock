async function update() {
    console.log(`[YAH] set data for dataview`);
    
    await fetch(chrome.runtime.getURL("data/sync-storage.json"))
    .then(response => response.json()).then(async response => {
        let optionList = [];

        response.required.forEach(item => { if (item.endsWith("Data")) optionList.push(item); });
        await chrome.storage.sync.get(optionList, result => optionList.forEach(newItem => document.querySelector(`#${newItem}__value`).innerHTML = result[newItem]));
    })
}

(async () => {
    await update();
})();