import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const currentUser = auth().currentUser;
// console.log('currentUser :>> ', currentUser);
export const db = firestore();
export const doc = 'm3CDzdwoITvtDYXwS8Pv';
export const ref = db.collection('users').doc(doc);
export const snapshot = ref.get();