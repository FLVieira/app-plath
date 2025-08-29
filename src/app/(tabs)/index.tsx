import { Loading } from "@/components/Loading";
import { useEventsPage } from "@/hooks/useEventsPage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EventsPage() {
  const { top } = useSafeAreaInsets();
  const {
    loading,
    searchQuery,
    setSearchQuery,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredEvents,
    refreshing,
    onRefresh,
    formatDate
  } = useEventsPage();

  if (loading) {
    return (
      <Loading text="Carregando eventos..." />
    );
  }

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: top }}>
      <View className="bg-white px-4 py-4 shadow-sm">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-3">
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            className="flex-1 ml-2 text-gray-700"
            placeholder="Buscar eventos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`px-4 py-2 rounded-full mr-2 ${selectedCategory === item
                ? "bg-blue-500"
                : "bg-gray-200"
                }`}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                className={`text-sm font-medium ${selectedCategory === item
                  ? "text-white"
                  : "text-gray-700"
                  }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-lg shadow-sm mb-4 p-4"
            onPress={() => router.push(`/event/${item.id}`)}
          >
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                {item.type}
              </Text>
              <View className="bg-gray-100 px-2 py-1 rounded">
                <Text className="text-gray-600 text-xs font-medium">
                  EVENTO
                </Text>
              </View>
            </View>

            <Text className="text-lg font-bold text-gray-900 mb-3">
              {item.name}
            </Text>

            <View className="flex-row items-center">
              <Ionicons name="calendar" size={16} color="#6b7280" />
              <Text className="text-sm text-gray-600 ml-2">
                {formatDate(item.date)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="search" size={64} color="#d1d5db" />
            <Text className="text-gray-500 text-lg mt-4">
              Nenhum evento encontrado
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              Tente ajustar os filtros ou termos de busca
            </Text>
          </View>
        )}
      />
    </View>
  );
}