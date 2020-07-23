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

            div.onclick = () =>{
                //Do something
                //Setup the modal
                //Show the data

                console.log(doc.data())

                document.getElementById('editSPimg').src = doc.data().image_link;
                document.getElementById('editimagePreviewText').innerText = "Change photo";
                document.getElementById('editSPname').value = doc.data().image_name;
                document.getElementById('editSPauthor').value = doc.data().author;
                document.getElementById('editSPcameraSettings').value = doc.data().camera_settings;
                document.getElementById('editSPposIndex').value = doc.data().pos_index;

                //Save new data
                document.getElementById('editSPsinglebutton').onclick = () => {
                    //Save changes
                    let data = {}

                    if(document.getElementById('editSPimg').src === doc.data().image_link){
                        data = {
                            image_name: document.getElementById('editSPname').value,
                            author: document.getElementById('editSPauthor').value,
                            camera_settings: document.getElementById('editSPcameraSettings').value,
                            pos_index: document.getElementById('editSPposIndex').value
                        }
                    }else{
                        data = {
                            image_link: UploadStockPhoto(document.getElementById('editSPimg').files[0],document.getElementById('editSPname').value),
                            image_name: document.getElementById('editSPname').value,
                            author: document.getElementById('editSPauthor').value,
                            camera_settings: document.getElementById('editSPcameraSettings').value,
                            pos_index: document.getElementById('editSPposIndex').value
                        }
                    }

                    UpdateStockPhoto(doc.id, data);
                    resetStockPhotoModals();

                }

                //Drop this image
                document.getElementById('deleteStockPhotoButton').onclick = () =>{
                    //Drop stock photo
                    if(confirm("Are you sure you wnat to delete " + doc.data().image_name)){
                        DropStockPhoto(doc.id);
                        resetStockPhotoModals();
                    }
                }

                editStockPhotoModal.style.display = "block";
            }

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

function resetStockPhotoModals() {
    document.getElementById('newStockPhotoForm').reset();
    document.getElementById('editSPform').reset();
}
