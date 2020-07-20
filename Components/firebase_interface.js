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