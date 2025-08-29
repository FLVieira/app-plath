import { ActivityIndicator, Text, View } from "react-native";

interface Props {
  text: string
}

export function Loading({ text }: Props) {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text className="mt-4 text-gray-600">{text}</Text>
    </View>
  )
}