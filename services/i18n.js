import { I18n } from 'i18n-js';
import * as Localization from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import pt from '../locales/pt.json';
import es from '../locales/es.json';

const i18n = new I18n({
  pt,
  es,
});

// Fallback para português se a tradução não existir
i18n.defaultLocale = 'pt';
i18n.fallbacks = true;

// Função para configurar o idioma
export const setupI18n = async () => {
  try {
    // Primeiro, tenta recuperar o idioma salvo
    const savedLanguage = await AsyncStorage.getItem('selectedLanguage');

    if (savedLanguage) {
      i18n.locale = savedLanguage;
    } else {
      // Se não há idioma salvo, usa o idioma do dispositivo
      const deviceLanguages = Localization.getLocales();
      const deviceLanguage = deviceLanguages[0]?.languageCode;

      // Verifica se o idioma do dispositivo é suportado
      if (deviceLanguage === 'es') {
        i18n.locale = 'es';
      } else {
        i18n.locale = 'pt'; // Padrão para português
      }

      // Salva a escolha
      await AsyncStorage.setItem('selectedLanguage', i18n.locale);
    }
  } catch (error) {
    i18n.locale = 'pt'; // Fallback para português
  }
};

// Função para alterar o idioma
export const changeLanguage = async language => {
  try {
    i18n.locale = language;
    await AsyncStorage.setItem('selectedLanguage', language);
  } catch (error) {}
};

// Função para obter o idioma atual
export const getCurrentLanguage = () => i18n.locale;

// Função para obter as traduções disponíveis
export const getAvailableLanguages = () => [
  { code: 'pt', name: 'Português' },
  { code: 'es', name: 'Español' },
];

export default i18n;
