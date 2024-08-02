import App from './app';
import { EventsRouter } from './routers/events.router';
import { CheckoutRoutes } from './routers/checkout.router';

const routes = [new EventsRouter(), new CheckoutRoutes()];
const app = new App(routes);

app.listen();

console.log('Application started successfully.');
