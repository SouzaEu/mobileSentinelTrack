"use client";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export function ProfileScreen({ navigation }: any) {
  const { colors, theme, setTheme, isDark } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: logout },
    ]);
  };

  const handleThemeChange = () => {
    const themes: Array<"light" | "dark" | "system"> = [
      "light",
      "dark",
      "system",
    ];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const getThemeText = () => {
    switch (theme) {
      case "light":
        return "Claro";
      case "dark":
        return "Escuro";
      case "system":
        return "Sistema";
      default:
        return "Sistema";
    }
  };

  const menuItems = [
    {
      icon: "person-outline",
      title: "Editar Perfil",
      subtitle: "Alterar informações pessoais",
      onPress: () => navigation.navigate("EditProfile"),
    },
    {
      icon: "notifications-outline",
      title: "Notificações",
      subtitle: "Configurar alertas e avisos",
      onPress: () => navigation.navigate("Notifications"),
    },
    {
      icon: isDark ? "moon" : "sunny",
      title: "Tema",
      subtitle: `Atual: ${getThemeText()}`,
      onPress: handleThemeChange,
    },
    {
      icon: "shield-outline",
      title: "Privacidade",
      subtitle: "Configurações de segurança",
      onPress: () => navigation.navigate("Privacy"),
    },
    {
      icon: "help-circle-outline",
      title: "Ajuda",
      subtitle: "Suporte e documentação",
      onPress: () => navigation.navigate("Help"),
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      alignItems: "center",
      padding: 32,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.primaryForeground,
    },
    userName: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.foreground,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 16,
      color: colors.mutedForeground,
    },
    menu: {
      padding: 16,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    menuIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.muted,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    menuContent: {
      flex: 1,
    },
    menuTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.foreground,
      marginBottom: 2,
    },
    menuSubtitle: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    chevron: {
      marginLeft: 8,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.destructive,
      borderRadius: 12,
      padding: 16,
      margin: 16,
      marginTop: 32,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.destructiveForeground,
      marginLeft: 8,
    },
    version: {
      textAlign: "center",
      fontSize: 12,
      color: colors.mutedForeground,
      padding: 16,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name={item.icon as any}
                size={20}
                color={colors.foreground}
              />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.mutedForeground}
              style={styles.chevron}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons
          name="log-out-outline"
          size={20}
          color={colors.destructiveForeground}
        />
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>

      <Text style={styles.version}>SentinelTrack v1.0.0</Text>
    </ScrollView>
  );
}
