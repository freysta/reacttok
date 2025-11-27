import FeedItem from "@/components/FeedItem";
import Logo from "@/components/Logo";
import { CONCEPTS } from "@/data/concepts";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Constants from "expo-constants"; // Adicionado para altura da barra de status
import React from "react";
import {
	FlatList,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function FeedScreen() {
	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			<View style={styles.headerOverlay}>
				<View style={styles.logoContainer}>
					<Logo />
				</View>

				<View style={styles.tabContainer}>
					<Text style={styles.tabText}>Para Você</Text>
					<View style={styles.activeIndicator} />
				</View>

				        <Link href="/profile" asChild>
				          <TouchableOpacity style={styles.savedButton}>
				            <Ionicons name="person-circle-outline" size={32} color="white" />
				          </TouchableOpacity>
				        </Link>			</View>

			<FlatList
				data={CONCEPTS}
				renderItem={({ item }) => <FeedItem item={item} />}
				keyExtractor={(item) => item.id}
				pagingEnabled
				showsVerticalScrollIndicator={false}
				snapToAlignment="start"
				decelerationRate="fast"
				initialNumToRender={1}
				maxToRenderPerBatch={2}
				windowSize={3}
				style={styles.list}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	list: {
		flex: 1,
	},
	headerOverlay: {
		position: "absolute",
		top: 0, // Inicia do topo absoluto
		left: 0,
		right: 0,
		paddingTop: Constants.statusBarHeight + 20, // Padding abaixo da barra de status
		height: (Constants.statusBarHeight || 0) + 20 + 50, // Altura total (status bar + padding + altura do conteúdo)
		zIndex: 10,
		flexDirection: "row",
		justifyContent: "center", // Centra o texto "Para Você"
		alignItems: "center", // Centra verticalmente todos os itens (logo, texto, botão)
	},
	logoContainer: {
		position: "absolute",
		left: 20, // Standard spacing
		// Removed 'top' to let alignItems handle vertical centering
	},
	tabContainer: {
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
	},
	tabText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 17, // Slightly larger for legibility
		textShadowColor: "rgba(0,0,0,0.5)",
		textShadowRadius: 4,
	},
	activeIndicator: {
		width: 30,
		height: 3, // Slightly thicker
		backgroundColor: "white",
		marginTop: 4,
		borderRadius: 2,
	},
  savedButton: {
    position: 'absolute',
    right: 16, // Matches logo left spacing (20 was slightly off visually with 32px icon)
    padding: 0, // Remove padding to let icon size dictate layout
  }});
