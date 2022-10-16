import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, CollectionReference, getFirestore, orderBy, query, where } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';
import { GolfCourse, GolfPlayer, GolfScorecard } from './types';
import { useAuthSignInWithRedirect, useAuthSignOut, useAuthUser } from '@react-query-firebase/auth';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';

// Config

const firebaseConfig = {
  apiKey: 'AIzaSyDjek7Vhze3tddsDvXQ3pNcmaAloEOGjZI',
  authDomain: 'golf-tracker-302ca.firebaseapp.com',
  projectId: 'golf-tracker-302ca',
  storageBucket: 'golf-tracker-302ca.appspot.com',
  messagingSenderId: '49639298022',
  appId: '1:49639298022:web:cbe03d4232f3c6890efc27',
  measurementId: 'G-KM8FZ9MTM9',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);

// Auth

export const useFirebaseAuthUser = () => useAuthUser(['user'], firebaseAuth);

export const useSignIn = () =>
  useAuthSignInWithRedirect(firebaseAuth, {
    onSuccess: () => showNotification({ title: 'Signed in', message: 'Successfully signed in', color: 'green' }),
    onError: (error) => showNotification({ title: 'Unable to sign in', message: error?.message, color: 'red' }),
  });

export const useSignOut = () =>
  useAuthSignOut(firebaseAuth, {
    onSuccess: () => showNotification({ title: 'Signed out', message: 'Successfully signed out', color: 'green' }),
  });

// Firestore

const coursesCollectionRef = collection(firebaseFirestore, 'courses') as CollectionReference<GolfCourse>;
const playersCollectionRef = collection(firebaseFirestore, 'players') as CollectionReference<GolfPlayer>;
const scorecardsCollectionRef = collection(firebaseFirestore, 'scorecards') as CollectionReference<GolfScorecard>;
const coursesQuery = query(coursesCollectionRef, orderBy('name'));
const playersQuery = query(playersCollectionRef, orderBy('name'));
const scorecardsQuery = query(scorecardsCollectionRef, where('private', '==', false));

export const useCoursesCollection = () => useFirestoreQueryData('courses', coursesQuery, { idField: 'id', subscribe: true });
export const usePlayersCollection = () => useFirestoreQueryData('players', playersQuery, { idField: 'id', subscribe: true });
export const useScorecardsCollection = () => useFirestoreQueryData('scorecards', scorecardsQuery, { idField: 'id', subscribe: true });

export const usePersonalScorecardsCollection = (uid: string) => {
  const scorecardsQuery = query(scorecardsCollectionRef, where('userId', '==', uid));
  return useFirestoreQueryData('scorecards', scorecardsQuery, { idField: 'id', subscribe: true });
};
