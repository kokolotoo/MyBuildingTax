
import {  db } from "../Config/Firebase_Config";

import {
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    updateDoc,
    doc,
    arrayUnion,
    arrayRemove,
    deleteDoc
} from "firebase/firestore";



export async function addTopic(title, content, user) {
    return await addDoc(collection(db, "Topics"), {
        title,
        content,
        authorId: user.user,
        authorRole: {
            cashier: user.cashier,
            housMenager: user.housMenager
        },
        likes: [],
        createdAt: serverTimestamp(),
    });
}


// ➤ Реално време — всички теми
export function subscribeToTopics(callback) {
    const q = query(collection(db, "Topics"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => {
        callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
}


// ➤ Лайкване
export async function toggleLike(topicId, userId) {
    const topicRef = doc(db, "Topics", topicId);

    return updateDoc(topicRef, {
        likes: arrayUnion(userId)
    }).catch(async () => {
        // ако вече има лайк → махаме го
        return updateDoc(topicRef, {
            likes: arrayRemove(userId)
        });
    });
}


// ➤ Изтриване на тема
export async function deleteTopic(topicId) {
    return await deleteDoc(doc(db, "Topics", topicId));
}


export async function addComment(topicId, text, userId) {
    return await addDoc(
        collection(db, "Topics", topicId, "Comments"),
        {
            text,
            userId,
            createdAt: serverTimestamp()
        }
    );
}


// ➤ Слушане в реално време
export function subscribeToComments(topicId, callback) {
    const q = query(
        collection(db, "Topics", topicId, "Comments"),
        orderBy("createdAt", "asc")
    );

    return onSnapshot(q, snap => {
        callback(snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })));
    });
}