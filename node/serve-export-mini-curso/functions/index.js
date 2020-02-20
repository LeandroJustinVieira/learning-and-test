const functions = require('firebase-functions');
const express = require('express');

let SERVER = "https://mini-curso-react-native-unesc.firebaseapp.com";

const app = express();

let music = 
[
    {
       "id": 1,
       "image": SERVER + "/resource/babyshark.jpg",
       "title":"Baby Shark Doo Doo",
       "artistic":"Pinkfong",
       "album":"Pinkfong Animal Songs",
       "music": "babyshark.mp3"
    },
    {
        "id": 2,
        "image": SERVER + "/resource/badguy.jpg",
        "title":"Bad Guy",
        "artistic":"Billie Eilish",
        "album":"When We All Fall Asleep, Where Do We Go?",
        "music": "badguy.mp3"
     },
     {
        "id": 3,
        "image": SERVER + "/resource/vucvuc.jpg",
        "title":"Vuc Vuc Bueiro",
        "artistic":"ExfireStorm",
        "album":"ExfireStorm",
        "music": "vucvuc.mp3"
     },
     {
        "id": 4,
        "image": SERVER + "/resource/vitas.png",
        "title":"7h Element",
        "artistic":"Vitas",
        "album":"Philosophy of Miracle",
        "music": "vitas.mp3"
     },
     {
        "id": 5,
        "image": SERVER + "/resource/oudrikandalarrai.jpg",
        "title":"Oudri Kanda Larrai",
        "artistic":"Mc Suave",
        "album":"KondZilla",
        "music": "oudrikandalarrai.mp3"
     }
 ];

app.get('/music', function(req, res){
    res.json(music);
});

exports.app = functions.https.onRequest(app);