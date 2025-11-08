import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../Config/Firebase_Config"

export const monthTax = (apartment, peoples) => {
    const lowTax = 5
    const hightTax = 15
    
    const taxPerPeople = apartment <= 9 ? lowTax : hightTax
    const totalTax = taxPerPeople * peoples
    return totalTax
}


//взема конкретен апартамент подаден като аргумент
export const getData = async (apartment) => {
    try {
        const productRef = doc(db, "Apartments", `apart${apartment}`);
        const snapshot = await getDoc(productRef);

        if (snapshot.exists()) {
            console.log(`✅ Данни за apart${apartment}:`, snapshot.data());
           
            
            return snapshot.data()

        } else {
            console.log("⚠️ Документът не съществува!");
        }

    } catch (err) {
        console.error("❌ Грешка при четене:", err);
    }
}



//взема всички апартаменти
export const getAllApartments = async () => {
    const querySnapshot = await getDocs(collection(db, "Apartments"));
    const apartments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log(apartments);
    return apartments
};




//Ъпдейтва инфото за конкретен апартамент
export const editApartment = async (apartmentId, updatedFields) => {
    try {
        // 1️⃣ Вземаме документа
        const apartmentRef = doc(db, "Apartments", apartmentId);
        const snapshot = await getDoc(apartmentRef);

        if (!snapshot.exists()) {
            return;
        }
        const currentData = snapshot.data();
        const newData = { ...currentData, ...updatedFields };
        await setDoc(apartmentRef, newData);

    } catch (err) {
        console.error("❌ Грешка при обновяване:", err);
    }
};
/*
     Пример за промяна:

    editApartment("apart3", {
        owner: "Миро Цонев",
        people: 1,
        free: false
    });

 */
