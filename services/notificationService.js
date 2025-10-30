import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configuração do comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Função para registrar para notificações push
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#B6FF00',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    } catch (e) {
      token = `${e}`;
    }
  } else {
  }

  return token;
}

// Função para enviar notificação local
export async function sendLocalNotification(title, body, data = {}) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: 'default',
      },
      trigger: null, // Enviar imediatamente
    });
  } catch (error) {
    console.error('Error sending local notification:', error);
  }
}

// Função para agendar notificação
export async function scheduleNotification(title, body, seconds, data = {}) {
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: 'default',
      },
      trigger: {
        seconds,
      },
    });
    return id;
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
}

// Função para cancelar notificação agendada
export async function cancelNotification(notificationId) {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
}

// Função para cancelar todas as notificações agendadas
export async function cancelAllNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error canceling all notifications:', error);
  }
}

// Tipos de notificações específicas do app
export const NotificationTypes = {
  NEW_MOTORCYCLE: 'new_motorcycle',
  MOTORCYCLE_REMOVED: 'motorcycle_removed',
  SPOT_AVAILABLE: 'spot_available',
  MAINTENANCE_REMINDER: 'maintenance_reminder',
};

// Funções específicas para cada tipo de notificação
export const sendMotorcycleNotification = {
  newMotorcycle: (plate, sector, spot) => {
    sendLocalNotification(
      'Nova Moto Cadastrada',
      `Moto ${plate} foi cadastrada no ${sector}, vaga ${spot}`,
      { type: NotificationTypes.NEW_MOTORCYCLE, plate, sector, spot }
    );
  },

  motorcycleRemoved: (plate, sector, spot) => {
    sendLocalNotification(
      'Moto Removida',
      `Moto ${plate} foi removida do ${sector}, vaga ${spot}`,
      { type: NotificationTypes.MOTORCYCLE_REMOVED, plate, sector, spot }
    );
  },

  spotAvailable: (sector, spot) => {
    sendLocalNotification(
      'Vaga Disponível',
      `A vaga ${spot} do ${sector} está disponível`,
      { type: NotificationTypes.SPOT_AVAILABLE, sector, spot }
    );
  },

  maintenanceReminder: plate => {
    sendLocalNotification(
      'Lembrete de Manutenção',
      `A moto ${plate} precisa de manutenção`,
      { type: NotificationTypes.MAINTENANCE_REMINDER, plate }
    );
  },
};
