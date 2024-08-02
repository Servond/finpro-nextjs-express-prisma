import App from './app';
import { EventsRouter } from './routers/events.router';
import { CheckoutRoutes } from './routers/checkout.router';

const routes = [new EventsRouter(), new CheckoutRoutes()];

const main = () => {
  const app = new App(routes);
  app.listen();
};

main();

console.log('Application started successfully.');
