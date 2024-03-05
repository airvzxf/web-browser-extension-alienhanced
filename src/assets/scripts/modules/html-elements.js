function removeElementById(elementId) {
    if (document.contains(document.getElementById(elementId))) {
        document.getElementById(elementId).remove();
    }
}

export {removeElementById}
