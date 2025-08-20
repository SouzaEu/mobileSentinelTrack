"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { motorcycleService, type Motorcycle } from "../../services/motorcycleService"
import { useApi } from "../../hooks/useApi"

interface MotorcycleDetailScreenProps {
  route: {
    params: {
      motorcycleId: string
    }
  }
  navigation: any
}

export function MotorcycleDetailScreen({ route, navigation }: MotorcycleDetailScreenProps) {
  const { colors } = useTheme()
  const { motorcycleId } = route.params
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null)

  const {
    data,
    loading,
    error,
    execute: fetchMotorcycle,
  } = useApi(() => motorcycleService.getMotorcycleById(motorcycleId), {
    immediate: true,
    onSuccess: (data) => setMotorcycle(data),
  })

  const handleEdit = () => {
    navigation.navigate("EditMotorcycle", { motorcycle })
  }

  const handleDelete = () => {
    Alert.alert("Confirmar Exclusão", `Tem certeza que deseja excluir a moto ${motorcycle?.id}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await motorcycleService.deleteMotorcycle(motorcycleId)
            Alert.alert("Sucesso", "Moto excluída com sucesso")
            navigation.goBack()
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir a moto")
          }
        },
      },
    ])
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("pt-BR")
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: colors.destructive,
      textAlign: "center",
      marginBottom: 16,
    },
    retryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    retryButtonText: {
      color: colors.primaryForeground,
      fontWeight: "600",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.foreground,
    },
    headerActions: {
      flexDirection: "row",
      gap: 12,
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    editButton: {
      backgroundColor: colors.primary,
    },
    deleteButton: {
      backgroundColor: colors.destructive,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    section: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.foreground,
      marginBottom: 12,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    infoRowLast: {
      borderBottomWidth: 0,
    },
    infoLabel: {
      fontSize: 14,
      color: colors.mutedForeground,
      flex: 1,
    },
    infoValue: {
      fontSize: 14,
      color: colors.foreground,
      fontWeight: "500",
      flex: 2,
      textAlign: "right",
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: "flex-end",
    },
    statusText: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.background,
    },
    batteryContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    batteryText: {
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 4,
    },
    alertItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    alertItemLast: {
      borderBottomWidth: 0,
    },
    alertIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
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
    noAlertsText: {
      fontSize: 14,
      color: colors.mutedForeground,
      textAlign: "center",
      fontStyle: "italic",
    },
  })

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (error || !motorcycle) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error?.message || "Não foi possível carregar os dados da moto"}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchMotorcycle}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{motorcycle.id}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={handleEdit}>
            <Ionicons name="pencil" size={20} color={colors.primaryForeground} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
            <Ionicons name="trash" size={20} color={colors.destructiveForeground} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Modelo</Text>
            <Text style={styles.infoValue}>{motorcycle.model}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Placa</Text>
            <Text style={styles.infoValue}>{motorcycle.plate}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(motorcycle.status) }]}>
              <Text style={styles.statusText}>{getStatusText(motorcycle.status)}</Text>
            </View>
          </View>

          <View style={[styles.infoRow, styles.infoRowLast]}>
            <Text style={styles.infoLabel}>Bateria</Text>
            <View style={styles.batteryContainer}>
              <Ionicons name="battery-half" size={16} color={getBatteryColor(motorcycle.battery)} />
              <Text style={[styles.batteryText, { color: getBatteryColor(motorcycle.battery) }]}>
                {motorcycle.battery}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Localização</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Endereço</Text>
            <Text style={styles.infoValue} numberOfLines={2}>
              {motorcycle.location.address}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Latitude</Text>
            <Text style={styles.infoValue}>{motorcycle.location.latitude.toFixed(6)}</Text>
          </View>

          <View style={[styles.infoRow, styles.infoRowLast]}>
            <Text style={styles.infoLabel}>Longitude</Text>
            <Text style={styles.infoValue}>{motorcycle.location.longitude.toFixed(6)}</Text>
          </View>
        </View>

        {motorcycle.driver && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Condutor</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nome</Text>
              <Text style={styles.infoValue}>{motorcycle.driver.name}</Text>
            </View>

            <View style={[styles.infoRow, styles.infoRowLast]}>
              <Text style={styles.infoLabel}>ID</Text>
              <Text style={styles.infoValue}>{motorcycle.driver.id}</Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alertas Ativos</Text>

          {motorcycle.alerts.length > 0 ? (
            motorcycle.alerts.map((alert, index) => (
              <View
                key={alert.id}
                style={[styles.alertItem, index === motorcycle.alerts.length - 1 && styles.alertItemLast]}
              >
                <View style={styles.alertIcon}>
                  <Ionicons name="warning" size={16} color={colors.destructiveForeground} />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertDescription}>{alert.description}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noAlertsText}>Nenhum alerta ativo</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Última Atualização</Text>

          <View style={[styles.infoRow, styles.infoRowLast]}>
            <Text style={styles.infoLabel}>Data/Hora</Text>
            <Text style={styles.infoValue}>{formatDate(motorcycle.lastUpdate)}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
