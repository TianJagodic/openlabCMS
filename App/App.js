


let Content = document.getElementById('content');

firebase.auth().onAuthStateChanged(async user => {
    if (user) {
        console.log('user logged in');

    } else {
        console.log('user logged out');
        window.location.href = "../Login/Login.html";
    }
});

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
