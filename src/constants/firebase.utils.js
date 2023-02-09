import firestore from '@react-native-firebase/firestore';
export const db = firestore();
export const ref = db.collection('users');
export const snapshot = ref.get();