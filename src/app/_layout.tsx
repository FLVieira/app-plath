import { makeServer } from "@/mock/makeServer";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native/components/ToastManager";
import { EventProvider } from "../contexts/EventsContext";

if (process.env.NODE_ENV !== "production") {
  makeServer();
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <EventProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="event/[id]"
            options={{
              title: "Detalhes do Evento",
              headerStyle: { backgroundColor: "#1f2937" },
              headerTintColor: "#fff"
            }}
          />
        </Stack>
      </EventProvider>
      <ToastManager />
    </SafeAreaProvider>
  );
}