async function LoadSpeakers() {
    let docs = await GetAllSpeakers();
    let divs = await assembleDivsSP(docs);
    ClearPage();
    Content.appendChild(addSpeakerButton);
    divs.forEach(div => {Content.appendChild(div)})
}

const addSpeakerButton = document.createElement('div');
addSpeakerButton.className = "addContentButton MD_shadow";
addSpeakerButton.innerText = "ADD NEW SPEAKER";

addSpeakerButton.onclick = () => {
    addSpeakersModal.style.display = "block";
}

let imageFile = document.getElementById('SPEpicButton');
imageFile.onchange = () => {
    document.getElementById('imagePreviewText_SPE').innerText = imageFile.files[0].name;
    document.getElementById('SPEimg').src = window.URL.createObjectURL(imageFile.files[0]);
}

document.getElementById('SPEsinglebutton').onclick  = () =>{
    prepForUpload();
}

function assembleDivsSP(docs){
    return new Promise(resolve => {
        let divs = [];

        docs.forEach(doc => {
            let div = document.createElement('div');
            let innerText = document.createElement('p');

            div.className = "stock_photos_div MD_shadow";

            innerText.innerText = doc.data().name_of_document;
            innerText.className = "stock_photos_innerText";

            div.onclick = () => {


                document.getElementById('SPEimgEDIT').src = doc.data().image_link;
                document.getElementById('SPEnameOfDocumentEDIT').value = doc.data().name_of_document;
                document.getElementById('SPEnameOfSpeakerEDIT').value = doc.data().name_of_speaker;
                document.getElementById('SPEdescriptionEDIT').value = doc.data().description;
                document.getElementById('SPEtopicEDIT').value = doc.data().topic;
                document.getElementById('SPEposIndexEDIT').value = doc.data().pos_index;

                editCSpeakersModal.style.display = "block";
            }

            document.getElementById('editSPEsinglebutton').onclick = () => {
                //Save changes
                let data = {}

                if(document.getElementById('SPEimgEDIT').src === doc.data().image_link){
                    data = {
                        name_of_document: document.getElementById('SPEnameOfDocumentEDIT').value,
                        name_of_speaker: document.getElementById('SPEnameOfSpeakerEDIT').value,
                        description:document.getElementById('SPEdescriptionEDIT').value,
                        topic: document.getElementById('SPEtopicEDIT').value,
                        pos_index: document.getElementById('SPEposIndexEDIT').value
                        }
                }else{
                    data = {
                        image_link: UploadSpeakerPhoto(document.getElementById('SPEpicButtonEDIT').files[0],document.getElementById('SPEnameOfDocumentEDIT').value),
                        name_of_document: document.getElementById('SPEnameOfDocumentEDIT').value,
                        name_of_speaker: document.getElementById('SPEnameOfSpeakerEDIT').value,
                        description:document.getElementById('SPEdescriptionEDIT').value,
                        topic: document.getElementById('SPEtopicEDIT').value,
                        pos_index: document.getElementById('SPEposIndexEDIT').value
                      }
                }

                UpdateSpeaker(doc.id, data);
                resetSpeakersForm();

            }

            //Drop this speaker
            document.getElementById('deleteSpeakerButton').onclick = () =>{
                //Drop stock photo
                if(confirm("Are you sure you want to delete " + doc.data().name_of_document)){
                    DropSpeaker(doc.id);
                    ClearPage();
                    editCSpeakersModal.style.display = "none";
                    resetSpeakersForm();
                    LoadSpeakers();
                }
            }

            div.appendChild(innerText);

            divs.push(div);
        });
        resolve(divs);
    });
}

async function prepForUpload() {
        let name_of_document=  document.getElementById('SPEnameOfDocument').value;
        let name_of_speaker= document.getElementById('SPEnameOfSpeaker').value;
        let description=document.getElementById('SPEdescription').value;
        let topic= document.getElementById('SPEtopic').value;
        let pos_index= document.getElementById('SPEposIndex').value;

        let image_link = await UploadSpeakerPhoto(document.getElementById('SPEpicButton').files[0],name_of_document);

        let data = {
            name_of_document:name_of_document,
            name_of_speaker: name_of_speaker,
            description: description,
            topic: topic,
            pos_index: pos_index,
            image_link: image_link
        }

    db.collection('speakers').add(data).then(function () {
        addSpeakersModal.style.display = "none";
        resetSpeakersForm();
        LoadSpeakers();
    });
}

function resetSpeakersForm(){
    document.getElementById('newSpeakersForm').reset();
    document.getElementById('editSpeakerForm').reset();
}