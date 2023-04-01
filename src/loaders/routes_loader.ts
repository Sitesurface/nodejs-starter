import Controller from '@/utils/interfaces/controller_interface';
import express, { Application } from 'express';

/**
 * Initialise the controllers used by the Express application.
 *
 * @param {Controller[]} controllers - An array of controller instances to use.
 * @param {Application} app - Express App
 */
export const routesLoader = (app: Application, controllers: Controller[]): void => {
  for (const controller of controllers) {
    app.use('/api', controller.router); // Registers each controller's router with a base URL.
  }
};
