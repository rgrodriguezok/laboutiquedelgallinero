import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBmo2CDbn8n2JZ8Sy64DZa3GSVWLiq3vGI",
    authDomain: "laboutiquedelgallinero.firebaseapp.com",
    projectId: "laboutiquedelgallinero",
    storageBucket: "laboutiquedelgallinero.firebasestorage.app",
    messagingSenderId: "1060035125979",
    appId: "1:1060035125979:web:23a0528d36d9b3244aa2fe",
};



const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();
const auth = getAuth();

export function crearUsuario(email, password) {
    return (
        new Promise((res, rej) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    console.log("Credenciales", userCredential)
                    const user = userCredential.user;
                    console.log(user)
                    res(user)
                    // ...
                })
                .catch((error) => {
                    console.log(error.code, error.message)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    rej(error)
                    // ..
                });
        })
    )
}

auth.useDeviceLanguage()
export function logearG() {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("test", result)

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;


        }).catch((error) => {
            console.log("test error", error)

            const errorCode = error.code;
            const errorMessage = error.message;

            const email = error.customData.email;

            const credential = GoogleAuthProvider.credentialFromError(error);

        });
}

export function loginEmailPass(email, password) {
    return (
        new Promise((res, rej) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    console.log("Credenciales", userCredential)
                    const user = userCredential.user;
                    console.log(user)
                    res(user)
                })
                .catch((error) => {
                    console.log(error.code)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    rej(error)
                });
        })
    )
}

import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export function crearProducto(name, imagen, price, description) {
    return new Promise(async (res, rej) => {
        try {
            const docRef = await addDoc(collection(db, "productos"), {
                name: name,
                imagen: imagen,
                price: price,
                description: description
            });

            console.log("Document written with ID: ", docRef.id);
            res(docRef)

        } catch (e) {
            console.error("Error adding document: ", e);
            rej(e)
        }
    });
}

export function obtenerProductos() {
    return (
        new Promise(async (res, rej) => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));

                const resultados = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        imagen: data.imagen,
                        price: data.price,
                        description: data.description
                    };
                });

                res(resultados);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
                rej(error);
            }
        })
    )
}