import { ref, get, set } from "firebase/database";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { app, auth, googleProvider, db, realtimeDB } from "../Config/Firebase_Config";




//логване
export const signIn = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const newUser = {
            name: userCredential.user.displayName || "No Name",
            email: userCredential.user.email,
            id: userCredential.user.uid
        };

        sessionStorage.setItem('loginUser', JSON.stringify(newUser));

    } catch (err) {
        console.log(err.message);
        const errorCode = err.code;
        const messages = {
            "auth/invalid-credential": "Invalid email or password",
            "auth/user-not-found": "No account found with this email.",
            "auth/wrong-password": "Incorrect password. Try again!",
            "auth/too-many-requests": "Too many failed attempts. Please try again later.",
        };

        return messages[errorCode] || "An error occurred. Try again!";
    }
};




//взема стойността на таксата
export const getTaxData = async () => {
    try {
        const docRef = doc(db, "DataTax", "settings");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Данни: ➡", docSnap.data());
            return docSnap.data();
        } else {
            console.log("❌ Документът не съществува!");
            return null;
        }
    } catch (err) {
        console.error("Грешка при четене:", err);
    }
};




//промяна на цените на таксите 
export const updateTaxData = async (data) => {
    /*
        const data = {
            lowTax: 5,
            hightTax: 15,
            euro: 1.95583,
            cashier: 16,
            money:100
        }
    
     */

    try {
        const productRef = doc(db, "DataTax", "settings");

        await setDoc(productRef, data);

        console.log(`Всички продукти са добавени успешно`);

    } catch (err) {
        console.error(err);
    }
};


//запазва номер на регистриран апартамент
export const registeredApartmets = async (number) => {

    const numberRef = ref(realtimeDB, `numbers/${number}`);

    try {
        const snapshot = await get(numberRef);

        if (snapshot.exists()) {
            // console.log(`Апартамент : ${number}, вече има регистрация`);
            return false; // вече има такова число
        }

        await set(numberRef, { value: number });
        //console.log('Успешна регистрация');
        return true;

    } catch (error) {
        console.error("Грешка при запис:", error);
        return false;
    }
};

//изпозлване
/*
    const handleClick = async () => {
        await registeredApartmets(16);
    };

    handleClick();
*/



//Взема данни на апартамент
export const getApartmentData = async (apart) => {

    try {
        const productRef = doc(db, "Apartments", apart);

        const data = (await getDoc(productRef)).data();

        console.log(data);
        return data

    } catch (err) {
        console.error(err);
    }
};


//Актуализира данни на апартамент
export const updateApartData = async (data , apartment) => {
  
    try {
        const productRef = doc(db, "Apartments", apartment);

        await setDoc(productRef, data);

        console.log('Успешно актуалиризани данни');
        
    } catch (err) {
        console.error(err);
    }
};


