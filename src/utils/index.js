import { openDb, deleteDb } from 'idb';
export const dbPromiseProject = openDb('Projects-store', 1, upgradeDB => {
    upgradeDB.createObjectStore('keyval');
});
export const dbPromiseIssuesComments = openDb(
    'Projects-Issues-Comments-store',
    1,
        upgradeDB => {
    upgradeDB.createObjectStore('comments');
});


export const idbKeyval = {
    async get(key) {
        const dbProject = await dbPromiseProject;
        const result = await dbProject.transaction('keyval').objectStore('keyval').get(key);
        return (result);
    },
    async set(key, val) {
        const dbProject = await dbPromiseProject;
        const tx = dbProject.transaction('keyval', 'readwrite');
        tx.objectStore('keyval').put(val, key);
        return tx.complete;
    },
    async delete(key) {
        const dbProject = await dbPromiseProject;
        const tx = dbProject.transaction('keyval', 'readwrite');
        tx.objectStore('keyval').delete(key);
        return tx.complete;
    },
    async clear() {
        const dbProject = await dbPromiseProject;
        const tx = dbProject.transaction('keyval', 'readwrite');
        tx.objectStore('keyval').clear();
        return tx.complete;
    },
    async keys() {
        const dbProject = await dbPromiseProject;
        let r = await dbProject.transaction('keyval').objectStore('keyval').getAll();
         return (r);
    },
    /*----------------------------------------*/
    async getComment(key) {
        const dbIssues = await dbPromiseIssuesComments;
        const result = await dbIssues.transaction('comments').objectStore('comments').get(key);
        return (result);
    },
    async setComment(key, val) {
        const dbIssues = await dbPromiseIssuesComments;
        const tx = dbIssues.transaction('comments', 'readwrite');
        tx.objectStore('comments').put(val, key);
        return tx.complete;
    },
    async deleteComment(key) {
        const dbIssues = await dbPromiseIssuesComments;
        const tx = dbIssues.transaction('comments', 'readwrite');
        tx.objectStore('comments').delete(key);
        return tx.complete;
    },
    async clearComment() {
        const dbIssues = await dbPromiseIssuesComments;
        const tx = dbIssues.transaction('comments', 'readwrite');
        tx.objectStore('comments').clear();
        return tx.complete;
    },
    async keysComment() {
        const dbIssues = await dbPromiseIssuesComments;
        let r = await dbIssues.transaction('comments').objectStore('comments').getAll();
        return (r);
    },
};
