function update() {
    chrome.storage.sync.get(["popupsRemoved"], function(result){
        if (result.popupsRemoved == undefined){
            chrome.storage.sync.set({ popupsRemoved: 0 });
            update();
        }

        document.querySelector("span#popupsRemoved__value").innerHTML = result.popupsRemoved;
        console.log(result.popupsRemoved, "has been set");
    });
}

update();