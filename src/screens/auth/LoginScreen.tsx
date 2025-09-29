"use client"

import { useState } from "react"
import { VALIDATION_RULES } from "../../constants"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { useTheme } from "../../contexts/ThemeContext"
import { useAuth } from "../../contexts/AuthContext"
import { Ionicons } from "@expo/vector-icons"
import { AnimatedButton } from "../../components/AnimatedButton"

export function LoginScreen({ navigation }: any) {
  const { colors } = useTheme()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const isEmailValid = VALIDATION_RULES.email.test(email)
  const isPasswordValid = password.length >= VALIDATION_RULES.password.minLength
  const isFormValid = isEmailValid && isPasswordValid

  const handleLogin = async () => {
    if (!isFormValid) {
      const messages = [] as string[]
      if (!isEmailValid) messages.push("Email inválido")
      if (!isPasswordValid) messages.push(`Senha com no mínimo ${VALIDATION_RULES.password.minLength} caracteres`)
      Alert.alert("Erro de Validação", messages.join("\n"))
      return
    }

    setIsLoading(true)
    try {
      const success = await login(email.trim(), password)
      if (!success) {
        Alert.alert("Erro de Login", "Email ou senha incorretos.\n\nPara demonstração, use:\nEmail: admin@test.com\nSenha: 123456")
      }
    } catch (error: any) {
      Alert.alert("Erro de Login", error.message || "Credenciais inválidas.\n\nPara demonstração, use:\nEmail: admin@test.com\nSenha: 123456")
    } finally {
      setIsLoading(false)
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
      padding: 24,
    },
    header: {
      alignItems: "center",
      marginBottom: 48,
    },
    logo: {
      width: 80,
      height: 80,
      backgroundColor: colors.primary,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.foreground,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.mutedForeground,
      textAlign: "center",
    },
    form: {
      gap: 16,
    },
    inputContainer: {
      position: "relative",
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
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.input,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
    },
    passwordInput: {
      flex: 1,
      padding: 16,
      fontSize: 16,
      color: colors.foreground,
    },
    eyeButton: {
      padding: 16,
    },
    loginButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      marginTop: 8,
    },
    loginButtonDisabled: {
      opacity: 0.6,
    },
    loginButtonText: {
      color: colors.primaryForeground,
      fontSize: 16,
      fontWeight: "600",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 32,
    },
    footerText: {
      color: colors.mutedForeground,
      fontSize: 14,
    },
    registerLink: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 4,
    },
  })

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="shield-checkmark" size={40} color={colors.primaryForeground} />
          </View>
          <Text style={styles.title}>SentinelTrack</Text>
          <Text style={styles.subtitle}>Sistema de monitoramento inteligente de motos</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.mutedForeground}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              placeholderTextColor={colors.mutedForeground}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>

          <AnimatedButton
            title="Entrar"
            onPress={handleLogin}
            disabled={!isFormValid}
            loading={isLoading}
            icon="log-in"
            size="lg"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
