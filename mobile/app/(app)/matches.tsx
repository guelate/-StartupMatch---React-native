import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from "react-native"
import { useAuth } from "../context/auth"
import { useMatches } from "@/services/matches"


export default function MatchesScreen() {
    const { isFounder } = useAuth()
    const { data: matches, isLoading, error } = useMatches()

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

    //match null or undifined
    if (!matches?.length) {
        return (
            <View style={styles.centered}>
                <Text style={styles.emptyIcon}>❤️</Text>
                <Text style={styles.emptyTitle}>Aucun match pour l'instant</Text>
                <Text style={styles.emptySubtitle}>
                    {isFounder
                        ? "Acceptez des développeurs pour créer des matchs"
                        : "Likez des missions pour créer des matchs"
                    }
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Mes Matchs</Text>
            <Text style={styles.subtitle}>
                {isFounder
                    ? "Développeurs avec qui vous avez matché"
                    : "Missions avec lesquelles vous avez matché"
                }
            </Text>

            <FlatList
                data={matches}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => (
                    <View style={styles.card}>

                        {isFounder ? (
                            // FOUNDER see devs matched
                            <>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardAvatar}>💻</Text>
                                    <View style={styles.cardInfo}>
                                        <Text style={styles.cardName}>
                                            {item.developer?.name}
                                        </Text>
                                        <Text style={styles.cardRole}>Développeur</Text>
                                    </View>
                                    <View style={styles.matchBadge}>
                                        <Text style={styles.matchBadgeText}>✅ Match</Text>
                                    </View>
                                </View>

                                <Text style={styles.cardBio}>
                                    {item.developer?.bio}
                                </Text>

                                <View style={styles.missionInfo}>
                                    <Text style={styles.missionLabel}>Mission concernée</Text>
                                    <Text style={styles.missionTitle}>
                                        {item.mission?.title}
                                    </Text>
                                </View>

                                <View style={styles.contactInfo}>
                                    <Text style={styles.contactLabel}>
                                        💬 Contact disponible dans la bio du développeur
                                    </Text>
                                </View>
                            </>
                        ) : (
                            // DEVELOPER see missions matched
                            <>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardAvatar}>🚀</Text>
                                    <View style={styles.cardInfo}>
                                        <Text style={styles.cardName}>
                                            {item.mission?.title}
                                        </Text>
                                        <Text style={styles.cardRole}>Mission</Text>
                                    </View>
                                    <View style={styles.matchBadge}>
                                        <Text style={styles.matchBadgeText}>✅ Match</Text>
                                    </View>
                                </View>

                                <Text style={styles.cardBio}>
                                    {item.mission?.description}
                                </Text>

                                <View style={styles.founderInfo}>
                                    <Text style={styles.founderLabel}>Fondateur</Text>
                                    <Text style={styles.founderName}>
                                        {item.founder?.name}
                                    </Text>
                                </View>

                                <View style={styles.contactInfo}>
                                    <Text style={styles.contactLabel}>
                                        💬 Contactez le fondateur via votre bio
                                    </Text>
                                </View>
                            </>
                        )}

                    </View>
                )}
            />

        </View>
    )
}
//TODO: make styles in other file 
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
        marginBottom: 12,
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
        marginBottom: 12,
    },
    matchBadge: {
        backgroundColor: "#E8F5E9",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    matchBadgeText: {
        fontSize: 12,
        color: "#1a7a3c",
        fontWeight: "bold",
    },
    missionInfo: {
        backgroundColor: "#F0F7FF",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    missionLabel: {
        fontSize: 11,
        color: "#0A84FF",
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 4,
    },
    missionTitle: {
        fontSize: 14,
        color: "#333",
        fontWeight: "600",
    },
    founderInfo: {
        backgroundColor: "#F0F7FF",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    founderLabel: {
        fontSize: 11,
        color: "#0A84FF",
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 4,
    },
    founderName: {
        fontSize: 14,
        color: "#333",
        fontWeight: "600",
    },
    contactInfo: {
        backgroundColor: "#FFF3E0",
        padding: 12,
        borderRadius: 8,
    },
    contactLabel: {
        fontSize: 13,
        color: "#CC5500",
        lineHeight: 18,
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