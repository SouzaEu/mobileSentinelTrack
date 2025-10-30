import { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { ThemeContext } from '../contexts/ThemeContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from '../services/i18n_clean';
import Constants from 'expo-constants';

const COMMIT_HASH =
  Constants.expoConfig?.extra?.COMMIT_HASH ||
  process.env.COMMIT_HASH ||
  '2f7a1dae85b4c90c9b3958febcfa5724fbcaaca5';
const APP_VERSION = '1.0.0';

const developers = [
  {
    name: 'Thomaz Oliveira',
    rm: '555323',
    github: 'https://github.com/thomaz-oliveira',
    email: 'rm555323@fiap.com.br',
  },
  {
    name: 'Vinicius Souza',
    rm: '556089',
    github: 'https://github.com/SouzaEu',
    email: 'rm556089@fiap.com.br',
  },
  {
    name: 'Gabriel Duarte',
    rm: '556972',
    github: 'https://github.com/gabriel-duarte',
    email: 'rm556972@fiap.com.br',
  },
];

export default function AboutScreen() {
  const { theme } = useContext(ThemeContext);

  const openLink = url => {
    Linking.openURL(url);
  };

  const copyToClipboard = async text => {
    try {
      await Clipboard.setString(text);
      Alert.alert(i18n.t('about.success'), i18n.t('about.hashCopied'));
    } catch {
      Alert.alert(i18n.t('about.error'), i18n.t('about.couldNotCopy'));
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.inputBackground }]}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons
            name="motorbike"
            size={60}
            color={theme.primary}
          />
          <Text style={[styles.appName, { color: theme.text }]}>
            {i18n.t('about.appName')}
          </Text>
          <Text style={[styles.appDescription, { color: theme.text }]}>
            {i18n.t('about.description')}
          </Text>
        </View>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Informações do App
        </Text>

        <View
          style={[styles.infoCard, { backgroundColor: theme.inputBackground }]}
        >
          <View style={styles.infoRow}>
            <Ionicons
              name="information-circle"
              size={20}
              color={theme.primary}
            />
            <Text style={[styles.infoLabel, { color: theme.text }]}>
              {i18n.t('about.version')}:
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {APP_VERSION}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => copyToClipboard(COMMIT_HASH)}
          >
            <Ionicons name="git-commit" size={20} color={theme.primary} />
            <Text style={[styles.infoLabel, { color: theme.text }]}>
              {i18n.t('about.commitHash')}:
            </Text>
            <Text
              style={[
                styles.infoValue,
                styles.monospace,
                { color: theme.primary },
              ]}
            >
              {COMMIT_HASH.substring(0, 8)}...
            </Text>
            <Ionicons name="copy" size={16} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Developers */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {i18n.t('about.developers')}
        </Text>

        {developers.map((dev, index) => (
          <View
            key={index}
            style={[
              styles.developerCard,
              { backgroundColor: theme.inputBackground },
            ]}
          >
            <View style={styles.developerHeader}>
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(dev.name)}&background=111111&color=B6FF00`,
                }}
                style={styles.developerAvatar}
              />
              <View style={styles.developerInfo}>
                <Text style={[styles.developerName, { color: theme.text }]}>
                  {dev.name}
                </Text>
                <Text style={[styles.developerRM, { color: theme.text }]}>
                  RM: {dev.rm}
                </Text>
              </View>
            </View>

            <View style={styles.developerActions}>
              <TouchableOpacity
                style={[styles.actionButton, { borderColor: theme.primary }]}
                onPress={() => openLink(dev.github)}
              >
                <Ionicons name="logo-github" size={16} color={theme.text} />
                <Text style={[styles.actionText, { color: theme.text }]}>
                  GitHub
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { borderColor: theme.primary }]}
                onPress={() => openLink(`mailto:${dev.email}`)}
              >
                <Ionicons name="mail" size={16} color={theme.text} />
                <Text style={[styles.actionText, { color: theme.text }]}>
                  E-mail
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Project Info */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Sobre o Projeto
        </Text>

        <View
          style={[styles.infoCard, { backgroundColor: theme.inputBackground }]}
        >
          <Text style={[styles.projectDescription, { color: theme.text }]}>
            SentinelTrack é uma aplicação mobile desenvolvida como parte do
            Challenge FIAP 2025 - 2º Semestre. O app permite gerenciar
            motocicletas em pátios logísticos, com funcionalidades de cadastro,
            visualização em dashboard e geração de relatórios.
          </Text>

          <View style={styles.techStack}>
            <Text style={[styles.techTitle, { color: theme.text }]}>
              Tecnologias Utilizadas:
            </Text>
            <Text style={[styles.techItem, { color: theme.text }]}>
              • React Native + Expo
            </Text>
            <Text style={[styles.techItem, { color: theme.text }]}>
              • Firebase Authentication
            </Text>
            <Text style={[styles.techItem, { color: theme.text }]}>
              • React Navigation
            </Text>
            <Text style={[styles.techItem, { color: theme.text }]}>
              • Push Notifications
            </Text>
            <Text style={[styles.techItem, { color: theme.text }]}>
              • Internacionalização (PT/ES)
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.text }]}>
          © 2025 FIAP - Todos os direitos reservados
        </Text>
        <Text style={[styles.footerText, { color: theme.text }]}>
          {i18n.t('about.license')}: MIT
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  appDescription: {
    fontSize: 16,
    opacity: 0.8,
    marginTop: 5,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  monospace: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  developerCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  developerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  developerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  developerInfo: {
    flex: 1,
  },
  developerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  developerRM: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
  },
  developerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 5,
  },
  projectDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  techStack: {
    marginTop: 10,
  },
  techTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  techItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 5,
  },
});
