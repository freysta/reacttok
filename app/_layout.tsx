import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { ConceptsProvider } from "@/context/ConceptsContext";

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<ConceptsProvider>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" />
					<Stack.Screen name="details/[id]" options={{ presentation: "modal" }} />
					<Stack.Screen name="profile" />
					<Stack.Screen name="create" options={{ presentation: "modal" }} />
					<Stack.Screen name="quiz-select" />
					<Stack.Screen name="quiz" options={{ presentation: "modal" }} />
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style="light" />
			</ThemeProvider>
		</ConceptsProvider>
	);
}
