import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
  } from "react-native"
  import { usePendingSwipes, useRespondToSwipe } from "../../services/swipes"
import { useAuth } from "@/context/auth"
  

//TODO: refactoring
  export default function PendingScreen() {
    const { isFounder } = useAuth()
    const { data: pendingSwipes, isLoading, error } = usePendingSwipes()
    const { mutate: respondToSwipe } = useRespondToSwipe()
  
    const handleAccept = (swipeId: string, type: "mission" | "profile") => {
      respondToSwipe({ swipeId, status: "ACCEPTED", type })
    }
  
    const handleReject = (swipeId: string, type: "mission" | "profile") => {
      respondToSwipe({ swipeId, status: "REJECTED", type })
    }
  
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0A84FF" />
        </View>
      )
    }
  
    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={styles.error}>Une erreur est survenue</Text>
        </View>
      )
    }
  
    if (!pendingSwipes?.length) {
      return (
        <View style={styles.centered}>
          <Text style={styles.emptyIcon}>⏳</Text>
          <Text style={styles.emptyTitle}>Aucun like en attente</Text>
          <Text style={styles.emptySubtitle}>
            {isFounder
              ? "Les développeurs qui likent vos missions apparaîtront ici"
              : "Les fondateurs qui likent votre profil apparaîtront ici"
            }
          </Text>
        </View>
      )
    }
  
    return (
      <View style={styles.container}>
  
        <Text style={styles.title}>En attente</Text>
        <Text style={styles.subtitle}>
          {isFounder
            ? "Développeurs qui ont liké vos missions"
            : "Fondateurs qui ont liké votre profil"
          }
        </Text>
  
        <FlatList
          data={pendingSwipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
  
              {isFounder ? (
                // FOUNDER voit les devs qui ont liké ses missions
                <>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardAvatar}>💻</Text>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardName}>{item.developer?.name}</Text>
                      <Text style={styles.cardRole}>Développeur</Text>
                    </View>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>⏳ En attente</Text>
                    </View>
                  </View>
                  <Text style={styles.cardBio}>{item.developer?.bio}</Text>
  
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.rejectButton]}
                      onPress={() => handleReject(item.id, "mission")}
                    >
                      <Text style={styles.rejectText}>❌ Refuser</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.acceptButton]}
                      onPress={() => handleAccept(item.id, "mission")}
                    >
                      <Text style={styles.acceptText}>✅ Accepter</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                // DEVELOPER voit les fondateurs qui ont liké son profil
                <>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardAvatar}>🚀</Text>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardName}>{item.founder?.name}</Text>
                      <Text style={styles.cardRole}>Fondateur</Text>
                    </View>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>⏳ En attente</Text>
                    </View>
                  </View>
                  <Text style={styles.cardBio}>{item.mission?.title}</Text>
                  <Text style={styles.cardDescription}>
                    {item.mission?.description}
                  </Text>
  
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.rejectButton]}
                      onPress={() => handleReject(item.id, "profile")}
                    >
                      <Text style={styles.rejectText}>❌ Refuser</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.acceptButton]}
                      onPress={() => handleAccept(item.id, "profile")}
                    >
                      <Text style={styles.acceptText}>✅ Accepter</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
  
            </View>
          )}
        />
  
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 24,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#0A84FF",
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: "#666",
      marginBottom: 24,
    },
    list: {
      paddingBottom: 24,
    },
    card: {
      backgroundColor: "#F9F9F9",
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: "#eee",
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 8,
    },
    cardAvatar: {
      fontSize: 32,
    },
    cardInfo: {
      flex: 1,
    },
    cardName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
    cardRole: {
      fontSize: 12,
      color: "#666",
    },
    cardBio: {
      fontSize: 14,
      color: "#555",
      lineHeight: 20,
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 13,
      color: "#888",
      lineHeight: 18,
      marginBottom: 12,
    },
    badge: {
      backgroundColor: "#FFF3E0",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    badgeText: {
      fontSize: 12,
      color: "#CC5500",
    },
    actions: {
      flexDirection: "row",
      gap: 12,
      marginTop: 12,
    },
    actionButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    acceptButton: {
      backgroundColor: "#E8F5E9",
    },
    rejectButton: {
      backgroundColor: "#FFEBEE",
    },
    acceptText: {
      color: "#1a7a3c",
      fontWeight: "bold",
      fontSize: 14,
    },
    rejectText: {
      color: "#CC0000",
      fontWeight: "bold",
      fontSize: 14,
    },
    separator: {
      height: 12,
    },
    emptyIcon: {
      fontSize: 48,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      color: "#666",
      textAlign: "center",
      lineHeight: 20,
    },
    error: {
      fontSize: 14,
      color: "red",
    },
  })