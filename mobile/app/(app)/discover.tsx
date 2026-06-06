import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
} from "react-native"
import { useState } from "react"
import { useMissions } from "../../services/missions"
import { useProfiles } from "../../services/profiles"
import { useSwipeMission, useSwipeProfile } from "../../services/swipes"
import { useAuth } from "../context/auth"

const { width } = Dimensions.get("window")

//TODO: refactoring 


export default function DiscoverScreen() {
    // Get current user role to display correct feed
    const { isFounder } = useAuth()

    // Track which card is currently displayed
    const [currentIndex, setCurrentIndex] = useState(0)

    // DEVELOPER → fetch missions feed
    const {
        data: missions,
        isLoading: missionsLoading,
        error: missionsError,
    } = useMissions()

    // FOUNDER → fetch developer profiles feed
    const {
        data: profiles,
        isLoading: profilesLoading,
        error: profilesError,
    } = useProfiles()

    // Swipe mutations
    const { mutate: swipeMission } = useSwipeMission()
    const { mutate: swipeProfile } = useSwipeProfile()

    // Display correct data based on user role
    const data = isFounder ? profiles : missions
    const isLoading = isFounder ? profilesLoading : missionsLoading
    const error = isFounder ? profilesError : missionsError

    // Current card to display
    const currentItem = data?.[currentIndex]

    // Handle swipe action — LIKE or DISLIKE
    const handleSwipe = (direction: "LIKE" | "DISLIKE") => {
        if (!currentItem) return

        if (isFounder) {
            // FOUNDER swipes a developer profile
            swipeProfile({
                developerId: currentItem.id,
                direction,
            })
        } else {
            // DEVELOPER swipes a mission
            swipeMission({
                missionId: currentItem.id,
                direction,
            })
        }

        // Move to next card
        setCurrentIndex((prev) => prev + 1)
    }

    // Loading state
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0A84FF" />
            </View>
        )
    }

    // Error state
    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.error}>Une erreur est survenue</Text>
            </View>
        )
    }

    // Empty state — no more cards to display
    if (!currentItem) {
        return (
            <View style={styles.centered}>
                <Text style={styles.emptyIcon}>🎉</Text>
                <Text style={styles.emptyTitle}>Plus rien à découvrir !</Text>
                <Text style={styles.emptySubtitle}>
                    {isFounder
                        ? "Vous avez vu tous les profils disponibles"
                        : "Vous avez vu toutes les missions disponibles"
                    }
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Découvrir</Text>
            <Text style={styles.subtitle}>
                {isFounder
                    ? "Swipe les profils développeurs"
                    : "Swipe les missions"
                }
            </Text>

            {/* Current swipe card */}
            <View style={styles.card}>

                <Text style={styles.cardAvatar}>
                    {isFounder ? "💻" : "🚀"}
                </Text>

                {isFounder ? (
                    // FOUNDER sees a developer profile
                    <>
                        <Text style={styles.cardName}>{currentItem.name}</Text>
                        <Text style={styles.cardRole}>Développeur</Text>
                        <View style={styles.divider} />
                        <Text style={styles.cardBioLabel}>À propos</Text>
                        <Text style={styles.cardBio}>{currentItem.bio}</Text>
                    </>
                ) : (
                    // DEVELOPER sees a mission
                    <>
                        <Text style={styles.cardName}>{currentItem.title}</Text>
                        <Text style={styles.cardRole}>Mission</Text>
                        <View style={styles.divider} />
                        <Text style={styles.cardBioLabel}>Description</Text>
                        <Text style={styles.cardBio}>{currentItem.description}</Text>
                    </>
                )}

                {/* Card counter */}
                <Text style={styles.counter}>
                    {currentIndex + 1} / {data?.length}
                </Text>

            </View>

            {/* Swipe action buttons */}
            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.dislikeButton]}
                    onPress={() => handleSwipe("DISLIKE")}
                >
                    <Text style={styles.actionIcon}>❌</Text>
                    <Text style={styles.dislikeText}>Passer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.likeButton]}
                    onPress={() => handleSwipe("LIKE")}
                >
                    <Text style={styles.actionIcon}>❤️</Text>
                    <Text style={styles.likeText}>Liker</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

// TODO: move styles to separate file
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
    card: {
        backgroundColor: "#F9F9F9",
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: "#eee",
        alignItems: "center",
        width: width - 48,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    cardAvatar: {
        fontSize: 64,
        marginBottom: 16,
    },
    cardName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 4,
    },
    cardRole: {
        fontSize: 14,
        color: "#0A84FF",
        fontWeight: "600",
        marginBottom: 16,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#eee",
        marginBottom: 16,
    },
    cardBioLabel: {
        fontSize: 12,
        color: "#999",
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginBottom: 8,
        textTransform: "uppercase",
    },
    cardBio: {
        fontSize: 14,
        color: "#555",
        lineHeight: 22,
        textAlign: "center",
    },
    counter: {
        fontSize: 12,
        color: "#999",
        marginTop: 16,
    },
    actions: {
        flexDirection: "row",
        gap: 24,
        marginTop: 32,
        justifyContent: "center",
    },
    actionButton: {
        width: 120,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        gap: 4,
    },
    dislikeButton: {
        backgroundColor: "#FFEBEE",
    },
    likeButton: {
        backgroundColor: "#E8F5E9",
    },
    actionIcon: {
        fontSize: 24,
    },
    dislikeText: {
        color: "#CC0000",
        fontWeight: "bold",
        fontSize: 14,
    },
    likeText: {
        color: "#1a7a3c",
        fontWeight: "bold",
        fontSize: 14,
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