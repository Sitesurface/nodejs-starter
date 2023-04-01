import { Router } from 'express';

/**
 * Represents a controller for a specific resource, including its base path and router.
 */
interface Controller {
  /** The base path for the resource */
  path: string;
  /** The router that handles requests for the resource */
  router: Router;
}

export default Controller;
