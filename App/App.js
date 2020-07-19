let Content = document.getElementById('content');




function ClearPage() {
    let allElements = document.getElementById("content");
    while (allElements.hasChildNodes()) {
        allElements.removeChild(allElements.firstChild);
    }
}


//Destroy all children
function DestroyAllChildren(id) {
    let allElements = document.getElementById(id);
    while (allElements.hasChildNodes()) {
        allElements.removeChild(allElements.firstChild);
    }
}
