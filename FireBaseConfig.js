import firebase from '@react-native-firebase/app';

class FirebaseSDK {
    login = async (user, success_callback, failed_callback) => {
        await firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
    };
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;