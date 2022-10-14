import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import store from './store';
import { showNotification } from '@mantine/notifications';
import { GolfCourse, GolfPlayer, GolfScorecard } from './types';
import { useAuthSignInWithRedirect, useAuthSignOut, useAuthUser } from '@react-query-firebase/auth';

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

export const firebaseApp = initializeApp(firebaseConfig);
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

const coursesCollectionRef = collection(firebaseFirestore, 'courses');
const playersCollectionRef = collection(firebaseFirestore, 'players');
const scorecardsCollectionRef = collection(firebaseFirestore, 'scorecards');

export const coursesSnapshotListener = () => {
  return onSnapshot(coursesCollectionRef, (querySnapshot) => {
    const courses = { ...(store.getRawState().courses || {}) };

    querySnapshot.docChanges().forEach((documentChange) => {
      const { doc } = documentChange;
      courses[doc.id] = doc.data() as GolfCourse;
    });

    store.update((s) => {
      s.courses = courses;
    });
  });
};

export const playersSnapshotListener = () => {
  return onSnapshot(playersCollectionRef, (querySnapshot) => {
    const players = { ...(store.getRawState().players || {}) };

    querySnapshot.docChanges().forEach((documentChange) => {
      const { doc } = documentChange;
      players[doc.id] = doc.data() as GolfPlayer;
    });

    store.update((s) => {
      s.players = players;
    });
  });
};

const scorecardsQuery = query(scorecardsCollectionRef, where('private', '==', false));

export const scorecardsSnapshotListener = () => {
  return onSnapshot(scorecardsQuery, (querySnapshot) => {
    const scorecards = { ...(store.getRawState().scorecards || {}) };

    querySnapshot.docChanges().forEach((documentChange) => {
      const { doc } = documentChange;
      scorecards[doc.id] = doc.data() as GolfScorecard;
    });

    store.update((s) => {
      s.scorecards = scorecards;
    });
  });
};
