import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, CollectionReference, doc, getFirestore, query, where } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';
import { GolfCourse, GolfPlayer, GolfScorecard } from './types';
import { useAuthSignInWithRedirect, useAuthSignOut, useAuthUser } from '@react-query-firebase/auth';
import { useFirestoreDocumentMutation, useFirestoreQueryData } from '@react-query-firebase/firestore';

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
    onSuccess: () => showNotification({ message: 'Signed in', color: 'green' }),
    onError: () => showNotification({ message: 'Unable to sign in', color: 'red' }),
  });

export const useSignOut = () =>
  useAuthSignOut(firebaseAuth, {
    onSuccess: () => showNotification({ message: 'Signed out', color: 'green' }),
  });

// Firestore

export const coursesCollectionRef = collection(firebaseFirestore, 'courses') as CollectionReference<GolfCourse>;
export const playersCollectionRef = collection(firebaseFirestore, 'players') as CollectionReference<GolfPlayer>;
export const scorecardsCollectionRef = collection(firebaseFirestore, 'scorecards') as CollectionReference<GolfScorecard>;

const coursesQuery = query(coursesCollectionRef);
const playersQuery = query(playersCollectionRef);
const scorecardsQuery = query(scorecardsCollectionRef, where('hidden', '==', false));

export const useCoursesCollection = () => useFirestoreQueryData('courses', coursesQuery, { idField: 'id', subscribe: true });
export const usePlayersCollection = () => useFirestoreQueryData('players', playersQuery, { idField: 'id', subscribe: true });
export const useScorecardsCollection = () => useFirestoreQueryData('scorecards', scorecardsQuery, { idField: 'id', subscribe: true });

export const usePersonalScorecardsCollection = (uid: string) => {
  return useFirestoreQueryData('personalScorecards', query(scorecardsCollectionRef, where('userId', '==', uid)), { idField: 'id', subscribe: true });
};

export const useScorecardDocumentMutation = (id: string) => {
  return useFirestoreDocumentMutation<Partial<GolfScorecard>>(doc(scorecardsCollectionRef, id), { merge: true });
};
