import firebase from 'firebase';

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
export const database = firebase.database();
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

    static getDataList = <T>(nodePath: string, callBack: Function) => {

        let ref = database.ref(nodePath);

        try {
            let data: T[] = [];
            ref.on('value', dataSnapshot => {
                data = [];
                dataSnapshot.forEach(child => {
                    data.push({
                        ...child.val(),
                        _id: child.key
                    });
                });
                callBack(data);
                ref.off();
            });
        } catch (e) {
            console.log(e);
        }
    };

    static saveData = async <T>(nodePath: string, data: T) => {
        return await database.ref(nodePath).push(data);
    }

    static removeData = async (nodePath: string, id: string) => {
        return await database.ref(`${nodePath}/${id}`).remove();
    }

    static findByPhone = async (collection: string, phone: string) => {
        firestore.collection(collection).where('phone', '==', phone)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(doc);
                });
            });
    }

    static createData = async <T>(nodePath: string, data: T) => {
        return await database.ref(nodePath).push(data);
    }

    static getById = async <T>(nodePath: string, data: T) => {
        return await database.ref(nodePath);
    }

}