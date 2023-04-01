import express, { Application } from 'express';

import Controller from '@/utils/interfaces/controller_interface';
import Logger from './services/logger_service';
import Loaders from '@/loaders/loaders';

class App {
  public express: Application;
  public port: number;

  /**
   * Creates an instance of App.
   *
   * @param {Controller[]} controllers - An array of controller instances to use.
   * @param {number} port - The port number to listen on.
   *
   * @memberOf App
   */
  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;
    Loaders.init(this.express, controllers);
  }
  /**
   * Start listening on the port for incoming requests
   *
   * @memberOf App
   */
  public listen(): void {
    this.express.listen(this.port, () => {
      Logger.info(`Listening on port ${this.port}`);
    });
  }
}

export default App;
