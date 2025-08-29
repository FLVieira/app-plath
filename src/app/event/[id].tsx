import useEventDetails from "@/hooks/useEventDetails";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function EventDetailPage() {
  const {
    handleSubscribe,
    formatDate,
    bottom,
    event,
    isSubscribedToEvent
  } = useEventDetails()

  if (!event) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500 text-lg">Evento não encontrado</Text>
        <TouchableOpacity
          className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white font-medium">Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <Text className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full self-start mb-4">
            {event.type}
          </Text>

          <Text className="text-2xl font-bold text-gray-900 mb-6 leading-8">
            {event.name}
          </Text>

          <View className="bg-gray-50 rounded-lg p-4 mb-6">
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-3 rounded-full mr-4">
                <Ionicons name="calendar" size={24} color="#3b82f6" />
              </View>
              <View>
                <Text className="text-gray-900 font-semibold text-base">
                  {formatDate(event.date)}
                </Text>
                <Text className="text-gray-600 text-sm mt-1">
                  Data do evento
                </Text>
              </View>
            </View>
          </View>

          {isSubscribedToEvent && (
            <View className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                <Text className="text-green-800 font-medium ml-3">
                  Você está inscrito neste evento!
                </Text>
              </View>
            </View>
          )}

          <View className="bg-blue-50 rounded-lg p-4 mb-8">
            <View className="flex-row items-center mb-2">
              <Ionicons name="information-circle" size={20} color="#3b82f6" />
              <Text className="text-blue-800 font-medium ml-2">
                Informações do Evento
              </Text>
            </View>
            <Text className="text-blue-700 text-sm leading-5">
              Este é um evento do tipo "{event.type}". Para mais informações e detalhes específicos,
              entre em contato com a organização do evento.
            </Text>
          </View>

          <View style={{ height: 80 }} />
        </View>
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4"
        style={{ paddingBottom: bottom + 16 }}
      >
        <TouchableOpacity
          className={`rounded-lg py-4 ${isSubscribedToEvent ? "bg-red-500" : "bg-blue-500"}`}
          onPress={handleSubscribe}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {isSubscribedToEvent ? "Cancelar Inscrição" : "Inscrever-se"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}