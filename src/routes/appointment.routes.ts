import { Router } from 'express';
import { parseISO } from 'date-fns';

// import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

/**
 * parseISO -> converte string para date nativo do js Date()
 * startOfHour -> pega hora e coloca no comeco dela 13:43:23 => 13:00:00
 */

const appointmentsRouter = Router();

// const appointments: Appointment[] = [];
const appointmentsRepository = new AppointmentsRepository();

// Rotas => receber requisicao, chamar outro arquivo e devolver resposta

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/users', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
