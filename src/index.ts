import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config/config'; // Validating and loading environment variables
import App from './app';
import UserController from '@/resources/user/user.controller';

// Create a new instance of the application
const app = new App([new UserController()], Number(config.port));

// Start the server and listen for incoming requests
app.listen();
