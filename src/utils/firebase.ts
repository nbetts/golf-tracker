import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, CollectionReference, doc, getDoc, getFirestore, query, where } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';
import { GolfCourse, GolfPlayer, GolfScorecard } from './types';
import { useAuthSignInWithPopup, useAuthSignOut, useAuthUser } from '@react-query-firebase/auth';
import { useFirestoreCollectionMutation, useFirestoreDocumentMutation, useFirestoreQueryData } from '@react-query-firebase/firestore';
import { openAddPlayerModal } from './modals';

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

export const useFirebaseAuthUser = () => useAuthUser('user', firebaseAuth);

export const useSignIn = () =>
  useAuthSignInWithPopup(firebaseAuth, {
    onSuccess: (data) => {
      showNotification({ message: 'Signed in', color: 'green' });

      const userId = data.user.uid;
      const name = data.user.displayName;

      getDoc(doc(playersCollectionRef, userId)).then((docSnap) => {
        if (!docSnap.exists()) {
          openAddPlayerModal({ userId, name });
        }
      });
    },
    onError: () => showNotification({ message: 'Unable to sign in', color: 'red' }),
  });

export const useSignOut = () =>
  useAuthSignOut(firebaseAuth, {
    onSuccess: () => showNotification({ message: 'Signed out', color: 'green' }),
  });

// Firestore data read

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
  return useFirestoreQueryData(['personalScorecards', uid], query(scorecardsCollectionRef, where('userId', '==', uid)), {
    idField: 'id',
    subscribe: true,
  });
};

// Firestore data write

export const useCoursesCollectionMutation = () => {
  return useFirestoreCollectionMutation<Partial<GolfCourse>>(coursesCollectionRef, {
    onSuccess: () => showNotification({ message: 'Added course', color: 'green' }),
    onError: () => showNotification({ message: 'Unable to add course', color: 'red' }),
  });
};

export const useCourseDocumentMutation = (id: string) => {
  return useFirestoreDocumentMutation<Partial<GolfCourse>>(
    doc(coursesCollectionRef, id),
    { merge: true },
    {
      onSuccess: () => showNotification({ message: 'Updated course', color: 'green' }),
      onError: () => showNotification({ message: 'Unable to update course', color: 'red' }),
    },
  );
};

export const usePlayersCollectionMutation = () => {
  return useFirestoreCollectionMutation<Partial<GolfPlayer>>(playersCollectionRef, {
    onSuccess: () => showNotification({ message: 'Added player', color: 'green' }),
    onError: () => showNotification({ message: 'Unable to add player', color: 'red' }),
  });
};

export const usePlayerDocumentMutation = (id: string) => {
  return useFirestoreDocumentMutation<Partial<GolfPlayer>>(
    doc(playersCollectionRef, id),
    { merge: true },
    {
      onSuccess: () => showNotification({ message: 'Updated profile', color: 'green' }),
      onError: () => showNotification({ message: 'Unable to update profile', color: 'red' }),
    },
  );
};

export const useScorecardsCollectionMutation = () => {
  return useFirestoreCollectionMutation<Partial<GolfScorecard>>(scorecardsCollectionRef, {
    onSuccess: () => showNotification({ message: 'Added scorecard', color: 'green' }),
    onError: () => showNotification({ message: 'Unable to add scorecard', color: 'red' }),
  });
};

export const useScorecardDocumentMutation = (id: string) => {
  return useFirestoreDocumentMutation<Partial<GolfScorecard>>(
    doc(scorecardsCollectionRef, id),
    { merge: true },
    {
      onSuccess: () => showNotification({ message: 'Updated scorecard', color: 'green' }),
      onError: () => showNotification({ message: 'Unable to update scorecard', color: 'red' }),
    },
  );
};
