
let youtubeStreamsButton = document.getElementById('yts');
let githubReposButton = document.getElementById('ghr');
let stockPhotosButton = document.getElementById('sph');
let codeSnippetsButton = document.getElementById('cs');



//Set up the button clicks to load the specific
youtubeStreamsButton.onclick = function () {
    ClearPage();
    //Load youtube link
};

githubReposButton.onclick = function () {
    ClearPage();
    //Github
};

stockPhotosButton.onclick = function () {
    ClearPage();
    LoadPhotos();
    //Load stockImages
};

codeSnippetsButton.onclick = function () {
    ClearPage();
    //Load code snippets

};

//MODALS -->
//MODALS -->
//MODALS -->


let addStockPhotoModal = document.getElementById('addStockPhotoModal');
let ASPMclose = document.getElementsByClassName("ASPMclose")[0];
// When the user clicks on <span> (x), close the modal
ASPMclose.onclick = function() {
    addStockPhotoModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == addStockPhotoModal) {
        addStockPhotoModal.style.display = "none";
    }
}
