import firebase from 'firebase';
import { WhereFilterOp } from '@firebase/firestore-types';

const config = {
    apiKey: "AIzaSyA0zwk4R_geAxuhSnsh8msajlFZfetnwoU",
    authDomain: "agenda-do-sandro.firebaseapp.com",
    databaseURL: "https://agenda-do-sandro-default-rtdb.firebaseio.com",
    projectId: "agenda-do-sandro",
    storageBucket: "agenda-do-sandro.appspot.com",
    messagingSenderId: "80913556125",
    appId: "1:80913556125:web:acc2bcd314366e04a1aa74",
    measurementId: "G-P5KG3RKY2P"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firestore = firebase.firestore();

export default class FirebaseService {
    static auth = async () => {
        var cred = await firebase.auth().signInWithEmailAndPassword(
            'lagacioneandre@gmail.com',
            'abcd1234'
        );

        window.localStorage.setItem('USER_ID', JSON.stringify(firebase.auth().currentUser?.uid));
        
        console.log(firebase.auth().currentUser?.uid);
        return cred;
    };

    static getDataList = (database: string, query = '') => {
        if (query.length) {
            return firestore.collection(database).where('name', '==', query.trim().toLowerCase()).get();
        }

        return firestore.collection(database).get();
    };

    static saveData = <T>(collection: string, id: string, data: T) => {
        return firestore.collection(collection).doc(id).update(data);
    }

    static removeData = (database: string, id: string) => {
        return firestore.collection(database).doc(id).delete();
    }

    static findByField = (database: string, field: string, condition: WhereFilterOp, value: string) => {
        return firestore.collection(database).where(field, condition, value).get();
    }

    static createDocReference = (collection: string) => {
        return firestore.collection(collection).doc();
    }

}