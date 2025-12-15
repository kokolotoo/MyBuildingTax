import { ref, get, set, remove } from "firebase/database";
import { doc, getDoc, setDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { app, auth, googleProvider, db, realtimeDB } from "../Config/Firebase_Config";
import { getAuth, deleteUser } from "firebase/auth";


/**
 * Изтрива акаунта на текущо влезлия потребител от Authentication и 
 * свързания запис в Realtime DB.
 * * @param {string} apartmentNumber - Номерът на апартамента, свързан с потребителя (user.user).
 * @returns {Promise<void>}
 */



//Изтрива акаунд
export const deleteSelfAccount = async (apartmentNumber) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("Няма влязъл потребител.");
    }

    try {
        // 1. ИЗТРИВАНЕ НА REALTIME DB ПЪРВО (Изисква активен токен!)
        const dbRef = ref(realtimeDB, `numbers/${apartmentNumber}`);
        await remove(dbRef);
        console.log(`✅ Успешно изтрита регистрация за ап. ${apartmentNumber} от Realtime DB.`);

        await deleteUser(user);
        console.log(`✅ Успешно изтрит акаунт с UID: ${user.uid}`);
        sessionStorage.removeItem('loginUser')
        localStorage.removeItem('loginUser')

    } catch (error) {
       
        if (error.code === 'auth/requires-recent-login') {
        
            throw new Error("auth/requires-recent-login");
        }

        if (error.message.includes('Permission denied')) {
            throw new Error("PERMISSION_DENIED: Проверете правилата на Realtime DB.");
        }

        throw error;
    }
};


//логване
export const signIn = async (email, password, checkBox) => {
    try {

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const numberOfApartment = await getApartmentByUserId(userCredential.user.uid);

        if (!numberOfApartment) {
            alert('няма намерен номер на апартамент');
            return;
        }

        const data = await getTaxData();
        const cashier = data.cashier.apartment;
        const houseMenager = data.houseMenager.apartment;

        const newUser = {
            user: numberOfApartment,
            cashier: compareIsCashier(numberOfApartment, cashier),
            housMenager: compareIsCashier(numberOfApartment, houseMenager),
            uid: userCredential.user.uid
        };

        if (checkBox) {
            localStorage.setItem('loginUser', JSON.stringify(newUser));
        } else {
            sessionStorage.setItem('loginUser', JSON.stringify(newUser));
        }

        return newUser;

    } catch (err) {
        console.log("Грешка при логин:", err.message);
        const errorCode = err.code;
        const messages = {
            "auth/invalid-credential": "Invalid email or password",
            "auth/user-not-found": "No account found with this email.",
            "auth/wrong-password": "Incorrect password. Try again!",
            "auth/too-many-requests": "Too many failed attempts. Please try again later.",
        };
        const result = messages[errorCode];
        if (result) alert(result);
    }
};


export const exit = async () => {
    await signOut(auth);
    sessionStorage.removeItem('loginUser')
    localStorage.removeItem('loginUser')
}



//Регистрация2
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



//Регистрация1
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
    try {
        const resultId = await registerUser(formdata.mail, formdata.password);

        await new Promise(resolve => {
            const unsub = onAuthStateChanged(auth, user => {
                if (user) {
                    unsub();
                    resolve();
                }
            });
        });

        const isApartmentRegister = await checkApartment(formdata.apartment);
        if (isApartmentRegister) return;

        if (!resultId) return;
        await saveApartment(formdata.apartment, resultId);

        const data = await getTaxData()
        const isCashier = data.cashier.apartment == formdata.apartment;
        const isHouseMenager = data.houseMenager.apartment == formdata.apartment;

        return {
            user: formdata.apartment,
            cashier: isCashier,
            housMenager: isHouseMenager,
            uid: resultId
        };

    } catch (error) {
        console.log(error.message);

    }

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
    if (Number(loginUser) == Number(cashier)) {
        return true
    } else {
        return false
    }
}



//промяна на данните за цени или управители
export const updateData = async (data) => {
    try {
        const productRef = doc(db, "DataTax", 'settings');
        await setDoc(productRef, data);
    } catch (err) {
        console.error(err);
    }
};




//Добавя нов разход
export const addNewExpense = async (data) => {
    try {
        const expensesRef = collection(db, "Expenses"); // <-- колекция
        await addDoc(expensesRef, data); // <-- нов документ в колекцията
        console.log("Добавено успешно");
    } catch (err) {
        console.error("Грешка:", err);
    }
};



//Взема всички разходи
export const getAllExpenses = async () => {
    try {
        const expensesRef = collection(db, "Expenses");
        const snapshot = await getDocs(expensesRef);

        const expenses = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return expenses;
    } catch (err) {
        console.error("Грешка при взимане на разходи:", err);
        return [];
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


export const checkForRegister = async (number) => {
    const snapshot = await get(ref(realtimeDB, `numbers/${number}`));
    if (snapshot.exists()) {
        return true
    } else {
        return false
    }
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
