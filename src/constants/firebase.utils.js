import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// console.log('currentUser :>> ', currentUser);
export const db = firestore();
export const user = 'liorkasti@gmail.com';
export const ref = db.collection('users');
// export const ref = db.collection('users').doc(doc);
export const snapshot = ref.get();
export const currentUser = auth().currentUser;