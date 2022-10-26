import {
  Publisher,
  Subjects,
  TicketCreatedEvent
} from '@mthrasher-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
