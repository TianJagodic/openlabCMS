async function LoadYoutubeStreams() {
    let docs = await GetAllStreams();
    let divs = await assembleDivsYT(docs);
    ClearPage();
    Content.appendChild(addStreamButton);
    divs.forEach(div => {Content.appendChild(div)})
}

const addStreamButton = document.createElement('div');
addStreamButton.className = "addContentButton MD_shadow";
addStreamButton.innerText = "ADD NEW YOUTUBE STREAM";

addStreamButton.onclick = () => {
    addStreamModal.style.display = "block";
}

document.getElementById('Ssinglebutton').onclick = () =>{
    prepStreamUpload();
}

function assembleDivsYT(docs) {

    return new Promise(resolve => {
        let divs = [];
        docs.forEach(doc =>{
            let div = document.createElement('div');
            let innerText = document.createElement('p');

            div.className = "stock_photos_div MD_shadow";

            innerText.innerText = doc.data().name;
            innerText.className = "stock_photos_innerText";


            div.onclick = () =>{
                //Do something
                //Setup the modal
                //Show the data

                document.getElementById('editSname').value = doc.data().name;
                document.getElementById('editSiFrame').value = doc.data().iFrame;
                document.getElementById('editS_pos_index').value = doc.data().pos_index;

                //Save new data
                document.getElementById('editSsinglebutton').onclick = () => {
                    //Save changes
                    let data = {
                        name: document.getElementById('editSname').value,
                        iFrame: document.getElementById('editSiFrame').value,
                        pos_index: document.getElementById('editS_pos_index').value
                    }

                    UpdateYTStreamRepo(doc.id, data);
                    ClearPage();
                    editStreamModal.style.display = "none";
                    resetStreamForms();
                    LoadYoutubeStreams();
                }

                //Drop this image
                document.getElementById('deleteStreamButton').onclick = () =>{
                    //Drop stock photo
                    if(confirm("Are you sure you want to delete " + doc.data().name)){
                        DropYTStreamRepo(doc.id);
                        ClearPage();
                        editStreamModal.style.display = "none";
                        resetStreamForms();
                        LoadYoutubeStreams();
                    }
                }

                editStreamModal.style.display = "block";
            }

            div.appendChild(innerText);

            divs.push(div);
        });
        resolve(divs);
    });
}

async function prepStreamUpload() {


    let SPname = document.getElementById('Sname').value;
    let frame = document.getElementById('SiFrame').value;
    let pos_index = document.getElementById('S_pos_index').value;


    let data ={
        name: SPname,
        iFrame: frame,
        pos_index: pos_index
    }

    db.collection('youtube_streams').add(data).then(function () {
        addStreamModal.style.display = "none";
        ClearPage();
        resetStreamForms();
        LoadYoutubeStreams();
    });
}

function resetStreamForms() {
    document.getElementById('newStreamForm').reset();
    document.getElementById('editStreamForm').reset();
}