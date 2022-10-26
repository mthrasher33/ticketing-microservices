import {
  Publisher,
  Subjects,
  TicketUpdatedEvent
} from '@mthrasher-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
