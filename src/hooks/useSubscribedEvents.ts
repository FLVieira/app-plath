import { useEvents } from "@/contexts/EventsContext";

export function useSubscribedEvents() {
  const { events, subscriptions } = useEvents();

  const subscribedEvents = events.filter(event => subscriptions.includes(event.id));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isEventInThePast = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
  };

  return {
    isEventInThePast,
    formatDate,
    subscribedEvents
  }
}