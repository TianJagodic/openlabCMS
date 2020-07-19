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
