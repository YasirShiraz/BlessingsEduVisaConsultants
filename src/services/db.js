import { db } from '../auth/firebase';
import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

// Collection Names
export const COLLECTIONS = {
    STATS: 'stats',
    TESTIMONIALS: 'testimonials',
    COUNTRIES: 'countries',
    CONTACT: 'contact',
    APPLICATIONS: 'applications',
    SERVICES: 'services',
    PROCESS: 'process_steps',
    CONTENT: 'site_content' // For generic page content like Hero, About, etc.
};

// --- Generic Helpers ---

/**
 * Subscribe to a collection with real-time updates
 * @param {string} collectionName 
 * @param {function} callback - Receives the array of data with IDs
 * @returns {function} - Unsubscribe function
 */
export const subscribeToCollection = (collectionName, callback) => {
    if (!db) return () => { };

    const q = query(collection(db, collectionName));
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    }, (error) => {
        console.error(`Error subscribing to ${collectionName}:`, error);
    });
};

/**
 * Subscribe to a single document with real-time updates
 * @param {string} collectionName 
 * @param {string} docId 
 * @param {function} callback 
 * @returns {function} - Unsubscribe function
 */
export const subscribeToDocument = (collectionName, docId, callback) => {
    if (!db) return () => { };

    return onSnapshot(doc(db, collectionName, docId), (docSnap) => {
        if (docSnap.exists()) {
            callback({ id: docSnap.id, ...docSnap.data() });
        } else {
            console.log(`No such document in ${collectionName}/${docId}`);
            callback(null);
        }
    }, (error) => {
        console.error(`Error subscribing to ${collectionName}/${docId}:`, error);
    });
};

// --- CRUD Operations ---

export const addItem = async (collectionName, data) => {
    if (!db) throw new Error("Database not initialized");
    return await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp()
    });
};

export const setItem = async (collectionName, docId, data) => {
    if (!db) throw new Error("Database not initialized");
    return await setDoc(doc(db, collectionName, docId), {
        ...data,
        updatedAt: serverTimestamp()
    }, { merge: true });
};

export const updateItem = async (collectionName, docId, data) => {
    if (!db) throw new Error("Database not initialized");
    return await updateDoc(doc(db, collectionName, docId), {
        ...data,
        updatedAt: serverTimestamp()
    });
};

export const deleteItem = async (collectionName, docId) => {
    if (!db) throw new Error("Database not initialized");
    return await deleteDoc(doc(db, collectionName, docId));
};

// --- Seed Helper (Run once manually or if empty) ---
export const seedCollection = async (collectionName, dataArray) => {
    if (!db) return;
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
        console.log(`Seeding ${collectionName}...`);
        const promises = dataArray.map(item => {
            // If item has an ID, use it as doc ID, otherwise auto-ID
            if (item.id && typeof item.id === 'string') {
                const { id, ...rest } = item;
                return setDoc(doc(db, collectionName, id.toString()), rest);
            } else {
                return addDoc(colRef, item);
            }
        });
        await Promise.all(promises);
        console.log(`Seeding ${collectionName} complete.`);
    }
};

export const seedDocument = async (collectionName, docId, data) => {
    if (!db) return;
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        console.log(`Seeding ${collectionName}/${docId}...`);
        await setDoc(docRef, data);
    }
};
