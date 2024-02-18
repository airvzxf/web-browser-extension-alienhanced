document.querySelector("#inspect").addEventListener("click", () => {
    browser.devtools.inspectedWindow.eval(
        `inspect(document.querySelector('img'))`
    );
});

document.querySelector("#tag_name").addEventListener("click",
    () => {
        browser.devtools.inspectedWindow.eval(
            `$0?.tagName`,
            null,
            (result) => {
                const div = document.createElement("div");
                div.innerText = result;
                document.body.appendChild(div);
            });
    }
);