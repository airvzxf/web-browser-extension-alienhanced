console.debug("Dev Tools Page: main.js");

browser.devtools.panels.create(
    "Devtools Traffic",
    "",
    "traffic_panel.html"
).then(r => {
    console.debug("Finished browser.devtools.panels.create().");
    console.debug(r);
});

browser.devtools.panels.elements.createSidebarPane(
    "Devtools Inspector",
    (sidebar) => {
        sidebar.setPage("inspect_panel.html");
    }
);