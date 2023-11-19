const __data = { popupsRemoved: 0, checkVideoDone: null, mealbarsRemoved: 0 };

class Main {
    static async setup() {
        setInterval(checkForPopup, 2000);
        __data.checkVideoDone = setInterval(await checkIfVideoDone, 5000);
    }
}

Main.setup();