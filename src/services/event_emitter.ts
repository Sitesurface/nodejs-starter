/**
 * A class that implements an event emitter using the eventemitter3 library.
 * @class
 */
import EventEmitter from 'eventemitter3';
import { Service } from 'typedi';

@Service()
class EventService {

  /**
   * The instance of the EventEmitter class used to emit and listen for events.
   * @private
   */
  private eventEmitter = new EventEmitter();

  /**
   * Emits an event with the provided data.
   * @param {string} event - The name of the event to be emitted.
   * @param {any} data - The data to be passed to the event listeners.
   * @returns {void}
   */
  public emit(event: string, data: any): void {
    this.eventEmitter.emit(event, data);
  }

  /**
   * Adds an event listener for the specified event.
   * @param {string} event - The name of the event to listen for.
   * @param {(...args: any[]) => void} fn - The callback function to be executed when the event is emitted.
   * @returns {void}
   */
  public on(event: string, fn: (...args: any[]) => void): void {
    this.eventEmitter.on(event, fn);
  }
}

export default EventService;
