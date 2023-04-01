import { Service } from 'typedi';
import Agenda from 'agenda';
import config from '@/config/config';
import Logger from '../logger_service';

/**
 * A class that encapsulates common functions for working with the `Agenda` job scheduler.
 */
@Service()
class JobScheduler {
  public agenda: Agenda;

  /**
   * Creates a new `JobScheduler` instance with the specified configuration.
   */
  constructor() {
    this.agenda = new Agenda({
      db: {
        address: `mongodb+srv://${config.database.user}:${config.database.password}@${config.database.path}/${config.database.dbName}?retryWrites=true&w=majority`,
      },
      processEvery: config.jobs.processEvery,
    });

    // listen for the ready or error event.
    this.agenda
      .on('ready', () => {
        Logger.info('Agenda started!');
        this.loadJobs();
      })
      .on('error', () => Logger.error('Agenda connection error!'));
  }

  private async loadJobs(): Promise<void> {
    const jobTypes = config.jobs.jobTypes ? config.jobs.jobTypes.split(',') : [];
    jobTypes.forEach(type => {
      require('../../jobs/' + type)(this.agenda);
    });
    if (jobTypes.length) {
      await this.agenda.start(); // Returns a promise, which should be handled appropriately
    }
  }
}

export default JobScheduler;
