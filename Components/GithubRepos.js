async function LoadGithubRepos() {
    let docs = await GetAllGithubRepos();
    let divs = await assembleDivsGP(docs);
    ClearPage();
    Content.appendChild(addGithubRepoButton);
    divs.forEach(div => {Content.appendChild(div)})
}

const addGithubRepoButton = document.createElement('div');
addGithubRepoButton.className = "addContentButton MD_shadow";
addGithubRepoButton.innerText = "ADD NEW GITHUB REPO";

addGithubRepoButton.onclick = () => {
    resetGithubReposModals()
    addGithubRepoModal.style.display = "block";
}

let addNewRepoButton = document.getElementById('GRsinglebutton');
addNewRepoButton.onclick = () =>{
    uploadNewGithubRepo();
}

let dontSaveGR = document.getElementById('dontSaveGR');
dontSaveGR.onclick = () =>{
    resetGithubReposModals()
    addGithubRepoModal.style.display = "none";
}

let dontSaveGRedit = document.getElementById('dontSaveGRedit');
dontSaveGRedit.onclick = () =>{
    resetGithubReposModals()
    editGithubRepoModal.style.display = "none";
}

function assembleDivsGP(docs){
    return new Promise(resolve => {
        let divs = [];
        docs.forEach(doc =>{
            let div = document.createElement('div');
            let innerText = document.createElement('p');

            div.className = "stock_photos_div MD_shadow";

            innerText.innerText = doc.data().name + " -- " + doc.data().repo_name;
            innerText.className = "stock_photos_innerText";

            div.onclick = () =>{
                //Open the edit modal
                document.getElementById('editGRname').value = doc.data().name;
                document.getElementById('editGRtoken').value = doc.data().token;
                document.getElementById('editGRrepoName').value = doc.data().repo_name;
                document.getElementById('editGRposIndex').value = doc.data().pos_index;

                //Add on click for button
                let deleteGithubRepoButton = document.getElementById('deleteGithubRepoButton');
                deleteGithubRepoButton.onclick = () => {
                    //Drop it
                    if(confirm("Are you sure you want to delete " + doc.data().name)){
                        DropGithubRepo(doc.id);
                        editGithubRepoModal.style.display = "none";
                        resetGithubReposModals();
                        LoadGithubRepos();
                    }
                }

                let editGRsinglebutton = document.getElementById('editGRsinglebutton');
                editGRsinglebutton.onclick = () =>{
                    editDataChecker(doc.id);
                }

                editGithubRepoModal.style.display = "block";
            };

            div.appendChild(innerText);

            divs.push(div);
        });
        resolve(divs);
    });
}

async function uploadNewGithubRepo() {
    let generalName = document.getElementById('GRname').value;
    let token = document.getElementById('GRtoken').value;
    let GRrepoName = document.getElementById('GRrepoName').value;
    let GRposIndex = document.getElementById('GRposIndex').value;

    let data ={
        name: generalName,
        repo_name: GRrepoName,
        token: token,
        pos_index: GRposIndex
    }

    if(generalName !== "" && token !== "" && GRrepoName !== ""){
        db.collection('github_internal_data').add(data).then(function () {
            addGithubRepoModal.style.display = "none";
            resetGithubReposModals();
            LoadGithubRepos();
        });
    }
}

function resetGithubReposModals() {
    document.getElementById('newGithubRepoForm').reset();
    document.getElementById('editGithubRepoForm').reset();
}

function editDataChecker(did) {
    let editGRname = document.getElementById('editGRname').value;
    let editGRtoken = document.getElementById('editGRtoken').value;
    let editGRrepoName = document.getElementById('editGRrepoName').value;
    let editGRposIndex = document.getElementById('editGRposIndex').value;

    let data = {
        name: editGRname,
        repo_name: editGRtoken,
        token: editGRrepoName,
        pos_index: editGRposIndex
    }

    if(editGRname !== "" && editGRtoken !== "" && editGRrepoName !== "" && editGRposIndex !== ""){
        UpdateGithubRepo(did, data);
        editGithubRepoModal.style.display = "none";
        resetGithubReposModals();
        LoadGithubRepos();
    }
}


