import { Router, request } from 'express';
import { startOfHour, parseISO } from 'date-fns';

// import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * parseISO -> converte string para date nativo do js Date()
 * startOfHour -> pega hora e coloca no comeco dela 13:43:23 => 13:00:00
 */

const appointmentsRouter = Router();

// const appointments: Appointment[] = [];
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/users', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  // const appointment = new Appointment(provider, parsedDate);

  // appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
