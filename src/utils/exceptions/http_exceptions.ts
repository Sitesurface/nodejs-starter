import Locales from '@/constants/locale_constants';

/**
 * Represents an HTTP exception with an optional status code and message.
 */
class HttpException extends Error {
  /** The status code for the HTTP exception */
  public status: number;
  /** The message associated with the HTTP exception */
  public message: string;

  /**
   * Creates a new HTTP exception.
   * @param status The HTTP status code for the exception. Default is 500 (Internal Server Error).
   * @param message The message associated with the exception. Default is a generic error message.
   */
  constructor(status?: number, message?: string) {
    super(message);
    this.status = status || 500;
    this.message = message || Locales.somethingWentWrong;
  }
}

export default HttpException;
