import { GetAllEventsApiResponse } from "@/services/api/core/events";
import { Event } from "@/types";
import { Response, Server } from 'miragejs';

export const fakeEventsList: Event[] = [
  {
    id: 'event_1',
    name: 'Tech Conference 2025',
    date: '2025-09-01',
    type: 'Conference'
  },
  {
    id: 'event_2',
    name: 'Summer Music Festival',
    date: '2025-10-15',
    type: 'Festival'
  },
  {
    id: 'event_3',
    name: 'Art Workshop',
    date: '2025-11-20',
    type: 'Workshop'
  },
  {
    id: 'event_4',
    name: 'AI Summit',
    date: '2025-12-05',
    type: 'Conference'
  },
  {
    id: 'event_5',
    name: 'Food Festival',
    date: '2026-01-10',
    type: 'Festival'
  },
  {
    id: 'event_6',
    name: 'Coding Bootcamp',
    date: '2026-02-15',
    type: 'Workshop'
  },
  {
    id: 'event_7',
    name: 'Blockchain Expo',
    date: '2026-03-22',
    type: 'Conference'
  },
  {
    id: 'event_8',
    name: 'Jazz Night',
    date: '2026-04-18',
    type: 'Festival'
  },
  {
    id: 'event_9',
    name: 'Photography Workshop',
    date: '2026-05-12',
    type: 'Workshop'
  },
  {
    id: 'event_10',
    name: 'Startup Pitch Event',
    date: '2026-06-25',
    type: 'Conference'
  }
];

export const mockEventsRoutes = (server: Server) => {
  server.get('/events', (_, request) => {
    const page = request.queryParams._page ? parseInt(request.queryParams._page as string) : 1;
    const pageSize = request.queryParams._size ? parseInt(request.queryParams._size as string) : 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedEvents = fakeEventsList.slice(startIndex, endIndex);

    const response: GetAllEventsApiResponse = {
      data: paginatedEvents,
      currentPage: page,
      totalItems: fakeEventsList.length,
      totalPages: Math.ceil(fakeEventsList.length / pageSize),
    };

    return new Response(200, {}, response);
  });

  server.put('/events/:id/subscribe', (_, request) => {
    return new Response(200, {});
  });
};
