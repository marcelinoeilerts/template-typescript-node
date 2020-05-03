import { Router } from 'express';

import appointmentsRouter from './appointment.routes';

const routes = Router();

// routes.get('/', (request, response) =>
//   response.json({ message: 'Hello World 2' }),
// );

routes.use('/appointments', appointmentsRouter);

export default routes;
