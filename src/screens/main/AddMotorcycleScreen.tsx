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
import { motorcycleService, type CreateMotorcycleRequest } from "../../services/motorcycleService"
import { useMutation } from "../../hooks/useApi"

interface AddMotorcycleScreenProps {
  navigation: any
}

export function AddMotorcycleScreen({ navigation }: AddMotorcycleScreenProps) {
  const { colors } = useTheme()
  const [formData, setFormData] = useState({
    model: "",
    plate: "",
    address: "",
    latitude: "",
    longitude: "",
  })

  const { mutate: createMotorcycle, loading } = useMutation(
    (data: CreateMotorcycleRequest) => motorcycleService.createMotorcycle(data),
    {
      onSuccess: () => {
        Alert.alert("Sucesso", "Moto adicionada com sucesso!", [{ text: "OK", onPress: () => navigation.goBack() }])
      },
      onError: (error) => {
        Alert.alert("Erro", error.message || "Não foi possível adicionar a moto")
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

    if (!formData.address.trim()) {
      Alert.alert("Erro", "Por favor, informe o endereço")
      return
    }

    const latitude = Number.parseFloat(formData.latitude)
    const longitude = Number.parseFloat(formData.longitude)

    if (isNaN(latitude) || isNaN(longitude)) {
      Alert.alert("Erro", "Por favor, informe coordenadas válidas")
      return
    }

    // Validação de placa brasileira
    const plateRegex = /^[A-Z]{3}-\d{4}$/
    if (!plateRegex.test(formData.plate.toUpperCase())) {
      Alert.alert("Erro", "Formato de placa inválido. Use o formato ABC-1234")
      return
    }

    const motorcycleData: CreateMotorcycleRequest = {
      model: formData.model.trim(),
      plate: formData.plate.toUpperCase().trim(),
      initialLocation: {
        address: formData.address.trim(),
        latitude,
        longitude,
      },
    }

    await createMotorcycle(motorcycleData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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
    inputError: {
      borderColor: colors.destructive,
    },
    coordinatesRow: {
      flexDirection: "row",
      gap: 12,
    },
    coordinateInput: {
      flex: 1,
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
    exampleSection: {
      backgroundColor: colors.muted,
      borderRadius: 8,
      padding: 12,
      marginTop: 8,
    },
    exampleTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.foreground,
      marginBottom: 4,
    },
    exampleText: {
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
        <Text style={styles.headerTitle}>Adicionar Moto</Text>
      </View>

      <ScrollView style={styles.content}>
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
            <Text style={styles.label}>Endereço Inicial *</Text>
            <TextInput
              style={styles.input}
              placeholder="Rua, número, bairro, cidade"
              placeholderTextColor={colors.mutedForeground}
              value={formData.address}
              onChangeText={(value) => handleInputChange("address", value)}
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Coordenadas *</Text>
            <View style={styles.coordinatesRow}>
              <View style={styles.coordinateInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Latitude"
                  placeholderTextColor={colors.mutedForeground}
                  value={formData.latitude}
                  onChangeText={(value) => handleInputChange("latitude", value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.coordinateInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Longitude"
                  placeholderTextColor={colors.mutedForeground}
                  value={formData.longitude}
                  onChangeText={(value) => handleInputChange("longitude", value)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.exampleSection}>
              <Text style={styles.exampleTitle}>Exemplo para São Paulo:</Text>
              <Text style={styles.exampleText}>Latitude: -23.5505</Text>
              <Text style={styles.exampleText}>Longitude: -46.6333</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>{loading ? "Adicionando..." : "Adicionar Moto"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
