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