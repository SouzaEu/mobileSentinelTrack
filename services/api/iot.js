import { api } from './client';

/**
 * Serviço de integração IoT para SentinelTrack
 * Challenge 2025 - 4º Sprint - Integração Multi-disciplinar
 *
 * Integra com:
 * - API Java/Spring Boot (porta 8080)
 * - API Python VisionMoto (porta 5001)
 * - Banco de dados Oracle + MongoDB
 */

// Configuração das APIs
const JAVA_API_PORT = 8080;
const PYTHON_API_PORT = 5001;

// Cliente para API Java
const javaApi = api.create({
  baseURL: `http://localhost:${JAVA_API_PORT}/api`,
  timeout: 10000,
});

// Cliente para API Python (VisionMoto)
const pythonApi = api.create({
  baseURL: `http://localhost:${PYTHON_API_PORT}/api`,
  timeout: 10000,
});

/**
 * Serviços de Motos - Integração Multi-API
 */
export const motosService = {
  // Listar motos (prioriza Java API, fallback para Python)
  async listar(status = 'DISPONIVEL') {
    try {
      // Tenta API Java primeiro
      const response = await javaApi.get('/mobile/motos', {
        params: { status },
      });

      return {
        success: true,
        data: response.data,
        source: 'java_api',
      };
    } catch (javaError) {
      console.warn(
        'Java API indisponível, tentando Python API:',
        javaError.message
      );

      try {
        // Fallback para Python API
        const response = await pythonApi.get('/mobile/motos');

        return {
          success: true,
          data: {
            success: true,
            motos: response.data.motos || [],
            resumo: {
              total: response.data.total || 0,
              disponiveis: response.data.disponiveis || 0,
            },
            message: 'Dados obtidos via Python API',
            timestamp: new Date().toISOString(),
          },
          source: 'python_api',
        };
      } catch (pythonError) {
        throw new Error(
          `APIs indisponíveis - Java: ${javaError.message}, Python: ${pythonError.message}`
        );
      }
    }
  },

  // Buscar moto por placa
  async buscarPorPlaca(placa) {
    try {
      // Tenta API Java primeiro
      const response = await javaApi.get(`/mobile/motos/buscar/${placa}`);

      return {
        success: true,
        data: response.data,
        source: 'java_api',
      };
    } catch (javaError) {
      console.warn(
        'Java API indisponível, tentando Python API:',
        javaError.message
      );

      try {
        // Fallback para Python API
        const response = await pythonApi.get(`/mobile/motos/buscar/${placa}`);

        return {
          success: true,
          data: response.data,
          source: 'python_api',
        };
      } catch (pythonError) {
        throw new Error(
          `Moto não encontrada - Java: ${javaError.message}, Python: ${pythonError.message}`
        );
      }
    }
  },

  // Reservar moto
  async reservar(placaMoto, cpfUsuario, observacoes = '') {
    try {
      // Usa API Java para reserva (tem procedures)
      const response = await javaApi.post(
        `/mobile/motos/${placaMoto}/reservar`,
        {
          cpfUsuario,
          observacoes,
        }
      );

      return {
        success: true,
        data: response.data,
        source: 'java_api',
      };
    } catch (error) {
      throw new Error(`Erro ao reservar moto: ${error.message}`);
    }
  },

  // Finalizar uso
  async finalizarUso(
    placaMoto,
    cpfUsuario,
    localizacaoFinal,
    observacoes = ''
  ) {
    try {
      // Chama procedure Java para finalizar uso
      const response = await javaApi.post(
        `/mobile/motos/${placaMoto}/finalizar`,
        {
          cpfUsuario,
          localizacaoFinal,
          observacoes,
        }
      );

      return {
        success: true,
        data: response.data,
        source: 'java_api',
      };
    } catch (error) {
      throw new Error(`Erro ao finalizar uso: ${error.message}`);
    }
  },
};

/**
 * Serviços de Dispositivos IoT
 */
export const dispositivosService = {
  // Listar dispositivos
  async listar() {
    try {
      const response = await pythonApi.get('/iot/devices');

      return {
        success: true,
        data: response.data,
        source: 'python_api',
      };
    } catch (error) {
      throw new Error(`Erro ao listar dispositivos: ${error.message}`);
    }
  },

  // Enviar evento IoT
  async enviarEvento(evento) {
    try {
      const response = await pythonApi.post('/iot/eventos', evento, {
        headers: {
          'Idempotency-Key': evento.id || `EVT-${Date.now()}`,
        },
      });

      return {
        success: true,
        data: response.data,
        source: 'python_api',
      };
    } catch (error) {
      throw new Error(`Erro ao enviar evento IoT: ${error.message}`);
    }
  },
};

/**
 * Serviços de Alertas
 */
