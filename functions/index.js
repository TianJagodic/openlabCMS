const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();


exports.getAllStockPhotos = functions.region('europe-west2').https.onCall(async (data, context) => {

    let photos = await db.collection('stock_photos').orderBy('pos_index', 'desc').orderBy('timestamp','asc').get();

    return {
        docs: photos
    }
});

exports.getAllYoutubeStreams = functions.region('europe-west2').https.onCall(async (data, context) => {

    let streams = await db.collection('youtube_streams').orderBy('pos_index', 'desc').get();

    return {
        docs: streams
    }
});
