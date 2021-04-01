import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
}

// Google Sign In 

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(provider)
        .then(res => {
            const { displayName, email, photoURL } = res.user
            const isSignInLogIn = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return isSignInLogIn


        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })

}

// Google Sign Out

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const isSignInLogOut = {
                isSignIn: false,
                name: '',
                email: '',
                photo: ''
            }
            return isSignInLogOut
            console.log('Log Out successfully Done!!!');
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })

}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user
            newUserInfo.error = '';
            newUserInfo.success = true;
            userUpdateInfo(name)
            return newUserInfo
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}


const userUpdateInfo = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('Update successful')
    }).catch(function (error) {
        console.log(error);
    });
}


