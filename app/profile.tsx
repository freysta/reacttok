import BottomTabBar from "@/components/BottomTabBar";
import Toast from "@/components/Toast";
import { Colors } from "@/constants/theme";
import { useConcepts } from "@/context/ConceptsContext";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useMyContent } from "@/hooks/useMyContent";
import { useToast } from "@/hooks/useToast";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
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
	const { concepts } = useConcepts();
	const { myContent, refreshMyContent } = useMyContent();
	const { toast, showToast, hideToast } = useToast();
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<"bookmarks" | "mycontent">(
		"bookmarks"
	);

	useFocusEffect(
		useCallback(() => {
			refreshBookmarks();
			refreshMyContent();
		}, [])
	);

	const savedConcepts = concepts.filter((c) => bookmarks.includes(c.id));
	const myContentSaved = myContent.filter((c) => bookmarks.includes(c.id));
	const allSavedConcepts = [...savedConcepts, ...myContentSaved];
	const displayData = activeTab === "bookmarks" ? allSavedConcepts : myContent;

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
						resizeMode="contain"
					/>
				</View>
				<Text style={styles.username}>@dev.reacttok</Text>
				<View style={styles.statsContainer}>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>{concepts.length}</Text>
						<Text style={styles.statLabel}>Conceitos</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>{bookmarks.length}</Text>
						<Text style={styles.statLabel}>Salvos</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>{myContent.length}</Text>
						<Text style={styles.statLabel}>Criados</Text>
					</View>
				</View>
				<TouchableOpacity
					style={styles.editButton}
					onPress={() => router.push("/create")}
				>
					<Text style={styles.editButtonText}>Criar Conceito</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.tabs}>
				<TouchableOpacity
					style={[styles.tab, activeTab === "bookmarks" && styles.activeTab]}
					onPress={() => setActiveTab("bookmarks")}
				>
					<Ionicons
						name="bookmark"
						size={24}
						color={activeTab === "bookmarks" ? "white" : "#666"}
					/>
					{activeTab === "bookmarks" && <View style={styles.activeIndicator} />}
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, activeTab === "mycontent" && styles.activeTab]}
					onPress={() => setActiveTab("mycontent")}
				>
					<Ionicons
						name="create"
						size={24}
						color={activeTab === "mycontent" ? "white" : "#666"}
					/>
					{activeTab === "mycontent" && <View style={styles.activeIndicator} />}
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />

			<FlatList
				data={displayData}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={renderHeader}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() => router.push(`/details/${item.id}`)}
					>
						<View
							style={[
								styles.itemIcon,
								activeTab === "mycontent" && styles.myContentIcon,
							]}
						>
							<Ionicons
								name={activeTab === "mycontent" ? "create" : "code-slash"}
								size={20}
								color={
									activeTab === "mycontent" ? "#ffd700" : Colors.tiktok.accent
								}
							/>
						</View>
						<View style={styles.itemContent}>
							<Text style={styles.itemTitle}>{item.title}</Text>
							<Text style={styles.itemDesc} numberOfLines={1}>
								{item.desc}
							</Text>
							{activeTab === "mycontent" && (
								<Text style={styles.createdDate}>
									Criado em{" "}
									{new Date(item.createdAt || "").toLocaleDateString()}
								</Text>
							)}
						</View>
						<Ionicons name="chevron-forward" size={20} color="#666" />
					</TouchableOpacity>
				)}
				ListEmptyComponent={
					<View style={styles.emptyState}>
						<Text style={styles.emptyText}>
							{activeTab === "bookmarks"
								? "Você ainda não salvou nada."
								: "Você ainda não criou nenhum conceito."}
						</Text>
					</View>
				}
				contentContainerStyle={styles.listContent}
			/>

			<Toast
				message={toast.message}
				type={toast.type}
				visible={toast.visible}
				onHide={hideToast}
			/>

			<BottomTabBar />
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
		paddingTop: 10,
		paddingBottom: 10,
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
		borderColor: "#333",
		backgroundColor: "#1e1e1e",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 12,
		overflow: "hidden",
	},
	avatar: {
		width: 60,
		height: 60,
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
	myContentIcon: {
		backgroundColor: "rgba(255, 215, 0, 0.1)",
	},
	createdDate: {
		color: "#666",
		fontSize: 11,
		marginTop: 2,
	},
	tabs: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#333",
		marginTop: 10,
	},
	tab: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 12,
	},
	activeTab: {
		// Styles for active tab
	},
	activeIndicator: {
		position: "absolute",
		bottom: 0,
		width: 40,
		height: 2,
		backgroundColor: "white",
	},
	listContent: {
		paddingBottom: 0,
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
