
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://audkzljgdgjfamrzmfuw.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)



export const uploadImg = async (file, fileName) => {
    if (!file) return null;

    const { data, error } = await supabase.storage
        .from("signatures")
        .upload(fileName, file, {
            contentType: file.type,
            upsert: true,
        });

    if (error) {
        console.error("Грешка при качване:", error.message);
        return null;
    }

    const { data: publicData } = supabase.storage
        .from("signatures")
        .getPublicUrl(fileName);

    console.log("Качено успешно:", publicData.publicUrl);
    return publicData.publicUrl;
};



export const deleteImg = async (fileName) => {
    const { error } = await supabase.storage
        .from("signatures")
        .remove([fileName]);

    if (error) {
        console.error("Грешка при изтриване:", error.message);
        return false;
    }

    console.log("Изтрит успешно:", fileName);
    return true;
};



// връща масив от всички имена на снимките
export const listFiles = async () => {
    const { data, error } = await supabase
        .storage
        .from('signatures')
        .list('', { limit: 1000 }); // '' = root, може и папка

    if (error) {
        console.error('Грешка при четене:', error.message);
        return [];
    }

    const allNames = data.map(signature => signature.name).splice(1)

    console.log('Файлове:', allNames);
    return allNames;
};


listFiles()
