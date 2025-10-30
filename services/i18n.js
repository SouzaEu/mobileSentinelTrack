// Lightweight wrapper that forwards exports to the stable implementation in i18n_clean.
import i18nDefault, {
  setupI18n,
  changeLanguage,
  getCurrentLanguage,
  getAvailableLanguages,
} from './i18n_clean';

export { setupI18n, changeLanguage, getCurrentLanguage, getAvailableLanguages };
export default i18nDefault;
