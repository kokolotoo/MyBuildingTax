import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://audkzljgdgjfamrzmfuw.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)


import { doc, setDoc, getDocs, getDoc, collection, updateDoc } from "firebase/firestore"
import { db } from "../Config/Firebase_Config"



// Изтриване на файлове от преди 3 години
export const deleteOldFiles = async () => {
    const currentYear = new Date().getFullYear();
    const oldYear = currentYear - 3;

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
        const oldYear = new Date().getFullYear() - 3; // преди 3 години
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

