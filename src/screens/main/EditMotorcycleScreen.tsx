"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useTheme } from "../../contexts/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { motorcycleService, type Motorcycle, type UpdateMotorcycleRequest } from "../../services/motorcycleService"
import { useMutation } from "../../hooks/useApi"

interface EditMotorcycleScreenProps {
  route: {
    params: {
      motorcycle: Motorcycle
    }
  }
  navigation: any
}

export function EditMotorcycleScreen({ route, navigation }: EditMotorcycleScreenProps) {
  const { colors } = useTheme()
  const { motorcycle } = route.params

  const [formData, setFormData] = useState({
    model: motorcycle.model,
    plate: motorcycle.plate,
    status: motorcycle.status,
  })

  const { mutate: updateMotorcycle, loading } = useMutation(
    (data: { id: string; updates: UpdateMotorcycleRequest }) =>
      motorcycleService.updateMotorcycle(data.id, data.updates),
    {
      onSuccess: () => {
        Alert.alert("Sucesso", "Moto atualizada com sucesso!", [{ text: "OK", onPress: () => navigation.goBack() }])
      },
      onError: (error) => {
        Alert.alert("Erro", error.message || "Não foi possível atualizar a moto")
      },
    },
  )

  const handleSubmit = async () => {
    // Validação
    if (!formData.model.trim()) {
      Alert.alert("Erro", "Por favor, informe o modelo da moto")
      return
    }

    if (!formData.plate.trim()) {
      Alert.alert("Erro", "Por favor, informe a placa da moto")
      return
    }

    // Validação de placa brasileira
    const plateRegex = /^[A-Z]{3}-\d{4}$/
    if (!plateRegex.test(formData.plate.toUpperCase())) {
      Alert.alert("Erro", "Formato de placa inválido. Use o formato ABC-1234")
      return
    }

    const updates: UpdateMotorcycleRequest = {
      model: formData.model.trim(),
      plate: formData.plate.toUpperCase().trim(),
      status: formData.status,
    }

    await updateMotorcycle({ id: motorcycle.id, updates })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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

  const statusOptions = [
    { value: "active", label: "Ativa" },
    { value: "inactive", label: "Inativa" },
    { value: "maintenance", label: "Manutenção" },
  ]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.foreground,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    form: {
      gap: 16,
    },
    inputGroup: {
      gap: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.foreground,
    },
    input: {
      backgroundColor: colors.input,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.foreground,
    },
    statusContainer: {
      gap: 8,
    },
    statusOption: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
    },
    statusOptionSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + "10",
    },
    statusRadio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.border,
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    statusRadioSelected: {
      borderColor: colors.primary,
    },
    statusRadioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    statusText: {
      fontSize: 16,
      color: colors.foreground,
    },
    helpText: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 4,
    },
    submitButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      marginTop: 24,
    },
    submitButtonDisabled: {
      opacity: 0.6,
    },
    submitButtonText: {
      color: colors.primaryForeground,
      fontSize: 16,
      fontWeight: "600",
    },
    infoSection: {
      backgroundColor: colors.muted,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
    },
    infoTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.foreground,
      marginBottom: 4,
    },
    infoText: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
  })

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar {motorcycle.id}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Informações não editáveis:</Text>
          <Text style={styles.infoText}>ID: {motorcycle.id}</Text>
          <Text style={styles.infoText}>Localização: {motorcycle.location.address}</Text>
          <Text style={styles.infoText}>Bateria: {motorcycle.battery}%</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Modelo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Honda CG 160"
              placeholderTextColor={colors.mutedForeground}
              value={formData.model}
              onChangeText={(value) => handleInputChange("model", value)}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Placa *</Text>
            <TextInput
              style={styles.input}
              placeholder="ABC-1234"
              placeholderTextColor={colors.mutedForeground}
              value={formData.plate}
              onChangeText={(value) => handleInputChange("plate", value)}
              autoCapitalize="characters"
              maxLength={8}
            />
            <Text style={styles.helpText}>Formato: ABC-1234</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status *</Text>
            <View style={styles.statusContainer}>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.statusOption, formData.status === option.value && styles.statusOptionSelected]}
                  onPress={() => handleInputChange("status", option.value)}
                >
                  <View style={[styles.statusRadio, formData.status === option.value && styles.statusRadioSelected]}>
                    {formData.status === option.value && <View style={styles.statusRadioInner} />}
                  </View>
                  <Text style={styles.statusText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>{loading ? "Salvando..." : "Salvar Alterações"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
