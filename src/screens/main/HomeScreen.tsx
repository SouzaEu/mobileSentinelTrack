"use client";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useApi } from "../../hooks/useApi";
import {
  motorcycleService,
  type Motorcycle,
  type Alert as AlertItem,
} from "../../services/motorcycleService";
import { useCallback, useMemo } from "react";

export function HomeScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const {
    data: motorcycles,
    loading: loadingMotos,
    error: errorMotos,
    execute: fetchMotos,
  } = useApi<Motorcycle[]>(() => motorcycleService.getMotorcycles(), {
    immediate: true,
  });

  const {
    data: alerts,
    loading: loadingAlerts,
    error: errorAlerts,
    execute: fetchAlerts,
  } = useApi<AlertItem[]>(() => motorcycleService.getAlerts(), {
    immediate: true,
  });

  const refreshing = loadingMotos || loadingAlerts;
  const onRefresh = useCallback(() => {
    fetchMotos();
    fetchAlerts();
  }, [fetchMotos, fetchAlerts]);

  const activeCount = useMemo(
    () =>
      Array.isArray(motorcycles)
        ? motorcycles.filter(m => m.status === "active").length
        : 0,
    [motorcycles]
  );

  const stats = [
    {
      title: "Motos Ativas",
      value: String(activeCount),
      icon: "bicycle",
      color: colors.primary,
    },
    {
      title: "Alertas Hoje",
      value: String(Array.isArray(alerts) ? alerts.length : 0),
      icon: "warning",
      color: colors.destructive,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 24,
      paddingTop: 16,
    },
    greeting: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.foreground,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: colors.mutedForeground,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 16,
      gap: 16,
    },
    statCard: {
      flex: 1,
      minWidth: "45%",
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    statIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    statValue: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.foreground,
      marginBottom: 4,
    },
    statTitle: {
      fontSize: 12,
      color: colors.mutedForeground,
      textAlign: "center",
    },
    section: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.foreground,
      marginBottom: 16,
    },
    alertCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
    },
    alertIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.destructive,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    alertContent: {
      flex: 1,
    },
    alertTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.foreground,
      marginBottom: 2,
    },
    alertDescription: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    alertTime: {
      fontSize: 11,
      color: colors.mutedForeground,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.mutedForeground}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {user?.name}!</Text>
        <Text style={styles.subtitle}>Bem-vindo ao SentinelTrack</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <TouchableOpacity key={index} style={styles.statCard}>
            <View
              style={[styles.statIcon, { backgroundColor: stat.color + "20" }]}
            >
              <Ionicons name={stat.icon as any} size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alertas Recentes</Text>
        {Array.isArray(alerts) && alerts.length > 0 ? (
          alerts.slice(0, 5).map(a => (
            <TouchableOpacity key={a.id} style={styles.alertCard}>
              <View style={styles.alertIcon}>
                <Ionicons
                  name={
                    a.type === "speed"
                      ? "speedometer"
                      : a.type === "location"
                        ? "location"
                        : a.type === "battery"
                          ? "battery-dead"
                          : "warning"
                  }
                  size={20}
                  color={colors.destructiveForeground}
                />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>{a.title}</Text>
                <Text style={styles.alertDescription}>{a.description}</Text>
                <Text style={styles.alertTime}>{a.timestamp}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: colors.mutedForeground }}>
            Sem alertas recentes.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
