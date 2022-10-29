import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { TicketUpdatedEvent } from '@mthrasher-tickets/common';

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);
  const id = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    id: id,
    title: 'concert',
    price: 20
  });
  await ticket.save();

  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'concert',
    price: 999,
    userId: ' dfjkl'
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { msg, data, ticket, listener };
};

it('finds, updates, and saves a ticket', async () => {
  const { msg, data, ticket, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it('ackts the message', async () => {
  const { msg, data, listener, ticket } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
