const __data = { popupsRemoved: 0, checkVideoDone: null, mealbarsRemoved: 0 };

class Main {
    static async setup() {
        await chrome.storage.sync.get(["popupsRemoved", "popupsPauseOption", "popupsTrackOption", "autoplayOption", "removeMealbars"], (result) => {
            let buffer = {  }
            if (result.popupsRemoved !== undefined) {
                __data.popupsRemoved = result.popupsRemoved;
            } else chrome.storage.sync.set({ popupsRemoved: __data.popupsRemoved });
    
            if (result.popupsPauseOption == undefined)
                buffer.popupsPauseOption = false;
            if (result.popupsTrackOption == undefined)
                buffer.popupsTrackOption = true;
            if (result.autoplayOption == undefined)
                buffer.autoplayOption = true;
            if (result.removeMealbars == undefined)
                buffer.removeMealbars = true;
            
        });
        
        
        setInterval(checkForPopup, 2000);
        __data.checkVideoDone = setInterval(checkIfVideoDone, 5000);
    }
}

Main.setup();