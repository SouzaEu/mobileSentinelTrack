import { I18n } from 'i18n-js';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let Localization;
if (Platform.OS !== 'web') {
  Localization = require('react-native-localize');
}

import pt from '../locales/pt.json';
import es from '../locales/es.json';

const i18n = new I18n({ pt, es });

i18n.defaultLocale = 'pt';
i18n.fallbacks = true;

export const setupI18n = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    } else {
      let deviceLanguage = 'pt';
      if (Platform.OS === 'web') {
        deviceLanguage = navigator.language?.split('-')[0] || 'pt';
      } else if (Localization) {
        const deviceLanguages = Localization.getLocales();
        deviceLanguage = deviceLanguages[0]?.languageCode || 'pt';
      }
      i18n.locale = deviceLanguage === 'es' ? 'es' : 'pt';
      await AsyncStorage.setItem('selectedLanguage', i18n.locale);
    }
  } catch (error) {
    console.error('Error setting up i18n:', error);
    i18n.locale = 'pt';
  }
};

export const changeLanguage = async language => {
  try {
    i18n.locale = language;
    await AsyncStorage.setItem('selectedLanguage', language);
  } catch (error) {
    console.error('Error loading locale:', error);
  }
};

export const getCurrentLanguage = () => i18n.locale;
export const getAvailableLanguages = () => [
  { code: 'pt', name: 'Português' },
  { code: 'es', name: 'Español' },
];

export default i18n;
