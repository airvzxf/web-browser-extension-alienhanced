console.debug("Hello from the devtools panel!");

function logRequest(har) {
    document.body.innerHTML += `
  <div>
    ${har.request.method}: ${har.request.url} (${har.response.status})
  </div>`;
}

// One-time call to acquire all the requests accumulated
// so far. This allows you to navigate between
// devtools panels without losing the traffic log.
browser.devtools.network.getHAR((harLog) => {
    console.debug("Traffic Panel JS: browser.devtools.network.getHAR()");
    for (let har in harLog.entries) {
        console.debug(har);
        logRequest(har);
    }
});

// Fires each time the top-level webpage changes URL
browser.devtools.network.onNavigated.addListener((url) => {
    console.debug("Traffic Panel JS: browser.devtools.network.onNavigated.addListener()");
    document.body.innerHTML += `<hr><h2>${url}</h2><hr>`;
});

// Fired each time anything in the webpage
// makes a network request
browser.devtools.network.onRequestFinished.addListener((har) => {
    console.debug("Traffic Panel JS: browser.devtools.network.onRequestFinished.addListener()");
    console.debug(har);
    logRequest(har);
});

document.querySelector("#check").addEventListener("click", () => {
    browser.devtools.inspectedWindow.eval(
        `(() => {
     const url = window.location.href;
     const usesJquery = !!window.jQuery;
     return { url, usesJquery };
   })()`,
        null,
        (result) => {
            const div = document.createElement("div");
            div.innerText = `${result.url} uses jQuery: ${result.usesJquery}`;
            document.body.appendChild(div);
        }
    );
});