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

//TODO: refactoring and split components
export default function RegisterScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"FOUNDER" | "DEVELOPER">("DEVELOPER")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { setUser, setToken } = useAuth()
  const router = useRouter()

  const handleRegister = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { token, user } = await authService.register({
        name,
        email,
        password,
        role,
      })

      setToken(token)
      setUser(user)

    } catch (e) {
      console.log("❌ Register error:", e) 
      setError("Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Créer un compte</Text>
      <Text style={styles.subtitle}>Rejoins StartupMatch</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Nom complet"
        value={name}
        onChangeText={setName}
      />

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

      {/* Choix du rôle */}
      <Text style={styles.roleLabel}>Tu es :</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === "FOUNDER" && styles.roleButtonActive,
          ]}
          onPress={() => setRole("FOUNDER")}
        >
          <Text style={[
            styles.roleText,
            role === "FOUNDER" && styles.roleTextActive,
          ]}>
            🚀 Fondateur
          </Text>
          <Text style={[
            styles.roleSubtext,
            role === "FOUNDER" && styles.roleTextActive,
          ]}>
            Je cherche un dev
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            role === "DEVELOPER" && styles.roleButtonActive,
          ]}
          onPress={() => setRole("DEVELOPER")}
        >
          <Text style={[
            styles.roleText,
            role === "DEVELOPER" && styles.roleTextActive,
          ]}>
            💻 Développeur
          </Text>
          <Text style={[
            styles.roleSubtext,
            role === "DEVELOPER" && styles.roleTextActive,
          ]}>
            Je cherche un projet
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>S'inscrire</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
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
  roleLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  roleButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    gap: 4,
  },
  roleButtonActive: {
    backgroundColor: "#0A84FF",
    borderColor: "#0A84FF",
  },
  roleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  roleSubtext: {
    fontSize: 12,
    color: "#666",
  },
  roleTextActive: {
    color: "#fff",
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