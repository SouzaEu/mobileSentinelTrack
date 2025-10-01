import { platformStorage } from "../utils/storage";

export interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
}

export interface PrivacySettings {
  shareLocation: boolean;
  shareAnalytics: boolean;
}

const KEYS = {
  NOTIFICATIONS: "settings_notifications",
  PRIVACY: "settings_privacy",
};

export const settingsService = {
  async getNotifications(): Promise<NotificationSettings> {
    const raw = await platformStorage.getItem(KEYS.NOTIFICATIONS);
    if (!raw) return { pushEnabled: true, emailEnabled: false };
    try {
      return JSON.parse(raw) as NotificationSettings;
    } catch {
      return { pushEnabled: true, emailEnabled: false };
    }
  },

  async setNotifications(settings: NotificationSettings): Promise<void> {
    await platformStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(settings));
  },

  async getPrivacy(): Promise<PrivacySettings> {
    const raw = await platformStorage.getItem(KEYS.PRIVACY);
    if (!raw) return { shareLocation: false, shareAnalytics: true };
    try {
      return JSON.parse(raw) as PrivacySettings;
    } catch {
      return { shareLocation: false, shareAnalytics: true };
    }
  },

  async setPrivacy(settings: PrivacySettings): Promise<void> {
    await platformStorage.setItem(KEYS.PRIVACY, JSON.stringify(settings));
  },
};
