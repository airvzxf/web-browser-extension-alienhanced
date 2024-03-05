console.debug("Background: background.js");

browser.runtime.onInstalled.addListener(() => {
    console.debug("Background: browser.runtime.onInstalled");
});
