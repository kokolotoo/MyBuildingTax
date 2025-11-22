import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://audkzljgdgjfamrzmfuw.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)


import { doc, setDoc, getDocs, getDoc, collection, updateDoc } from "firebase/firestore"
import { db } from "../Config/Firebase_Config"
