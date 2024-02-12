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
    console.log(`Options page opened`);
}

function onError(error) {
    console.log(`Error: ${error}`);
}

document.querySelector("#opts").addEventListener(
    "click",
    () => {
        //browser.runtime.openOptionsPage()
        console.log("Click on options button in the PopUp.")
        let opening = browser.runtime.openOptionsPage();
        console.log(opening)
        opening.then(onOpened, onError);
    }
);