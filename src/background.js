if (typeof browser == "undefined") {
    // Chrome does not support the browser namespace yet.
    globalThis.browser = chrome;
}

browser.runtime.onInstalled.addListener(() => {
    // browser.tabs.create({ url: "https://rovisoft.net" });
    console.log("Background: browser.runtime.onInstalled")
});