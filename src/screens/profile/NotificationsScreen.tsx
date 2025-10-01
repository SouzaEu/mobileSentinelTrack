"use client";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import { settingsService } from "../../services/settingsService";

export function NotificationsScreen() {
  const { colors } = useTheme();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  useEffect(() => {
    settingsService.getNotifications().then(s => {
      setPushEnabled(s.pushEnabled);
      setEmailEnabled(s.emailEnabled);
    });
  }, []);

  useEffect(() => {
    settingsService.setNotifications({ pushEnabled, emailEnabled });
  }, [pushEnabled, emailEnabled]);

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
      <Text style={styles.title}>Notificações</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Push</Text>
        <Switch value={pushEnabled} onValueChange={setPushEnabled} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Switch value={emailEnabled} onValueChange={setEmailEnabled} />
      </View>
    </View>
  );
}
