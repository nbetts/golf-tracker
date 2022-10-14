import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import store from './store';
import { showNotification } from '@mantine/notifications';
import { GolfCourse, GolfPlayer, GolfScorecard } from './types';

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
const firebaseAuth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();

const firebaseFirestore = getFirestore(firebaseApp);
const coursesCollectionRef = collection(firebaseFirestore, 'courses');
const playersCollectionRef = collection(firebaseFirestore, 'players');
const scorecardsCollectionRef = collection(firebaseFirestore, 'scorecards');

export const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleAuthProvider);
export const signOut = () => firebaseAuth.signOut();

export const authStateChangedObserver = () => {
  return onAuthStateChanged(firebaseAuth, async (updatedUser) => {
    const { appLoaded, user } = store.getRawState();

    if (updatedUser !== user) {
      if (updatedUser) {
        store.update((s) => {
          s.user = updatedUser;
        });

        if (appLoaded) {
          showNotification({
            title: 'Signed in',
            message: `Successfully signed in as ${updatedUser.displayName}.`,
            color: 'green',
          });
        }
      } else {
        store.update((s) => {
          s.user = null;
          s.courses = {};
          s.players = {};
        });

        showNotification({ title: 'Signed out', message: 'Successfully signed out.', color: 'green' });
      }
    }

    if (!appLoaded) {
      store.update((s) => {
        s.appLoaded = true;
      });
    }
  });
};

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
