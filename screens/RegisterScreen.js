import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../contexts/ThemeContext';
import i18n from '../services/i18n_clean';

export default function RegisterScreen({ onRegisterSuccess }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  const handleRegister = async () => {
    if (isLoading) return; // prevent double submits

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      Alert.alert('Erro', 'O e-mail não pode estar vazio.');
      return;
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    if (senha !== confirmSenha) {
      Alert.alert(i18n.t('common.error'), i18n.t('auth.passwordsDontMatch2'));
      return;
    }

    setIsLoading(true);
    try {
  ErrorHandler.log(`Tentativa de cadastro: ${trimmedEmail}`,'Register');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        senha
      );
      const user = userCredential.user;

      onRegisterSuccess &&
        onRegisterSuccess({
          uid: user.uid,
          email: user.email,
        });
    } catch (error) {
      ErrorHandler.log(error, 'Register');
      const code = error?.code || error?.message || '';
      // Handle common Firebase errors with friendlier messages
        if (code.includes('auth/email-already-in-use')) {
          Alert.alert(
            i18n.t('auth.emailAlreadyInUseTitle'),
            i18n.t('auth.emailAlreadyInUse'),
            [
              {
                text: i18n.t('auth.goToLogin'),
                onPress: () => navigation.navigate('Login', { email: email.trim() }),
              },
              {
                text: i18n.t('auth.forgotPasswordAction'),
                onPress: async () => {
                  try {
                    await sendPasswordResetEmail(auth, email.trim());
                    Alert.alert(i18n.t('auth.emailSent'), i18n.t('auth.checkEmailReset'));
                  } catch (resetError) {
                    console.error('Erro enviando reset:', resetError);
                    Alert.alert(i18n.t('common.error'), resetError?.message || i18n.t('auth.errorSendingReset'));
                  }
                },
              },
              { text: i18n.t('common.cancel'), style: 'cancel' },
            ],
            { cancelable: true }
          );
      } else if (code.includes('auth/invalid-email')) {
        Alert.alert(i18n.t('common.error'), i18n.t('auth.invalidEmailError'));
      } else if (code.includes('auth/weak-password')) {
        Alert.alert(i18n.t('common.error'), i18n.t('auth.weakPassword'));
      } else {
        Alert.alert(i18n.t('common.error'), error?.message || i18n.t('auth.registrationError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => navigation.navigate('Login');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Botão para voltar ao Login */}
      <TouchableOpacity style={styles.backBtn} onPress={goToLogin}>
        <Ionicons name="arrow-back" size={22} color={theme.text} />
        <Text style={[styles.backText, { color: theme.text }]}>{i18n.t('auth.back')}</Text>
      </TouchableOpacity>

      <Text style={[styles.logo, { color: theme.text }]}>
        S<Text style={{ color: theme.primary }}>T</Text> - {i18n.t('auth.register')}
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
          placeholder={i18n.t('auth.confirmPassword')}
          style={[styles.input, { color: theme.text }]}
          placeholderTextColor={theme.text}
          secureTextEntry
          value={confirmSenha}
          onChangeText={setConfirmSenha}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isLoading ? '#999' : theme.primary },
        ]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={[styles.buttonText, { color: theme.background }]}>
          {isLoading ? i18n.t('auth.registering') : i18n.t('auth.register')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  backText: { marginLeft: 6, fontSize: 16 },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: { marginRight: 5 },
  input: { flex: 1, height: 50 },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: { textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});
