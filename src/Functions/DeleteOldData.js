import { supabase } from "../Config/SupaBase_Config";

import { doc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../Config/Firebase_Config"


// 1. Изтриване на файлове от преди 2 години (Supabase Storage)
// ⚠️ Препоръка: Променете лимита от 1000 на по-голям, ако имате много файлове.
export const deleteOldFiles = async () => {
    const currentYear = new Date().getFullYear();
    const oldYear = currentYear - 2;

    try {
        const { data: files, error } = await supabase
            .storage
            .from('signatures')
            .list('', { limit: 10000 }); // Увеличен лимит за по-голяма сигурност

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

        console.log(`✅ Изтрити ${oldFiles.length} файла от Supabase Storage за ${oldYear} г.`);
    } catch (err) {
        console.error('❌ Неочаквана грешка при deleteOldFiles:', err);
    }
};


// 2. Изтриване на стари URL-и от Firestore (Collection: Apartments)
export const deleteOldUrlsFromFirestore = async () => {
    try {
        const oldYear = new Date().getFullYear() - 2; // годината, която трием
        const apartmentsRef = collection(db, "Apartments");
        const snapshot = await getDocs(apartmentsRef);

        const updatePromises = [];
        let totalRemoved = 0;

        snapshot.forEach((aptDoc) => {
            const data = aptDoc.data();

            if (!data.year || !Array.isArray(data.year)) return;

            const originalLength = data.year.length;

           
            const updatedYear = data.year.filter(
                url => (typeof url === 'string') && !url.includes(`/${oldYear}_`)
            );

            // Ако има промяна, изпълняваме updateDoc
            if (updatedYear.length !== originalLength) {
                totalRemoved += (originalLength - updatedYear.length);

                const updatePromise = updateDoc(doc(db, "Apartments", aptDoc.id), { year: updatedYear })
                    .catch((error) => {
                        console.error(`Грешка при обновяване на ${aptDoc.id}:`, error);
                    });

                updatePromises.push(updatePromise);
            }
        });

        // 🛑 Изчакваме всички актуализации да приключат
        await Promise.all(updatePromises);

        console.log(`✅ Финализирано премахването на ${totalRemoved} URL-а от Firestore за ${oldYear} г.`);
    } catch (err) {
        console.error("❌ Грешка при изтриване на стари URL-и:", err);
    }
};


// 3. Изтриване на стари разходи от Firestore (Collection: Expenses)
export const deleteOldExpenses = async () => {
    try {
        const expensesRef = collection(db, "Expenses");
        const snapshot = await getDocs(expensesRef);

        if (snapshot.empty) {
            console.log("Няма записи за разходи.");
            return;
        }

        const currentYear = new Date().getFullYear();
        const targetYear = currentYear - 2;

        const deletePromises = [];
        let deletedCount = 0;

        for (const docSnap of snapshot.docs) {
            const data = docSnap.data();
            const idDate = data.id;

            if (!idDate) continue;

            const yearMatch = idDate.match(/(\d{4})/);
            if (!yearMatch) continue;

            const year = parseInt(yearMatch[1]);

            // Проверка за изтриване на разходи от targetYear (2023) И по-стари
            if (year <= targetYear) {
                deletedCount++;
                const deletePromise = deleteDoc(doc(db, "Expenses", docSnap.id))
                    .catch((error) => {
                        console.error(`Грешка при изтриване на разход ${docSnap.id}:`, error);
                    });
                deletePromises.push(deletePromise);
            }
        }

        // 🛑 Изчакваме всички операции по изтриване да приключат
        await Promise.all(deletePromises);

        console.log(`✅ Изтрити стари разходи: ${deletedCount} за ${targetYear} г. и по-рано.`);
    } catch (err) {
        console.error("❌ Грешка при триене на разходи:", err);
    }
};