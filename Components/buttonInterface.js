
let youtubeStreamsButton = document.getElementById('yts');
let githubReposButton = document.getElementById('ghr');
let stockPhotosButton = document.getElementById('sph');
let codeSnippetsButton = document.getElementById('cs');
let speakersButton = document.getElementById('sp');


let usersButton = document.getElementById('usr');



//Set up the button clicks to load the specific
youtubeStreamsButton.onclick = function () {
    ClearPage();
    //Load youtube link
    LoadYoutubeStreams();
};

githubReposButton.onclick = function () {
    ClearPage();
    //Github
    LoadGithubRepos();
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
    ClearPage();
    //Load users

}

speakersButton.onclick = function(){
    ClearPage();
    //Load speakers page

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

//ADD GITHUB REPO
//ADD GITHUB REPO
//ADD GITHUB REPO
let addGithubRepoModal = document.getElementById('addGithubRepoModal');
let AGRMclose = document.getElementsByClassName("AGRMclose")[0];
// When the user clicks on <span> (x), close the modal
AGRMclose.onclick = function() {
    addGithubRepoModal.style.display = "none";
}

//EDIT GITHUB REPO
//EDIT GITHUB REPO
//EDIT GITHUB REPO
let editGithubRepoModal = document.getElementById('editGithubRepoModal');
let EGRMclose = document.getElementsByClassName("EGRMclose")[0];
// When the user clicks on <span> (x), close the modal
EGRMclose.onclick = function() {
    editGithubRepoModal.style.display = "none";
}

//ADD YOUTUBE STREAM
//ADD YOUTUBE STREAM
//ADD YOUTUBE STREAM
let addStreamModal = document.getElementById('addStreamModal');
let ASMclose = document.getElementsByClassName("ASMclose")[0];
// When the user clicks on <span> (x), close the modal
ASMclose.onclick = function() {
    addStreamModal.style.display = "none";
}
document.getElementById('dontSaveS').onclick = () =>{
    addStreamModal.style.display = "none";
}

//EDIT YOUTUBE STREAM
//EDIT YOUTUBE STREAM
//EDIT YOUTUBE STREAM
let editStreamModal = document.getElementById('editStreamModal');
let editSMclose = document.getElementsByClassName("editSMclose")[0];
// When the user clicks on <span> (x), close the modal
editSMclose.onclick = function() {
    editStreamModal.style.display = "none";
}
document.getElementById('dontSaveSedit').onclick = () =>{
    editStreamModal.style.display = "none";
}

window.onclick = function(event) {
    //Stock photos
    if (event.target == editStockPhotoModal) {
        editStockPhotoModal.style.display = "none";
    }
    if (event.target == editStockPhotoModal) {
        editStockPhotoModal.style.display = "none";
    }

    //Github
    if(event.target == addGithubRepoModal){
        addGithubRepoModal.style.display = "none";
    }
    if(event.target == editGithubRepoModal){
        editGithubRepoModal.style.display = "none";
    }

    //YT STREAM
    if(event.target == addStreamModal){
        addStreamModal.style.display = "none";
    }
    if(event.target == editStreamModal){
        editStreamModal.style.display = "none";
    }


}
