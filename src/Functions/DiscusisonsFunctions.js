
import { db } from "../Config/Firebase_Config";
import { commentCreator } from "../Helpers/SetCreatorName";

import {
    collection, addDoc,
    serverTimestamp, onSnapshot,
    query, orderBy,
    updateDoc, doc,
    arrayUnion, arrayRemove,
    deleteDoc, runTransaction,
} from "firebase/firestore";



export async function addTopic(title, content, user, data) {
    const creator = commentCreator(data, user)

    return await addDoc(collection(db, "Topics"), {
        title,
        content,
        authorId: creator,
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

    try {
        await runTransaction(db, async (transaction) => {
            const topicDoc = await transaction.get(topicRef);
            if (!topicDoc.exists()) {
                throw "Topic does not exist!";
            }

            const currentLikes = topicDoc.data().likes || [];

            // 2. Провери дали userId вече е в масива
            const isLiked = currentLikes.includes(userId);

            if (isLiked) {
                // Ако вече е харесан -> Махаме лайка
                transaction.update(topicRef, {
                    likes: arrayRemove(userId)
                });
            } else {
                // Ако не е харесан -> Добавяме лайка
                transaction.update(topicRef, {
                    likes: arrayUnion(userId)
                });
            }
        });

    } catch (e) {
        console.error("Transaction failed: ", e);
        throw e;
    }
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