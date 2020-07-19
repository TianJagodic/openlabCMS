
function ClearPage() {
    var allElements = document.getElementById("content");
    while (allElements.hasChildNodes()) {
        allElements.removeChild(allElements.firstChild);
    }
}


//Destroy all children
function DestroyAllChildren(id) {
    var allElements = document.getElementById(id);
    while (allElements.hasChildNodes()) {
        allElements.removeChild(allElements.firstChild);
    }
}
