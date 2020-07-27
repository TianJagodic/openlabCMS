async function LoadCodeSnippets() {
    let docs = await GetAllCodeSnippets();
    let divs = await assembleDivsCS(docs);
    ClearPage();
    Content.appendChild(addCodeSnippetButton);
    divs.forEach(div => {Content.appendChild(div)})
}

const addCodeSnippetButton = document.createElement('div');
addCodeSnippetButton.className = "addContentButton MD_shadow";
addCodeSnippetButton.innerText = "ADD NEW CODE SNIPPET";

addCodeSnippetButton.onclick = () => {
    addCodeSnippetModal.style.display = "block";
}

document.getElementById('CSsinglebutton').onclick = () =>{
    prepCodeSnippetUpload();
}

function assembleDivsCS(docs) {
    return new Promise(resolve => {
        let divs = [];

        docs.forEach(doc => {
            let div = document.createElement('div');
            let innerText = document.createElement('p');

            div.className = "stock_photos_div MD_shadow";

            innerText.innerText = doc.data().name;
            innerText.className = "stock_photos_innerText";

            div.onclick = () => {
                document.getElementById('editCSname').value = doc.data().name;
                document.getElementById('editCSlink').value = doc.data().link;
                document.getElementById('editCS_pos_index').value = doc.data().pos_index;

                editCodeSnippetModal.style.display = "block";
            }

            //Save new data
            document.getElementById('editCSsinglebutton').onclick = () => {
                //Save changes
                let data = {
                    name: document.getElementById('editCSname').value,
                    link: document.getElementById('editCSlink').value,
                    pos_index: document.getElementById('editCS_pos_index').value
                }

                UpdateCodeSnippet(doc.id, data);
                editCodeSnippetModal.style.display = "none";
                ClearPage();
                resetCodeSnippetForms();
                LoadCodeSnippets();
            }

            document.getElementById('deleteCodeSnippetButton').onclick = () =>{
                DropCodeSnippet(doc.id);
            }

            div.appendChild(innerText);

            divs.push(div)
        })

        resolve(divs);
    });
}

function prepCodeSnippetUpload() {

    let data = {
        name:  document.getElementById('CSname').value,
        link: document.getElementById('CSlink').value,
        pos_index: document.getElementById('CS_pos_index').value
    }

    db.collection('github_gists').add(data).then(function () {
        addCodeSnippetModal.style.display = "none";
        ClearPage();
        resetCodeSnippetForms();
        LoadCodeSnippets();
    });
}

function resetCodeSnippetForms() {
    document.getElementById('newCodeSnippetForm').reset();
    document.getElementById('editCodeSnippetForm').reset();
}