export const alertasService = {
  // Listar alertas
  async listar(status = 'OPEN', limit = 50, offset = 0) {
    try {
      const response = await pythonApi.get('/mobile/alertas', {
        params: { status, limit, offset },
      });

      return {
        success: true,
        data: response.data,
        source: 'python_api',
      };
    } catch (error) {
      throw new Error(`Erro ao listar alertas: ${error.message}`);
    }
  },

  // Resolver alerta
  async resolver(alertId, resolvidoPor) {
    try {
      const response = await pythonApi.patch(
        `/mobile/alertas/${alertId}/resolver`,
        {
          resolvedBy: resolvidoPor,
        }
      );

      return {
        success: true,
        data: response.data,
        source: 'python_api',
      };
    } catch (error) {
      throw new Error(`Erro ao resolver alerta: ${error.message}`);
    }
  },
};

/**
 * Serviços de Localização
 */
export const localizacaoService = {
  // Atualizar localização da moto
  async atualizar(dadosLocalizacao) {
    try {
      // Usa API Java que tem procedures de localização
      const response = await javaApi.post(
        '/iot/localizacao/atualizar',
        dadosLocalizacao
      );

      return {
        success: true,
        data: response.data,
        source: 'java_api',
      };
    } catch (error) {
      throw new Error(`Erro ao atualizar localização: ${error.message}`);
    }
  },

  // Buscar motos próximas
  async buscarProximas(latitude, longitude, raio = 1.0) {
    try {
      const response = await javaApi.get('/mobile/motos/proximas', {
        params: { latitude, longitude, raio },
      });

      return {
        success: true,
        data: response.data,
        source: 'java_api',
      };
    } catch (error) {
      throw new Error(`Erro ao buscar motos próximas: ${error.message}`);
    }
  },
};

/**
 * Serviços de Relatórios
 */
export const relatoriosService = {
  // Gerar relatório de uso
  async gerarRelatorioUso(filtros = {}) {
    try {
      const response = await javaApi.post('/mobile/relatorios/uso', filtros);

      return {
        success: true,
        data: response.data,
        source: 'java_api',
      };
    } catch (error) {
      throw new Error(`Erro ao gerar relatório: ${error.message}`);
    }
  },

  // Exportar dados
  async exportarDados(formato = 'json') {
    try {
      const response = await javaApi.get(`/database/export/${formato}`);

      return {
        success: true,
        data: response.data,
        source: 'java_api',
      };
    } catch (error) {
      throw new Error(`Erro ao exportar dados: ${error.message}`);
    }
  },
};

/**
 * Serviços de Notificações Push
 */
export const notificacoesService = {
  // Registrar token push
  async registrarToken(token, userId, platform = 'android') {
    try {
      const response = await pythonApi.post('/mobile/devices/register', {
        token,
        userId,
        platform,
      });

      return {
        success: true,
        data: response.data,
        source: 'python_api',
      };
    } catch (error) {
      throw new Error(`Erro ao registrar token push: ${error.message}`);
    }
  },
};

/**
 * Serviços de Integração - Testa conectividade das APIs
 */
export const integracaoService = {
  // Verificar status das APIs
  async verificarStatus() {
    const status = {
      java_api: false,
      python_api: false,
      timestamp: new Date().toISOString(),
    };

    // Testa API Java
    try {
      await javaApi.get('/health', { timeout: 3000 });
      status.java_api = true;
    } catch (error) {
      console.warn('Java API offline:', error.message);
    }

    // Testa API Python
    try {
      await pythonApi.get('/health', { timeout: 3000 });
      status.python_api = true;
    } catch (error) {
      console.warn('Python API offline:', error.message);
    }

    return status;
  },

  // Sincronizar dados entre APIs
  async sincronizarDados() {
    try {
      const response = await javaApi.post('/sync/databases');

      return {
        success: true,
        data: response.data,
        source: 'java_api',
      };
    } catch (error) {
      throw new Error(`Erro na sincronização: ${error.message}`);
    }
  },
};

/**
 * Configuração de interceptors para as APIs específicas
 */

// Interceptor para API Java
javaApi.interceptors.request.use(
  config => {
    // Adiciona headers específicos para Java API
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para API Python
pythonApi.interceptors.request.use(
  config => {
    // Adiciona headers específicos para Python API
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor de resposta para logging
[javaApi, pythonApi].forEach(apiClient => {
  apiClient.interceptors.response.use(
    response => {
      console.log(`✅ API Response [${response.config.baseURL}]:`, {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
      return response;
    },
    error => {
      console.error(`❌ API Error [${error.config?.baseURL}]:`, {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
      });
      return Promise.reject(error);
    }
  );
});

export default {
  motos: motosService,
  dispositivos: dispositivosService,
  alertas: alertasService,
  localizacao: localizacaoService,
  relatorios: relatoriosService,
  notificacoes: notificacoesService,
  integracao: integracaoService,
};
