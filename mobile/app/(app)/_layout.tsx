import { Tabs } from "expo-router"
import { Text } from "react-native"

// Defines the bottom tab navigator
export default function AppLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#0A84FF",
      tabBarInactiveTintColor: "#999",
      tabBarStyle: { backgroundColor: "#fff" },
    }}>
      <Tabs.Screen
        name="pending"
        options={{
          title: "En attente",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⏳</Text>,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Découvrir",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🔍</Text>,
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: "Matchs",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>❤️</Text>,
        }}
      />
    </Tabs>
  )
}