"use client";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import { settingsService } from "../../services/settingsService";

export function PrivacyScreen() {
  const { colors } = useTheme();
  const [shareLocation, setShareLocation] = useState(false);
  const [shareAnalytics, setShareAnalytics] = useState(true);

  useEffect(() => {
    settingsService.getPrivacy().then(s => {
      setShareLocation(s.shareLocation);
      setShareAnalytics(s.shareAnalytics);
    });
  }, []);

  useEffect(() => {
    settingsService.setPrivacy({ shareLocation, shareAnalytics });
  }, [shareLocation, shareAnalytics]);

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 16 },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.foreground,
      marginBottom: 16,
    },
    row: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    label: { color: colors.foreground, fontSize: 16 },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacidade</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Compartilhar localização</Text>
        <Switch value={shareLocation} onValueChange={setShareLocation} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Compartilhar dados de uso</Text>
        <Switch value={shareAnalytics} onValueChange={setShareAnalytics} />
      </View>
    </View>
  );
}
