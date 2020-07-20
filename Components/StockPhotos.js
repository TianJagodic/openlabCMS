async function LoadPhotos() {
    let docs = await GetAllStockPhotos();
    let divs = await AssembleDivs(docs);
    ClearPage();
    Content.appendChild(addStockPhotoButton);
    divs.forEach(div => {Content.appendChild(div)})
}

const addStockPhotoButton = document.createElement('div');
addStockPhotoButton.className = "addContentButton MD_shadow";
addStockPhotoButton.innerText = "ADD NEW STOCK PHOTO";

addStockPhotoButton.onclick = () => {
    addStockPhotoModal.style.display = "block";
}


function AssembleDivs(docs) {
    return new Promise(resolve => {
        let divs = [];
        docs.forEach(doc =>{
            let div = document.createElement('div');
            let innerText = document.createElement('p');
            let image = document.createElement('img');

            div.className = "stock_photos_div MD_shadow";

            innerText.innerText = doc.data().image_name;
            innerText.className = "stock_photos_innerText";

            image.src = doc.data().image_link;
            image.className = "stock_photos_image";

            div.appendChild(image);
            div.appendChild(innerText);

            divs.push(div);
        });
        resolve(divs);
    });
}

document.getElementById('SPsinglebutton').onclick = () =>{
    uploadNewStockPhoto();
}

async function uploadNewStockPhoto() {


    let SPname = document.getElementById('SPname').value;
    let imgTag = document.getElementById('SPimg');
    let SPauthor = document.getElementById('SPauthor').value;
    let SPcameraSettings = document.getElementById('SPcameraSettings').value;
    let SPposIndex = document.getElementById('SPposIndex').value;
    let SPpicButton = document.getElementById('SPpicButton');

    let img = await UploadStockPhoto(SPpicButton.files[0], SPname);

    let data ={
        author: SPauthor,
        camera_settings: SPcameraSettings,
        image_link: img,
        image_name: SPname,
        pos_index: SPposIndex,
        timestamp: 100
    }

    db.collection('stock_photos').add(data);


}
