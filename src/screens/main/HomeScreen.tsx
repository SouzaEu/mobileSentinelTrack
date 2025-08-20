"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"
import { useAuth } from "../../contexts/AuthContext"
import { Ionicons } from "@expo/vector-icons"

export function HomeScreen() {
  const { colors } = useTheme()
  const { user } = useAuth()

  const stats = [
    { title: "Motos Ativas", value: "24", icon: "bicycle", color: colors.primary },
    { title: "Alertas Hoje", value: "3", icon: "warning", color: colors.destructive },
    { title: "Eficiência", value: "94%", icon: "trending-up", color: colors.accent },
    { title: "Economia", value: "R$ 2.4k", icon: "cash", color: colors.secondary },
  ]

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
  })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {user?.name}!</Text>
        <Text style={styles.subtitle}>Bem-vindo ao SentinelTrack</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <TouchableOpacity key={index} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + "20" }]}>
              <Ionicons name={stat.icon as any} size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alertas Recentes</Text>

        <TouchableOpacity style={styles.alertCard}>
          <View style={styles.alertIcon}>
            <Ionicons name="warning" size={20} color={colors.destructiveForeground} />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Velocidade Excessiva</Text>
            <Text style={styles.alertDescription}>Moto #MT-001 - Av. Paulista</Text>
            <Text style={styles.alertTime}>há 15 minutos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.alertCard}>
          <View style={styles.alertIcon}>
            <Ionicons name="location" size={20} color={colors.destructiveForeground} />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Área Restrita</Text>
            <Text style={styles.alertDescription}>Moto #MT-007 - Centro</Text>
            <Text style={styles.alertTime}>há 32 minutos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.alertCard}>
          <View style={styles.alertIcon}>
            <Ionicons name="time" size={20} color={colors.destructiveForeground} />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Parada Prolongada</Text>
            <Text style={styles.alertDescription}>Moto #MT-015 - Vila Madalena</Text>
            <Text style={styles.alertTime}>há 1 hora</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
