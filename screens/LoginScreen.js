import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import ErrorHandler from '../services/errorHandler';
import i18n from '../services/i18n_clean';

export default function LoginScreen({ onLoginSuccess, route }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState(route?.params?.email || '');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (isLoading) return;
    ErrorHandler.log(`Clique no login: ${email}`, 'Login');
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );
      ErrorHandler.log(
        `Sucesso no login: ${userCredential.user.email}`,
        'Login'
      );
      const user = userCredential.user;
      onLoginSuccess?.(user);
    } catch (error) {
      ErrorHandler.log(error, 'Login');
      ErrorHandler.showAlert(error, i18n.t('auth.loginErrorGeneric'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.logo, { color: theme.text }]}>
        Sentinel<Text style={{ color: theme.primary }}>Track</Text>
      </Text>

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: theme.inputBackground },
        ]}
      >
        <Ionicons
          name="mail-outline"
          size={20}
          color={theme.text}
          style={styles.icon}
        />
        <TextInput
          placeholder={i18n.t('auth.email')}
          style={[styles.input, { color: theme.text }]}
          placeholderTextColor={theme.text}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: theme.inputBackground },
        ]}
      >
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={theme.text}
          style={styles.icon}
        />
        <TextInput
          placeholder={i18n.t('auth.password')}
          style={[styles.input, { color: theme.text }]}
          placeholderTextColor={theme.text}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isLoading ? '#999' : theme.primary },
        ]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={[styles.buttonText, { color: theme.background }]}>
          {isLoading ? i18n.t('auth.loggingIn') : i18n.t('auth.login')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={[styles.forgot, { color: theme.text }]}>
          {i18n.t('auth.forgotPassword')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.register, { color: theme.primary }]}>
          {i18n.t('auth.dontHaveAccount')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Ionicons
          name={theme.background === '#FFFFFF' ? 'moon' : 'sunny'}
          size={20}
          color={theme.text}
        />
        <Text style={[styles.themeText, { color: theme.text }]}>
          {theme.background === '#FFFFFF'
            ? i18n.t('theme.darkTheme')
            : i18n.t('theme.lightTheme')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  logoHighlight: {
    color: '#B6FF00',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 50,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgot: {
    textAlign: 'center',
    marginTop: 20,
  },
  register: {
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 8,
  },
  themeText: {
    fontSize: 14,
  },
});
