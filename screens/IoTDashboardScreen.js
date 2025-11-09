import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import i18n from '../services/i18n_clean';
import iotService from '../services/api/iot';

const { width } = Dimensions.get('window');

/**
 * Tela de Dashboard IoT - Integração Multi-disciplinar
 * Challenge 2025 - 4º Sprint
 *
 * Funcionalidades:
 * - Monitoramento de dispositivos IoT
 * - Status das APIs (Java/Python)
 * - Alertas em tempo real
 * - Localização das motos
 * - Integração com banco relacional e MongoDB
 */
const IoTDashboardScreen = ({ navigation }) => {
  const { theme } = useTheme();

  // Estados
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [apiStatus, setApiStatus] = useState({
    java_api: false,
    python_api: false,
    timestamp: null,
  });
  const [dispositivos, setDispositivos] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [motos, setMotos] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    totalMotos: 0,
    motosDisponiveis: 0,
    motosEmUso: 0,
    dispositivosOnline: 0,
    alertasAtivos: 0,
  });

  // Carrega dados iniciais
  useEffect(() => {
    carregarDados();

    // Atualiza dados a cada 30 segundos
    const interval = setInterval(carregarDados, 30000);

    return () => clearInterval(interval);
  }, []);

  // Função principal para carregar todos os dados
  const carregarDados = async () => {
    try {
      setLoading(true);

      // Verifica status das APIs
      await verificarStatusAPIs();

      // Carrega dados em paralelo
      await Promise.all([
        carregarDispositivos(),
        carregarAlertas(),
        carregarMotos(),
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert(
        t('error'),
        t('iot.error_loading_data') || 'Erro ao carregar dados do sistema IoT'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Verifica status das APIs
  const verificarStatusAPIs = async () => {
    try {
      const status = await iotService.integracao.verificarStatus();
      setApiStatus(status);
    } catch (error) {
      console.error('Erro ao verificar APIs:', error);
    }
  };

  // Carrega dispositivos IoT
  const carregarDispositivos = async () => {
    try {
      const response = await iotService.dispositivos.listar();
      if (response.success) {
        setDispositivos(response.data.devices || []);

        // Atualiza estatísticas
        const online =
          response.data.devices?.filter(d => d.status === 'online').length || 0;
        setEstatisticas(prev => ({
          ...prev,
          dispositivosOnline: online,
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar dispositivos:', error);
    }
  };

  // Carrega alertas
  const carregarAlertas = async () => {
    try {
      const response = await iotService.alertas.listar('OPEN', 10);
      if (response.success) {
        setAlertas(response.data.items || []);

        // Atualiza estatísticas
        setEstatisticas(prev => ({
          ...prev,
          alertasAtivos: response.data.items?.length || 0,
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar alertas:', error);
    }
  };

  // Carrega motos
  const carregarMotos = async () => {
    try {
      const response = await iotService.motos.listar('ALL');
      if (response.success && response.data.success) {
        setMotos(response.data.motos || []);

        // Atualiza estatísticas
        const resumo = response.data.resumo || {};
        setEstatisticas(prev => ({
          ...prev,
          totalMotos: resumo.total || 0,
          motosDisponiveis: resumo.disponiveis || 0,
          motosEmUso: resumo.emUso || 0,
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar motos:', error);
    }
  };

  // Refresh manual
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregarDados();
  }, []);

  // Navega para detalhes do dispositivo
  const verDetalhesDispositivo = dispositivo => {
    Alert.alert(
      dispositivo.nome || dispositivo.id,
      `Tipo: ${dispositivo.tipo}\nStatus: ${dispositivo.status}\nLocalização: ${dispositivo.localizacao || 'N/A'}`,
      [{ text: 'OK' }]
    );
  };

  // Resolve alerta
  const resolverAlerta = async alerta => {
    try {
      Alert.alert(
        t('iot.resolve_alert') || 'Resolver Alerta',
        `${alerta.title}\n\n${alerta.message}`,
        [
          { text: t('cancel') || 'Cancelar', style: 'cancel' },
          {
            text: t('resolve') || 'Resolver',
            onPress: async () => {
              try {
                await iotService.alertas.resolver(alerta.id, 'mobile_user');
                carregarAlertas(); // Recarrega alertas
                Alert.alert(
                  t('success') || 'Sucesso',
                  t('iot.alert_resolved') || 'Alerta resolvido com sucesso'
                );
              } catch (error) {
                Alert.alert(t('error') || 'Erro', error.message);
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(t('error') || 'Erro', error.message);
    }
  };

  // Busca moto por placa
  const buscarMoto = () => {
    Alert.prompt(
      t('iot.search_motorcycle') || 'Buscar Motocicleta',
      t('iot.enter_plate') || 'Digite a placa da moto:',
      async placa => {
        if (placa) {
          try {
            const response = await iotService.motos.buscarPorPlaca(placa);
            if (response.success && response.data.encontrada) {
              const moto = response.data.moto;
              Alert.alert(
                `Moto ${placa}`,
                `Status: ${moto.statusMoto}\nBateria: ${moto.nivelBateria}%\nLocalização: ${moto.localizacaoCompleta}`,
                [{ text: 'OK' }]
              );
            } else {
              Alert.alert(
                t('not_found') || 'Não encontrada',
                `Moto com placa ${placa} não foi encontrada`
              );
            }
          } catch (error) {
            Alert.alert(t('error') || 'Erro', error.message);
          }
        }
      }
    );
  };

  // Renderiza card de estatística
  const renderStatCard = (title, value, color, icon) => (
    <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.statIcon, { color }]}>{icon}</Text>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statTitle, { color: theme.textSecondary }]}>
        {title}
      </Text>
    </View>
  );

  // Renderiza status da API
  const renderApiStatus = (name, status) => (
    <View style={styles.apiStatusItem}>
      <View
        style={[
          styles.statusIndicator,
          { backgroundColor: status ? '#4CAF50' : '#F44336' },
        ]}
      />
      <Text style={[styles.apiStatusText, { color: theme.text }]}>
        {name}: {status ? 'Online' : 'Offline'}
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          { backgroundColor: theme.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.text }]}>
          {t('iot.loading_dashboard') || 'Carregando Dashboard IoT...'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.primary]}
          tintColor={theme.primary}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {t('iot.dashboard_title') || 'Dashboard IoT'}
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          {t('iot.integration_subtitle') || 'Integração Multi-disciplinar'}
        </Text>
      </View>

      {/* Status das APIs */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('iot.api_status') || 'Status das APIs'}
        </Text>
        <View style={styles.apiStatusContainer}>
          {renderApiStatus('Java API', apiStatus.java_api)}
          {renderApiStatus('Python API', apiStatus.python_api)}
        </View>
        <Text style={[styles.lastUpdate, { color: theme.textSecondary }]}>
          {t('iot.last_update') || 'Última atualização'}:{' '}
          {apiStatus.timestamp
            ? new Date(apiStatus.timestamp).toLocaleTimeString()
            : 'N/A'}
        </Text>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        {renderStatCard(
          t('iot.total_motorcycles') || 'Total Motos',
          estatisticas.totalMotos,
          '#2196F3',
          '🏍️'
        )}
        {renderStatCard(
          t('iot.available') || 'Disponíveis',
          estatisticas.motosDisponiveis,
          '#4CAF50',
          '✅'
        )}
        {renderStatCard(
          t('iot.in_use') || 'Em Uso',
          estatisticas.motosEmUso,
          '#FF9800',
          '🔄'
        )}
        {renderStatCard(
          t('iot.devices_online') || 'Dispositivos Online',
          estatisticas.dispositivosOnline,
          '#9C27B0',
          '📡'
        )}
        {renderStatCard(
          t('iot.active_alerts') || 'Alertas Ativos',
          estatisticas.alertasAtivos,
          '#F44336',
          '🚨'
        )}
      </View>

      {/* Ações Rápidas */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {t('iot.quick_actions') || 'Ações Rápidas'}
        </Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.primary }]}
            onPress={buscarMoto}
          >
            <Text style={styles.actionButtonText}>
              🔍 {t('iot.search_motorcycle') || 'Buscar Moto'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.secondary }]}
            onPress={() => navigation.navigate('Relatorios')}
          >
            <Text style={styles.actionButtonText}>
              📊 {t('iot.reports') || 'Relatórios'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Alertas Recentes */}
      {alertas.length > 0 && (
        <View
          style={[styles.section, { backgroundColor: theme.cardBackground }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('iot.recent_alerts') || 'Alertas Recentes'}
          </Text>
          {alertas.slice(0, 3).map((alerta, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.alertItem,
                {
                  borderLeftColor:
                    alerta.severity === 'HIGH' ? '#F44336' : '#FF9800',
                },
              ]}
              onPress={() => resolverAlerta(alerta)}
            >
              <Text style={[styles.alertTitle, { color: theme.text }]}>
                {alerta.title}
              </Text>
              <Text
                style={[styles.alertMessage, { color: theme.textSecondary }]}
                numberOfLines={2}
              >
                {alerta.message}
              </Text>
              <Text style={[styles.alertTime, { color: theme.textSecondary }]}>
                {alerta.createdAt
                  ? new Date(alerta.createdAt).toLocaleString()
                  : 'N/A'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Dispositivos IoT */}
      {dispositivos.length > 0 && (
        <View
          style={[styles.section, { backgroundColor: theme.cardBackground }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {t('iot.devices') || 'Dispositivos IoT'}
          </Text>
          {dispositivos.slice(0, 5).map((dispositivo, index) => (
            <TouchableOpacity
              key={index}
              style={styles.deviceItem}
              onPress={() => verDetalhesDispositivo(dispositivo)}
            >
              <View style={styles.deviceInfo}>
                <Text style={[styles.deviceName, { color: theme.text }]}>
                  {dispositivo.nome || dispositivo.id}
                </Text>
                <Text
                  style={[styles.deviceType, { color: theme.textSecondary }]}
                >
                  {dispositivo.tipo}
                </Text>
              </View>
              <View
                style={[
                  styles.deviceStatus,
                  {
                    backgroundColor:
                      dispositivo.status === 'online' ? '#4CAF50' : '#F44336',
                  },
                ]}
              >
                <Text style={styles.deviceStatusText}>
                  {dispositivo.status === 'online' ? 'ON' : 'OFF'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Footer com informações de integração */}
      <View style={[styles.footer, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          {t('iot.integration_info') ||
            'Integração com Oracle DB, MongoDB e APIs Java/Python'}
        </Text>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Challenge 2025 - 4º Sprint
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  apiStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  apiStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  apiStatusText: {
    fontSize: 14,
  },
  lastUpdate: {
    fontSize: 12,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  statCard: {
    width: (width - 48) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statTitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  alertItem: {
    padding: 12,
    borderLeftWidth: 4,
    marginBottom: 8,
    borderRadius: 4,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertMessage: {
    fontSize: 14,
    marginTop: 4,
  },
  alertTime: {
    fontSize: 12,
    marginTop: 8,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceType: {
    fontSize: 14,
    marginTop: 2,
  },
  deviceStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  deviceStatusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default IoTDashboardScreen;
