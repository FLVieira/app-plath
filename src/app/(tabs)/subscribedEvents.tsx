import { useSubscribedEvents } from "@/hooks/useSubscribedEvents";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SubscribedEventsScreen() {
  const { top } = useSafeAreaInsets();
  const { subscribedEvents, isEventInThePast, formatDate } = useSubscribedEvents();

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: top }}>
      <View className="bg-white px-6 py-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900">
          Minhas Inscrições
        </Text>
        <Text className="text-gray-600 mt-1">
          {subscribedEvents.length} {subscribedEvents.length === 1 ? 'evento' : 'eventos'}
        </Text>
      </View>

      {subscribedEvents.length === 0 ? (
        <View className="flex-1 justify-center items-center px-8">
          <Ionicons name="bookmark-outline" size={80} color="#d1d5db" />
          <Text className="text-gray-500 text-xl font-medium mt-6 text-center">
            Nenhuma inscrição ainda
          </Text>
          <Text className="text-gray-400 text-center mt-2 leading-6">
            Explore nossos eventos e faça sua primeira inscrição para começar a participar!
          </Text>
          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-lg mt-8"
            onPress={() => router.push('/')}
          >
            <Text className="text-white font-medium">Ver Eventos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={subscribedEvents}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isInPast = isEventInThePast(item.date);

            return (
              <TouchableOpacity
                className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden p-4"
                onPress={() => router.push(`/event/${item.id}`)}
              >
                {isInPast && (
                  <View className="bg-gray-500 px-3 py-1 rounded mb-3 -mx-4 -mt-4 mb-4">
                    <Text className="text-white text-xs font-medium text-center">
                      EVENTO FINALIZADO
                    </Text>
                  </View>
                )}

                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                    {item.type}
                  </Text>
                  <View className="bg-green-100 px-2 py-1 rounded-full">
                    <Text className="text-green-700 text-xs font-medium">
                      INSCRITO
                    </Text>
                  </View>
                </View>

                <Text
                  className={`text-lg font-bold mb-3 ${isInPast ? 'text-gray-600' : 'text-gray-900'}`}
                  numberOfLines={2}
                >
                  {item.name}
                </Text>

                <View className="flex-row items-center">
                  <Ionicons
                    name="calendar"
                    size={16}
                    color={isInPast ? "#9ca3af" : "#6b7280"}
                  />
                  <Text className={`text-sm ml-2 ${isInPast ? 'text-gray-500' : 'text-gray-600'}`}>
                    {formatDate(item.date)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}