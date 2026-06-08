import { View, Text, StyleSheet } from "react-native"

interface ComingSoonProps {
  icon: string
  title: string
}

// coming soon screen component
export default function ComingSoon({ icon, title }: ComingSoonProps) {
  return (
    <View style={styles.centered}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Bientôt disponible</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  icon: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 14, color: "#999", marginTop: 8 },
})