import { getAllEvents, GetAllEventsApiResponse, subscribeToEvent } from "@/services/api/core/events";
import { BasePaginationRequest } from "@/services/api/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Toast } from 'toastify-react-native';

export interface Event {
  id: string;
  name: string;
  date: string;
  type: string;
}

interface EventContextType {
  events: Event[];
  subscriptions: string[];
  subscribeToEvent: (eventId: string) => void;
  unsubscribeToEvent: (eventId: string) => void;
  isSubscribed: (eventId: string) => boolean;
  loading: boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [subscriptions, setEventSubscriptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAllEvents = async (params: BasePaginationRequest) => {
    const listEventsReq = await getAllEvents(params);
    if (listEventsReq.ok) {
      const result = listEventsReq.result as GetAllEventsApiResponse;
      setEvents(result.data);
    } else {
      const error = listEventsReq.result as Error;
      Toast.error(error.message || 'Houve um erro ao buscar os eventos. Por favor, tente novamente mais tarde.');
    }
    setLoading(false);
  };

  const handleSubscribeToEvent = async (eventId: string) => {
    const subscribeToEventReq = await subscribeToEvent(eventId);
    if (subscribeToEventReq.ok) {
      setEventSubscriptions(prev => [...prev, eventId]);
    } else {
      const error = subscribeToEventReq.result as Error;
      Toast.error(error.message || 'Houve um erro ao buscar os eventos. Por favor, tente novamente mais tarde.');
    }
  };

  const unsubscribeToEvent = (eventId: string) => {
    setEventSubscriptions(prev => prev.filter(id => id !== eventId));
  };

  const isSubscribed = (eventId: string) => {
    return subscriptions.includes(eventId);
  };

  useEffect(() => {
    loadAllEvents({ _page: 1, _size: 10 });
  }, []);

  return (
    <EventContext.Provider value={{
      events,
      subscriptions,
      subscribeToEvent: handleSubscribeToEvent,
      unsubscribeToEvent,
      isSubscribed,
      loading,
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents deve ser usado dentro de EventProvider");
  }
  return context;
}