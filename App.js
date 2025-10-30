import { useEffect, useState, useContext, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from './services/firebaseConfig';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import CadastroMotoScreen from './screens/CadastroMotoScreen';
import RelatoriosScreen from './screens/RelatoriosScreen';
import AboutScreen from './screens/AboutScreen';
import MotorcycleManagementScreen from './screens/MotorcycleManagementScreen';
import CustomDrawerContent from './components/CustomDrawerContent';
import { setupI18n } from './services/i18n_clean';
import { registerForPushNotificationsAsync } from './services/notificationService';
import * as Notifications from 'expo-notifications';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { Platform } from 'react-native';
import i18n from './services/i18n_clean';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

/** =========== Drawer com ícones nas telas =========== */
function AppDrawer({ usuario, onLogout, theme, toggleTheme }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        drawerStyle: { backgroundColor: theme.background },
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.text,
        drawerLabelStyle: { fontWeight: '600' },
      }}
      drawerContent={props => (
        <CustomDrawerContent
          {...props}
          usuario={usuario}
          onLogout={onLogout}
          toggleTheme={toggleTheme}
          theme={theme}
        />
      )}
      initialRouteName="Dashboard"
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="speedometer" size={size} color={color} />
          ),
          title: i18n.t('navigation.dashboard'),
        }}
      />
      <Drawer.Screen
        name="Cadastro de Motos"
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="motorbike"
              size={size}
              color={color}
            />
          ),
          title: i18n.t('navigation.motorcycles'),
        }}
      >
        {() => <CadastroMotoScreen userRM={usuario?.rm} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Relatórios"
        component={RelatoriosScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
          title: i18n.t('navigation.reports'),
        }}
      />
      <Drawer.Screen
        name="Gerenciar Motos"
        component={MotorcycleManagementScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="motorbike-electric"
              size={size}
              color={color}
            />
          ),
          title: i18n.t('management.title'),
        }}
      />
      <Drawer.Screen
        name="Sobre o App"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
          title: i18n.t('navigation.about'),
        }}
      />
    </Drawer.Navigator>
  );
}

/** =========== Auth Stack =========== */
function AuthStack({ handleLoginSuccess }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {props => (
          <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {props => (
          <RegisterScreen {...props} onRegisterSuccess={handleLoginSuccess} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

/** =========== App Root Component (within ThemeProvider) =========== */
function AppRoot() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [_expoPushToken, setExpoPushToken] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Inicialização do app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Configurar i18n
        await setupI18n();

        // Registrar para notificações push (apenas em dispositivos móveis)
        if (Platform.OS !== 'web') {
          const token = await registerForPushNotificationsAsync();
          setExpoPushToken(token);
        }

        // Configurar listeners de notificação (apenas em dispositivos móveis)
        if (Platform.OS !== 'web') {
          notificationListener.current =
            Notifications.addNotificationReceivedListener(_notification => {
              // Notificação recebida
            });

          responseListener.current =
            Notifications.addNotificationResponseReceivedListener(_response => {
              // Resposta de notificação recebida
            });
        }

        // Restaurar sessão do usuário
        const user = await AsyncStorage.getItem('usuarioLogado');
        if (user) setUsuario(JSON.parse(user));
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();

    // Cleanup
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // Normaliza e salva o usuário (usado por Login e Register)
  const handleLoginSuccess = async u => {
    const normalized = {
      uid: u?.uid,
      email: u?.email,
      rm: u?.rm ?? null,
      displayName: u?.displayName ?? null,
    };
    await AsyncStorage.setItem('usuarioLogado', JSON.stringify(normalized));
    setUsuario(normalized);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {
      // Erro ao fazer logout do Firebase (ignorado)
    }
    await AsyncStorage.removeItem('usuarioLogado');
    setUsuario(null);
  };

  if (loading) return null;

  return (
    <NavigationContainer>
      {usuario ? (
        <AppDrawer
          usuario={usuario}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <AuthStack handleLoginSuccess={handleLoginSuccess} />
      )}
    </NavigationContainer>
  );
}

/** =========== App Root (wrapper with ThemeProvider) =========== */
export default function App() {
  return (
    <ThemeProvider>
      <AppRoot />
    </ThemeProvider>
  );
}
