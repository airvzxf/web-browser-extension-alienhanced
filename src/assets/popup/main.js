console.debug("Pop up: main.js");

// let title = browser.i18n.getMessage("extensionActionTitle");
// let h1Element = document.querySelector("h1");
// h1Element.innerHTML = title;

document.querySelector("#url").innerHTML = `
<pre>Page URL: ${window.location.href}</pre>
`;

document.querySelector("#xid").innerHTML = `
<pre>Extension ID: ${browser.runtime.id}</pre>
`;

function onOpened() {
    console.debug(`Options page opened`);
}

function onError(error) {
    console.debug(`Error: ${error}`);
}

document.querySelector("#opts").addEventListener(
    "click",
    () => {
        //browser.runtime.openOptionsPage()
        console.debug("Click on options button in the PopUp.")
        let opening = browser.runtime.openOptionsPage();
        console.debug(opening)
        opening.then(onOpened, onError);
    }
);