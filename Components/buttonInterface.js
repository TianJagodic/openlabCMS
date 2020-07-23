
let youtubeStreamsButton = document.getElementById('yts');
let githubReposButton = document.getElementById('ghr');
let stockPhotosButton = document.getElementById('sph');
let codeSnippetsButton = document.getElementById('cs');


let usersButton = document.getElementById('usr');



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

usersButton.onclick = function(){

}

//MODALS -->
//MODALS -->
//MODALS -->

//ADD STOCK PHOTO
//ADD STOCK PHOTO
//ADD STOCK PHOTO
let addStockPhotoModal = document.getElementById('addStockPhotoModal');
let ASPMclose = document.getElementsByClassName("ASPMclose")[0];
// When the user clicks on <span> (x), close the modal
ASPMclose.onclick = function() {
    addStockPhotoModal.style.display = "none";
}

//EDIT STOCK PHOTO
//EDIT STOCK PHOTO
//EDIT STOCK PHOTO
let editStockPhotoModal = document.getElementById('editStockPhotoModal');
let ESPMclose = document.getElementsByClassName("ESPMclose")[0];
// When the user clicks on <span> (x), close the modal
ESPMclose.onclick = function() {
    editStockPhotoModal.style.display = "none";
}
document.getElementById('dontSaveSP').onclick = () =>{
    editStockPhotoModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == editStockPhotoModal) {
        editStockPhotoModal.style.display = "none";
    }

    if (event.target == editStockPhotoModal) {
        editStockPhotoModal.style.display = "none";
    }
}
