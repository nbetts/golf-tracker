import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDjek7Vhze3tddsDvXQ3pNcmaAloEOGjZI',
  authDomain: 'golf-tracker-302ca.firebaseapp.com',
  projectId: 'golf-tracker-302ca',
  storageBucket: 'golf-tracker-302ca.appspot.com',
  messagingSenderId: '49639298022',
  appId: '1:49639298022:web:cbe03d4232f3c6890efc27',
  measurementId: 'G-KM8FZ9MTM9',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
