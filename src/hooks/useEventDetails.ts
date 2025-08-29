import { useLocalSearchParams } from "expo-router";
import {
  Alert
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEvents } from "../contexts/EventsContext";

export default function useEventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { events, subscribeToEvent, unsubscribeToEvent, isSubscribed } = useEvents();
  const { bottom } = useSafeAreaInsets();

  const event = events.find(e => e.id === id);

  const isSubscribedToEvent = event ? isSubscribed(event.id) : false;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSubscribe = async () => {
    if (isSubscribedToEvent) {
      Alert.alert(
        "Cancelar Inscrição",
        "Tem certeza que deseja cancelar sua inscrição neste evento?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sim, cancelar",
            style: "destructive",
            onPress: () => {
              unsubscribeToEvent(event.id);
              Alert.alert("Sucesso", "Inscrição cancelada com sucesso!");
            }
          }
        ]
      );
    } else {
      await subscribeToEvent(event.id);
      Alert.alert("Sucesso", "Inscrição realizada com sucesso!");
    }
  };

  return {
    handleSubscribe,
    formatDate,
    bottom,
    event,
    isSubscribedToEvent
  }
}