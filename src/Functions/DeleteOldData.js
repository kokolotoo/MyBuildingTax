import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://audkzljgdgjfamrzmfuw.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)


import { doc, setDoc, getDocs, getDoc, collection, updateDoc } from "firebase/firestore"
import { db } from "../Config/Firebase_Config"



// Изтриване на файлове от преди 2 години
export const deleteOldFiles = async () => {
    const currentYear = new Date().getFullYear();
    const oldYear = currentYear - 2;

    try {
        const { data: files, error } = await supabase
            .storage
            .from('signatures')
            .list('', { limit: 1000 }); // root директория

        if (error) {
            console.error('Грешка при извличане на файлове:', error.message);
            return;
        }

        const oldFiles = files
            .filter(f => f.name.startsWith(`${oldYear}_`))
            .map(f => f.name);

        if (oldFiles.length === 0) {
            console.log('Няма файлове за изтриване от', oldYear);
            return;
        }

        const { error: deleteError } = await supabase
            .storage
            .from('signatures')
            .remove(oldFiles);

        if (deleteError) {
            console.error('Грешка при изтриване на старите файлове:', deleteError.message);
            return;
        }

        console.log('Изтрити файлове от', oldYear);
    } catch (err) {
        console.error('Неочаквана грешка при deleteOldFiles:', err);
    }
};


export const deleteOldUrlsFromFirestore = async () => {
    try {
        const oldYear = new Date().getFullYear() - 2; // преди 2 години
        const apartmentsRef = collection(db, "Apartments");
        const snapshot = await getDocs(apartmentsRef);

        snapshot.forEach(async (aptDoc) => {
            const data = aptDoc.data();
            if (!data.year || !Array.isArray(data.year)) return;

            // Филтрираме само URL-ите, които не са стари
            const updatedYear = data.year.filter(
                url => !url.includes(`/${oldYear}_`)
            );

            // Ако има промяна, обновяваме документа
            if (updatedYear.length !== data.year.length) {
                await updateDoc(doc(db, "Apartments", aptDoc.id), { year: updatedYear });
                console.log(`Обновен апартамент ${aptDoc.id}: изтрити стари URL-и`);
            }
        });

        console.log("✔ Финализирано премахването на URL-ите от преди 3 години.");
    } catch (err) {
        console.error("❌ Грешка при изтриване на стари URL-и:", err);
    }
};




export const deleteOldExpenses = async () => {
    try {
        const expensesRef = collection(db, "Expenses");
        const snapshot = await getDocs(expensesRef);

        if (snapshot.empty) {
            console.log("Няма записи.");
            return;
        }

        const currentYear = new Date().getFullYear();
        const targetYear = currentYear - 2; // трием 2 години назад (ако е 2025 → трием 2023)

        let deletedCount = 0;

        for (const docSnap of snapshot.docs) {
            const data = docSnap.data();
            const idDate = data.id;  // "26.11.2025 г., 19:22:01 ч."

            if (!idDate) continue;

            // 🎯 Извличане на годината от стринга
            const yearMatch = idDate.match(/(\d{4})/);
            if (!yearMatch) continue;

            const year = parseInt(yearMatch[1]);

            if (year <= targetYear) {
                await deleteDoc(doc(db, "Expenses", docSnap.id));
                deletedCount++;
            }
        }

        console.log(`Изтрити стари разходи: ${deletedCount}`);
    } catch (err) {
        console.error("Грешка при триене:", err);
    }
};