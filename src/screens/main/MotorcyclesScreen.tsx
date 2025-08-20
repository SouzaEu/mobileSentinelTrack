"use client"

import { useState, useCallback } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, RefreshControl } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { motorcycleService, type Motorcycle } from "../../services/motorcycleService"
import { useApi } from "../../hooks/useApi"
import { useFocusEffect } from "@react-navigation/native"

interface MotorcyclesScreenProps {
  navigation: any
}

export function MotorcyclesScreen({ navigation }: MotorcyclesScreenProps) {
  const { colors } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  const {
    data: motorcycles = [],
    loading,
    execute: fetchMotorcycles,
  } = useApi(() => motorcycleService.getMotorcycles(), {
    immediate: true,
  })

  useFocusEffect(
    useCallback(() => {
      fetchMotorcycles()
    }, [fetchMotorcycles]),
  )

  const handleRefresh = useCallback(() => {
    fetchMotorcycles()
  }, [fetchMotorcycles])

  const handleAddMotorcycle = () => {
    navigation.navigate("AddMotorcycle")
  }

  const handleMotorcyclePress = (motorcycle: Motorcycle) => {
    navigation.navigate("MotorcycleDetail", { motorcycleId: motorcycle.id })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return colors.accent
      case "inactive":
        return colors.mutedForeground
      case "maintenance":
        return colors.destructive
      default:
        return colors.mutedForeground
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativa"
      case "inactive":
        return "Inativa"
      case "maintenance":
        return "Manutenção"
      default:
        return "Desconhecido"
    }
  }

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return colors.accent
    if (battery > 30) return "#f59e0b"
    return colors.destructive
  }

  const formatLastUpdate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMins / 60)

    if (diffMins < 1) return "agora"
    if (diffMins < 60) return `${diffMins} min atrás`
    if (diffHours < 24) return `${diffHours}h atrás`
    return date.toLocaleDateString("pt-BR")
  }

  const filteredMotorcycles = motorcycles.filter(
    (moto) =>
      moto.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moto.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moto.plate.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.foreground,
    },
    addButton: {
      backgroundColor: colors.primary,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.input,
      borderRadius: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.foreground,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    statItem: {
      alignItems: "center",
    },
    statNumber: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.foreground,
    },
    statLabel: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 4,
    },
    list: {
      flex: 1,
      padding: 16,
    },
    motorcycleCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    motorcycleInfo: {
      flex: 1,
    },
    motorcycleId: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.foreground,
      marginBottom: 4,
    },
    motorcycleModel: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginBottom: 2,
    },
    motorcyclePlate: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      alignSelf: "flex-start",
    },
    statusText: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.background,
    },
    cardBody: {
      gap: 8,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    infoItem: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    infoText: {
      fontSize: 14,
      color: colors.foreground,
      marginLeft: 8,
      flex: 1,
    },
    batteryContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    batteryText: {
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 4,
    },
    lastUpdate: {
      fontSize: 12,
      color: colors.mutedForeground,
      textAlign: "right",
      marginTop: 8,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 32,
    },
    emptyStateText: {
      fontSize: 16,
      color: colors.mutedForeground,
      textAlign: "center",
      marginTop: 16,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Motos</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddMotorcycle}>
            <Ionicons name="add" size={24} color={colors.primaryForeground} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.mutedForeground} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar motos..."
            placeholderTextColor={colors.mutedForeground}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.accent }]}>
              {motorcycles.filter((m) => m.status === "active").length}
            </Text>
            <Text style={styles.statLabel}>Ativas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.mutedForeground }]}>
              {motorcycles.filter((m) => m.status === "inactive").length}
            </Text>
            <Text style={styles.statLabel}>Inativas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.destructive }]}>
              {motorcycles.filter((m) => m.status === "maintenance").length}
            </Text>
            <Text style={styles.statLabel}>Manutenção</Text>
          </View>
        </View>
      </View>

      {filteredMotorcycles.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="bicycle-outline" size={64} color={colors.mutedForeground} />
          <Text style={styles.emptyStateText}>
            {searchQuery ? "Nenhuma moto encontrada" : "Nenhuma moto cadastrada"}
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.list}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} />}
        >
          {filteredMotorcycles.map((motorcycle) => (
            <TouchableOpacity
              key={motorcycle.id}
              style={styles.motorcycleCard}
              onPress={() => handleMotorcyclePress(motorcycle)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.motorcycleInfo}>
                  <Text style={styles.motorcycleId}>{motorcycle.id}</Text>
                  <Text style={styles.motorcycleModel}>{motorcycle.model}</Text>
                  <Text style={styles.motorcyclePlate}>{motorcycle.plate}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(motorcycle.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(motorcycle.status)}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons name="location" size={16} color={colors.mutedForeground} />
                    <Text style={styles.infoText} numberOfLines={1}>
                      {motorcycle.location.address}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.batteryContainer}>
                    <Ionicons name="battery-half" size={16} color={getBatteryColor(motorcycle.battery)} />
                    <Text style={[styles.batteryText, { color: getBatteryColor(motorcycle.battery) }]}>
                      {motorcycle.battery}%
                    </Text>
                  </View>
                </View>

                <Text style={styles.lastUpdate}>Última atualização: {formatLastUpdate(motorcycle.lastUpdate)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  )
}
