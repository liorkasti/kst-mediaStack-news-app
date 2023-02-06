import firestore from '@react-native-firebase/firestore';

export const doc = 'Z2cCJ6UejHVvaSnMSJQA';
export const db = firestore();
export const ref = db.collection('favorites').doc(doc);
export const snapshot = ref.get();