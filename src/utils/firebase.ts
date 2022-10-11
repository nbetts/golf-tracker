import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import store from './store';
import { showNotification } from '@mantine/notifications';
import { GolfCourse, GolfCourses, GolfPlayer, GolfPlayers } from './types';

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
const golfCoursesCollectionRef = collection(firebaseFirestore, 'golfCourses');
const golfPlayersCollectionRef = collection(firebaseFirestore, 'golfPlayers');

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
          s.golfCourses = {};
          s.golfPlayers = {};
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

export const golfCoursesSnapshotListener = () => {
  return onSnapshot(golfCoursesCollectionRef, (querySnapshot) => {
    const golfCourses: GolfCourses = { ...(store.getRawState().golfCourses || {}) };

    querySnapshot.docChanges().forEach((documentChange) => {
      const { doc } = documentChange;
      golfCourses[doc.id as any] = doc.data() as GolfCourse;
    });

    store.update((s) => {
      s.golfCourses = golfCourses;
    });
  });
};

export const golfPlayersSnapshotListener = () => {
  return onSnapshot(golfPlayersCollectionRef, (querySnapshot) => {
    const golfPlayers: GolfPlayers = { ...(store.getRawState().golfPlayers || {}) };

    querySnapshot.docChanges().forEach((documentChange) => {
      const { doc } = documentChange;
      golfPlayers[doc.id as any] = doc.data() as GolfPlayer;
    });

    store.update((s) => {
      s.golfPlayers = golfPlayers;
    });
  });
};
