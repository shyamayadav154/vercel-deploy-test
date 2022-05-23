
import firebase from 'firebase/app'
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyColr0bfjjiCnRwpLEnOFcxgl50BSFnYiE',
  authDomain: 'img-upload-6be91.firebaseapp.com',
  projectId: 'img-upload-6be91',
  storageBucket: 'img-upload-6be91.appspot.com',
  messagingSenderId: '261933615348',
  appId: '1:261933615348:web:5b1be061db26b088d6b6a1',
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)


