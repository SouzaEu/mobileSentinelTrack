"use client";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export function HelpScreen() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 16 },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.foreground,
      marginBottom: 16,
    },
    card: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
    },
    text: { color: colors.mutedForeground, marginBottom: 12 },
    link: { color: colors.primary, fontWeight: "600" },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajuda</Text>
      <View style={styles.card}>
        <Text style={styles.text}>
          Consulte a documentação e entre em contato com o suporte.
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://sentineltrack.docs")}
        >
          <Text style={styles.link}>Abrir documentação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
