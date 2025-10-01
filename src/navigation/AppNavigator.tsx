"use client";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// Auth Screens
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";

// Main Screens
import { HomeScreen } from "../screens/main/HomeScreen";
import { MotorcyclesScreen } from "../screens/main/MotorcyclesScreen";
import { ProfileScreen } from "../screens/main/ProfileScreen";
import { EditProfileScreen } from "../screens/profile/EditProfileScreen";
import { NotificationsScreen } from "../screens/profile/NotificationsScreen";
import { PrivacyScreen } from "../screens/profile/PrivacyScreen";
import { HelpScreen } from "../screens/profile/HelpScreen";
import { LoadingScreen } from "../screens/LoadingScreen";

// CRUD Screens
import { MotorcycleDetailScreen } from "../screens/main/MotorcycleDetailScreen";
import { AddMotorcycleScreen } from "../screens/main/AddMotorcycleScreen";
import { EditMotorcycleScreen } from "../screens/main/EditMotorcycleScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function MotorcyclesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MotorcyclesList" component={MotorcyclesScreen} />
      <Stack.Screen
        name="MotorcycleDetail"
        component={MotorcycleDetailScreen}
      />
      <Stack.Screen name="AddMotorcycle" component={AddMotorcycleScreen} />
      <Stack.Screen name="EditMotorcycle" component={EditMotorcycleScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
  );
}

function MainNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Motorcycles") {
            iconName = focused ? "bicycle" : "bicycle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else {
            iconName = "help-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.foreground,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Início" }}
      />
      <Tab.Screen
        name="Motorcycles"
        component={MotorcyclesStack}
        options={{ title: "Motos" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return user ? <MainNavigator /> : <AuthNavigator />;
}
