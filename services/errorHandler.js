import { Alert } from 'react-native';

/**
 * Error Handler Centralizado
 * Padroniza o tratamento de erros na aplicação
 */

class ErrorHandler {
  /**
   * Loga o erro no console (desenvolvimento) e em serviço de monitoramento (produção)
   */
  static log(error, context = '') {
    const timestamp = new Date().toISOString();
    const errorMessage = error?.message || String(error);

    console.error(`[${timestamp}] ${context}:`, {
      message: errorMessage,
      stack: error?.stack,
      code: error?.code,
      status: error?.status,
    });

    // TODO: Integrar com serviço de monitoramento (Sentry, Firebase Crashlytics, etc)
    // if (__DEV__ === false) {
    //   Sentry.captureException(error, { tags: { context } });
    // }
  }

  /**
   * Exibe erro para o usuário de forma amigável
   */
  static showAlert(error, context = 'Erro') {
    this.log(error, context);

    const message = this.getUserFriendlyMessage(error);
    Alert.alert(context, message);
  }

  /**
   * Converte erros técnicos em mensagens amigáveis
   */
  static getUserFriendlyMessage(error) {
    // Erros de rede
    if (error?.message?.includes('Network Error') || error?.status === 0) {
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }

    // Timeout
    if (error?.message?.includes('timeout')) {
      return 'A operação demorou muito. Tente novamente.';
    }

    // Erros da API
    if (error?.status >= 400 && error?.status < 500) {
      return error?.message || 'Dados inválidos. Verifique e tente novamente.';
    }

    if (error?.status >= 500) {
      return 'Erro no servidor. Tente novamente mais tarde.';
    }

    // Firebase Auth
    if (error?.code?.includes('auth/')) {
      return this.getFirebaseAuthMessage(error.code);
    }

    // Mensagem genérica
    return error?.message || 'Ocorreu um erro inesperado.';
  }

  /**
   * Mensagens específicas para erros do Firebase Auth
   */
  static getFirebaseAuthMessage(code) {
    const messages = {
      'auth/invalid-email': 'E-mail inválido.',
      'auth/user-disabled': 'Esta conta foi desabilitada.',
      'auth/user-not-found': 'Usuário não encontrado.',
      'auth/wrong-password': 'Senha incorreta.',
      'auth/invalid-credential': 'E-mail ou senha incorretos.',
      'auth/email-already-in-use': 'Este e-mail já está em uso.',
      'auth/weak-password': 'Senha fraca. Use pelo menos 6 caracteres.',
      'auth/operation-not-allowed': 'Operação não permitida.',
      'auth/too-many-requests':
        'Muitas tentativas. Tente novamente mais tarde.',
    };

    return messages[code] || 'Erro de autenticação.';
  }

  /**
   * Handler para erros em promises não tratadas
   */
  static handleUnhandledRejection(error) {
    this.log(error, 'Unhandled Promise Rejection');
  }

  /**
   * Wrapper para operações assíncronas com tratamento automático
   */
  static async handle(operation, errorContext = 'Operação') {
    try {
      return await operation();
    } catch (error) {
      this.showAlert(error, errorContext);
      throw error; // Re-throw para permitir tratamento adicional se necessário
    }
  }

  /**
   * Wrapper para operações assíncronas silenciosas (sem alert)
   */
  static async handleSilent(operation, errorContext = 'Operação') {
    try {
      return await operation();
    } catch (error) {
      this.log(error, errorContext);
      return null;
    }
  }
}

export default ErrorHandler;
