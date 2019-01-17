import { openDb, deleteDb } from 'idb';
export const dbPromise = openDb('Projects-store', 1, upgradeDB => {
    upgradeDB.createObjectStore('keyval');
});

export const idbKeyval = {
    async get(key) {
        const db = await dbPromise;
        const result = await db.transaction('keyval').objectStore('keyval').get(key);
        return (result);
    },
    async set(key, val) {
        const db = await dbPromise;
        const tx = db.transaction('keyval', 'readwrite');
        tx.objectStore('keyval').put(val, key);
        return tx.complete;
    },
    async delete(key) {
        const db = await dbPromise;
        const tx = db.transaction('keyval', 'readwrite');
        tx.objectStore('keyval').delete(key);
        return tx.complete;
    },
    async clear() {
        const db = await dbPromise;
        const tx = db.transaction('keyval', 'readwrite');
        tx.objectStore('keyval').clear();
        return tx.complete;
    },
    async keys() {
        const db = await dbPromise;
        let r = await db.transaction('keyval').objectStore('keyval').getAll();
         return (r);
    },
};
