firebase.auth().onAuthStateChanged(async user => {
    if (user) {
        console.log('user logged in: ', user);
        window.location = "../App/App.html";
    } else {
        console.log('user logged out');
    }
});



// login
const loginForm = document.querySelector('#LoginEmail-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-name'].value;
    const password = loginForm['password'].value;


    // log the user in
    firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
        //console.log(cred.user);
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        loginForm.reset();

    }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.log(error);
        document.getElementById("LoginEmailErrorText").innerText = errorMessage;
    });
});