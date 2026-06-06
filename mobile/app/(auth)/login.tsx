import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import { useRouter } from "expo-router"
import { authService } from "../../services/auth"
import { useAuth } from "@/context/auth"

//TODO: refactoring
export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { setUser, setToken } = useAuth()
  const router = useRouter()

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { token, user } = await authService.login(email, password)

      setToken(token)
      setUser(user)

      // Auth guard dans _layout.tsx prend le relais
    } catch (e) {
      setError("Email ou mot de passe incorrect")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>StartupMatch</Text>
      <Text style={styles.subtitle}>Connecte-toi</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Se connecter</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.link}>Pas de compte ? S'inscrire</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#0A84FF",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0A84FF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#0A84FF",
    textAlign: "center",
    fontSize: 14,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
    fontSize: 14,
  },
})