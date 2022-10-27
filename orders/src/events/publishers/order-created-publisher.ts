import {
  Publisher,
  OrderCreatedEvent,
  Subjects
} from '@mthrasher-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
