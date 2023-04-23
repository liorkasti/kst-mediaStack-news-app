import { ref } from '../constants/firebase.utils';

export const storeData = async (user, favorites, item, callback) => {
    try {
        await ref.doc(user).update({
            favorites: [item, ...favorites],
        })
        callback ? callback() : null;
    } catch (error) {
        await ref.doc(payload).set({ favorites: [item, ...favorites] })
        console.log('Store: Something went wrong while fetching from firestore.', error);
    }
}

export const removeData = async (user, favorites, item, callback) => {
    try {
        await ref.doc(user).update({
            favorites: favorites?.filter(
                i => i?.title !== item?.title
            )
        })
        callback ? callback() : null;
    } catch (error) {
        console.log('Remove: Something went wrong while fetching from firestore.', error);
    }
}