import { Timestamp } from 'firebase/firestore';

export const getTimestampDate = (timestamp: Timestamp) => new Date(timestamp.seconds * 1000).toLocaleDateString();
