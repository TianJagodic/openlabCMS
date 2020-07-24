function GetAllStockPhotos() {
    return new Promise(resolve => {
       let imageDocs = [];
       db.collection('stock_photos').get().then(snapshot =>{
           snapshot.forEach(doc =>{
               imageDocs.push(doc);
           });
           resolve(imageDocs);
       });
    });
}

function GetAllGithubRepos() {
    return new Promise(resolve => {
        let repoDocs = [];
        db.collection('github_internal_data').get().then(snapshot =>{
            snapshot.forEach(doc =>{
                repoDocs.push(doc);
            });
            resolve(repoDocs);
        });
    });
}

function GetAllStreams() {
    return new Promise(resolve => {
        let repoDocs = [];
        db.collection('youtube_streams').get().then(snapshot =>{
            snapshot.forEach(doc =>{
                repoDocs.push(doc);
            });
            resolve(repoDocs);
        });
    });
}


//Upload the picture of the user and return the download link
async function UploadStockPhoto(image, name){

    //image name
    let imgName = name + "-" + Math.floor(Math.random() * 100000) + 1; + "-picture";

    //the storage location on firebase
    var storageRef = firebase.storage().ref('/stock_photos/'+ imgName);

    //upload task
    var uploadTask = storageRef.put(image);

    return new Promise(resolve => {
        uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {console.log(error);
        }, function() {

            // get the uploaded image url back
            uploadTask.snapshot.ref.getDownloadURL().then(
                function(downloadURL) {
                    resolve(downloadURL);
                });
        });
    });
}

function DropStockPhoto(id) {
    db.collection('stock_photos').doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function UpdateStockPhoto(id, data) {
    db.collection('stock_photos').doc(id).update(data).then(function() {
        console.log("Document successfully updated!");
    }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

}

function DropGithubRepo(id) {
    db.collection('github_internal_data').doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function UpdateGithubRepo(id, data) {
    db.collection('github_internal_data').doc(id).update(data).then(function() {
        console.log("Document successfully updated!");
    }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

function DropYTStreamRepo(id) {
    db.collection('youtube_streams').doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function UpdateYTStreamRepo(id, data) {
    db.collection('youtube_streams').doc(id).update(data).then(function() {
        console.log("Document successfully updated!");
    }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}