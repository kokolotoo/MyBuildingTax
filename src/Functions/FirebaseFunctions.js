import { ref, get, set } from "firebase/database";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { app, auth, googleProvider, db, realtimeDB } from "../Config/Firebase_Config";
import { message } from 'antd';


//логване
export const signIn = async (email, password) => {
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const numberOfApartment = await getApartmentByUserId(userCredential.user.uid)
        if (!numberOfApartment) {
            alert('няма намерен номер на апартамент')
            return
        }

        const oldCashier = await getTaxData()
        
        const newUser = {
            user: numberOfApartment,
            cashier: compareIsCashier(numberOfApartment, oldCashier.cashier)
        };

        sessionStorage.setItem('loginUser', JSON.stringify(newUser));
        return newUser;
    } catch (err) {
        console.log(err.message);
        const errorCode = err.code;
        const messages = {
            "auth/invalid-credential": "Invalid email or password",
            "auth/user-not-found": "No account found with this email.",
            "auth/wrong-password": "Incorrect password. Try again!",
            "auth/too-many-requests": "Too many failed attempts. Please try again later.",
        };
        const result = messages[errorCode]
        alert(result)
    }
};



export const exit = async () => {
    await signOut(auth);
    sessionStorage.removeItem('loginData')
}


//Регистрация
const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user.uid;

    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            alert("❌ Вече съществува регистрация с този имейл!");
            return false;
        }

        if (error.code === "auth/invalid-email") {
            alert("⚠️ Имейл адресът не е валиден!");
            return false;
        }

        if (error.code === "auth/weak-password") {
            alert("⚠️ Паролата трябва да е поне 6 символа!");
            return false;
        }

        console.error("❌ Грешка при регистрация:", error.message);
        alert("⚠️ Възникна неочаквана грешка при регистрация!");
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
            return docSnap.data();
        } else {
            console.log("❌ Документът не съществува!");
            return false;
        }
    } catch (err) {
        console.error("Грешка при четене:", err);
    }
};


//проверява дали логнатия потребител е касиер
const compareIsCashier = (loginUser, cashier) => {
    
    
    if (parseFloat(loginUser) === parseFloat(cashier)) {
        return true
    } else {
        return false
    }
}

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



//взема номера на апартамент по ИД на логина
const getApartmentByUserId = async (userId) => {
    try {
        const numbersRef = ref(realtimeDB, "numbers");
        const snapshot = await get(numbersRef);

        if (snapshot.exists()) {
            const data = snapshot.val();

            // Обхождаме всички апартаменти
            for (const [apartment, info] of Object.entries(data)) {
                if (info.value === userId) {
                    return apartment;
                }
            }
            return null;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
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


