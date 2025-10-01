"use client";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export function EditProfileScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 16 },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.foreground,
      marginBottom: 16,
    },
    input: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      color: colors.foreground,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 14,
      alignItems: "center",
      marginTop: 8,
    },
    buttonText: { color: colors.primaryForeground, fontWeight: "600" },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
        placeholderTextColor={colors.mutedForeground}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor={colors.mutedForeground}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await updateProfile({ name, email });
          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
