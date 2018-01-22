import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCsOcCeyAqC9BGkObTa0hZjdM2SKYcMFrc",
    authDomain: "watt-firebase.firebaseapp.com",
    databaseURL: "https://watt-firebase.firebaseio.com",
    projectId: "watt-firebase",
    storageBucket: "watt-firebase.appspot.com",
    messagingSenderId: "729656276695"
};

var fire = firebase.initializeApp(config);
export default fire;