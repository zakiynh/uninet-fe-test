import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAL2eZQ4lTHQT3HurYWW2RnjogguuysXuM',
  authDomain: 'blog-post-86fd8.firebaseapp.com',
  projectId: 'blog-post-86fd8',
  storageBucket: 'blog-post-86fd8.appspot.com',
  messagingSenderId: '469017398417',
  appId: '1:469017398417:web:aab0afd9f2e754fe8fc330',
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };