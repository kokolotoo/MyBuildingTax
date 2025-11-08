import { ref, get, set } from "firebase/database";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
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



export const exit = async ()=>{
    await signOut(auth);
    sessionStorage.removeItem('loginData')
}


//Регистрация
const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user.uid;
    } catch (error) {

        // Грешка: имейлът вече съществува
        if (error.code === "auth/email-already-in-use") {
            alert("❌ Вече съществува регистрация с този имейл!");
            return false;
        }

        // Други възможни грешки
        if (error.code === "auth/invalid-email") {
            alert("⚠️ Имейл адресът не е валиден!");
            return false;
        }

        console.error("❌ Грешка при регистрация:", error.message);
        return false;
    }
};




export const sumbmit = async (formdata) => {
    const validEmailDomains = ["gmail.com", "abv.bg", "yahoo.com", "outlook.com", "icloud.com", "mail.bg"];
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(formdata.mail)) {
        alert("❌ Моля, въведи валиден имейл адрес!");
        return;
    }

    // Проверка за реален домейн
    const domain = formdata.mail.split("@")[1]?.toLowerCase();
    if (!validEmailDomains.includes(domain)) {
        alert("⚠️ Моля, въведи имейл от реален доставчик (gmail, abv, mail.bg, и т.н.)!");
        return;
    }

    if (formdata.password !== formdata.confirmPassword) {
        alert("⚠️ Паролите не съвпадат!");
        return;
    }

    const isApartmentRegister = await checkApartment(formdata.apartment);
    if (isApartmentRegister) return;

    const resultId = await registerUser(formdata.mail, formdata.password, formdata.apartment);
    if (!resultId) return;

    await saveApartment(formdata.apartment, resultId);

    const cashierAparment = await getTaxData();
    const isCashier = cashierAparment.cashier == formdata.apartment;

    return {
        user: formdata.apartment,
        cashier: isCashier,
    };
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
            return false;
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
const saveApartment = async (number, userID) => {
    const numberRef = ref(realtimeDB, `numbers/${number}`);
    try {
        await set(numberRef, { value: userID });
        console.log('Успешна регистрация')
    } catch (error) {
        console.error("Грешка при запис:", error);
        return false;
    }
};


//проверява дали има регистриран апартамент
const checkApartment = async (number) => {
    const snapshot = await get(ref(realtimeDB, `numbers/${number}`));
    if (snapshot.exists()) {
        alert(`Апартамент : ${number}, вече има регистрация`)
    }
    return snapshot.exists();
};




//Взема данни на апартамент
export const getApartmentData = async (apart) => {

    try {
        const productRef = doc(db, "Apartments", `apart${apart}`);

        const data = (await getDoc(productRef)).data();

        console.log(data);
        return data

    } catch (err) {
        console.error(err);
    }
};


//Актуализира данни на апартамент
export const updateApartData = async (data, apartment) => {

    try {
        const productRef = doc(db, "Apartments", apartment);

        await setDoc(productRef, data);

        console.log('Успешно актуалиризани данни');

    } catch (err) {
        console.error(err);
    }
};


