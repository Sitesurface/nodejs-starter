import i18next from 'i18next';
import i18nextFsBackend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import { Application } from 'express';

/**
 * Initialise the i18next localization middleware used by the Express application.
 * @param {Application} app - Express App
 */
export const localeLoader = (app: Application): void => {
  i18next
    .use(i18nextFsBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      backend: {
        loadPath: __dirname + '/locales/{{lng}}/translations.json',
      },
      fallbackLng: 'en',
    });
  app.use(i18nextMiddleware.handle(i18next));
};
