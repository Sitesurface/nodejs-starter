import config from '@/config/config';
import admin from 'firebase-admin';

/**
 * Initialise the connection to the Firebase service.
 */
export const firebaseLoader = (): void => {
  const serviceAccount = JSON.parse(config.firebase.serviceAccount as string);

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: config.firebase.storageBucket,
    });
  }
};
