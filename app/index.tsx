import FeedItem from "@/components/FeedItem";
import Logo from "@/components/Logo";
import { CONCEPTS } from "@/data/concepts";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Constants from "expo-constants";
import React, { useMemo } from "react";
import {
	FlatList,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useConcepts } from "@/context/ConceptsContext"; // Import Context

export default function FeedScreen() {
  const { concepts } = useConcepts(); // Use dynamic concepts

  // Multiplica a lista dinâmica para simular loop infinito
  const infiniteData = useMemo(() => {
    if (concepts.length === 0) return [];
    const multiplied = [];
    // Reduzi para 20 repetições para performance ao adicionar itens
    for (let i = 0; i < 20; i++) {
      multiplied.push(...concepts);
    }
    return multiplied;
  }, [concepts]); // Re-calcula quando concepts mudar

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			<View style={styles.headerOverlay}>
        {/* ... Header Code ... */}
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
				</Link>
			</View>

			<FlatList
				data={infiniteData}
				renderItem={({ item }) => <FeedItem item={item} />}
				keyExtractor={(item, index) => `${item.id}-${index}`}
				pagingEnabled
				showsVerticalScrollIndicator={false}
				snapToAlignment="start"
				decelerationRate="fast"
				initialNumToRender={1}
				maxToRenderPerBatch={2}
				windowSize={3}
				style={styles.list}
			/>
      
      {/* Create Button (FAB) */}
      <Link href="/create" asChild>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={30} color="black" />
        </TouchableOpacity>
      </Link>
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
    right: 16,
    padding: 0, 
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white', // TikTok style add button
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.5)',
    zIndex: 20,
  }
});
