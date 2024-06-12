
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') { //&& tab.url.contains('www.google.com')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['./scripts/inject_element.js']
        });
    }
});


function createContextMenu() {
    chrome.contextMenus.create({
        id: "plus",
        title: "+",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        id: "minus",
        title: "-",
        contexts: ["all"]
    });
}

chrome.runtime.onInstalled.addListener(() => {
    createContextMenu();
    chrome.storage.local.set({ number: 1 }, () => {
        console.log("number 1 set ");
    });

    chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId === "plus") {
            chrome.storage.local.get('number', (data) => {
                chrome.storage.local.set({ number: data.number + 1 }, () => {
                    console.log("number incremented");
                });

                chrome.storage.local.get('number', (data) => {
                    console.log(data.number);
                });
            });
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => {
                    alert('Plus (+) clicked!');
                }
            });
        } else if (info.menuItemId === "minus") {
            chrome.storage.local.get('number', (data) => {
                chrome.storage.local.set({ number: data.number - 1 }, () => {
                    console.log("number decremented");
                });
                chrome.storage.local.get('number', (data) => {
                    console.log(data.number);
                });
            });
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => {
                    alert('Minus (-) clicked!');
                }
            });
        }
    });
})



