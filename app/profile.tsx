import { Colors } from "@/constants/theme";
import { CONCEPTS } from "@/data/concepts";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import Constants from "expo-constants"; // Adicionado para altura da barra de status
import React, { useCallback } from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function ProfileScreen() {
	const { bookmarks, refreshBookmarks } = useBookmarks();
	const router = useRouter();

	useFocusEffect(
		useCallback(() => {
			refreshBookmarks();
		}, [])
	);

	const savedConcepts = CONCEPTS.filter((c) => bookmarks.includes(c.id));

	const renderHeader = () => (
		<View style={styles.headerContainer}>
			<View style={styles.navBar}>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={24} color="white" />
				</TouchableOpacity>
				<Text style={styles.navTitle}>Perfil</Text>
				<View style={{ width: 24 }} />
			</View>

			<View style={styles.profileInfo}>
				<View style={styles.avatarContainer}>
					<Image
						source={require("@/assets/images/react-logo.png")}
						style={styles.avatar}
					/>
				</View>
				<Text style={styles.username}>@aluno.react</Text>
				<View style={styles.statsContainer}>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>142</Text>
						<Text style={styles.statLabel}>Seguindo</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>10k</Text>
						<Text style={styles.statLabel}>Seguidores</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>530</Text>
						<Text style={styles.statLabel}>Curtidas</Text>
					</View>
				</View>
				<TouchableOpacity style={styles.editButton}>
					<Text style={styles.editButtonText}>Editar Perfil</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.tabs}>
				<View style={styles.activeTab}>
					<Ionicons name="bookmark" size={24} color="white" />
					<View style={styles.activeIndicator} />
				</View>
				<View style={styles.inactiveTab}>
					<Ionicons name="heart-outline" size={24} color="#666" />
				</View>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />

			<FlatList
				data={savedConcepts}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={renderHeader}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() => router.push(`/details/${item.id}`)}
					>
						<View style={styles.itemIcon}>
							<Ionicons
								name="code-slash"
								size={20}
								color={Colors.tiktok.accent}
							/>
						</View>
						<View style={styles.itemContent}>
							<Text style={styles.itemTitle}>{item.title}</Text>
							<Text style={styles.itemDesc} numberOfLines={1}>
								{item.desc}
							</Text>
						</View>
						<Ionicons name="chevron-forward" size={20} color="#666" />
					</TouchableOpacity>
				)}
				ListEmptyComponent={
					<View style={styles.emptyState}>
						<Text style={styles.emptyText}>Você ainda não salvou nada.</Text>
					</View>
				}
				contentContainerStyle={styles.listContent}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#121212",
	},
	headerContainer: {
		paddingBottom: 10,
	},
	navBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: Constants.statusBarHeight + 20, // Ajustado para incluir a altura da barra de status + 20px
		paddingBottom: 20,
	},
	navTitle: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	profileInfo: {
		alignItems: "center",
		marginBottom: 20,
	},
	avatarContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: "#333", // Slightly lighter border
		backgroundColor: "#1e1e1e", // Dark gray background for avatar
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 12,
		overflow: "hidden", // Clip image to circle
	},
	avatar: {
		width: 60,
		height: 60,
		resizeMode: "contain",
	},
	username: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 16,
	},
	statsContainer: {
		flexDirection: "row",
		gap: 24,
		marginBottom: 20,
	},
	statItem: {
		alignItems: "center",
	},
	statNumber: {
		color: "white",
		fontWeight: "bold",
		fontSize: 18,
	},
	statLabel: {
		color: "#888",
		fontSize: 12,
	},
	editButton: {
		borderWidth: 1,
		borderColor: "#444",
		paddingVertical: 8,
		paddingHorizontal: 24,
		borderRadius: 4,
	},
	editButtonText: {
		color: "white",
		fontWeight: "600",
	},
	tabs: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#333",
		marginTop: 10,
	},
	activeTab: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 12,
	},
	inactiveTab: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 12,
	},
	activeIndicator: {
		position: "absolute",
		bottom: 0,
		width: 40,
		height: 2,
		backgroundColor: "white",
	},
	listContent: {
		paddingBottom: 40,
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#1e1e1e",
	},
	itemIcon: {
		width: 40,
		height: 40,
		backgroundColor: "rgba(255, 45, 85, 0.1)",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},
	itemContent: {
		flex: 1,
	},
	itemTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 2,
	},
	itemDesc: {
		color: "#888",
		fontSize: 13,
	},
	emptyState: {
		padding: 40,
		alignItems: "center",
	},
	emptyText: {
		color: "#666",
	},
});
