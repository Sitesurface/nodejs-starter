import { mongooseLoader } from './mongoose_loader';
import { firebaseLoader } from './firebase_loader';
import { localeLoader } from './locale_loader';
import { Application } from 'express';
import { routesLoader } from './routes_loader';
import Controller from '@/utils/interfaces/controller_interface';

class Loaders {
  static async init(app: Application, controllers: Controller[]) {
    // Connect to mongoose
    mongooseLoader();

    // Connect to firebase
    firebaseLoader();

    // Load Locales
    localeLoader(app);

    // Load api routes
    routesLoader(app, controllers);
  }
}

export default Loaders;
