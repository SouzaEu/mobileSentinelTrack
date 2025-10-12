import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';

// API imports
import {
  listMotorcycles,
  createMotorcycle,
  updateMotorcycle,
  deleteMotorcycle,
  moveMotorcycle,
} from '../services/api/motorcycles';
import { listSectors } from '../services/api/sectors';

// Services
import { sendMotorcycleNotification } from '../services/notificationService';
import { validateBrazilianLicensePlate, validateYear } from '../services/api/validators';
import i18n from '../services/i18n';

export default function MotorcycleManagementScreen() {
  const { theme } = useContext(ThemeContext);
  
  // State
  const [motorcycles, setMotorcycles] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMotorcycle, setEditingMotorcycle] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    licensePlate: '',
    model: '',
    brand: '',
    color: '',
    year: '',
    sectorId: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [motorcyclesData, sectorsData] = await Promise.all([
        listMotorcycles(),
        listSectors(),
      ]);
      setMotorcycles(motorcyclesData);
      setSectors(sectorsData);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert(i18n.t('common.error'), 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const openModal = (motorcycle = null) => {
    if (motorcycle) {
      setEditingMotorcycle(motorcycle);
      setFormData({
        licensePlate: motorcycle.licensePlate || '',
        model: motorcycle.model || '',
        brand: motorcycle.brand || '',
        color: motorcycle.color || '',
        year: motorcycle.year?.toString() || '',
        sectorId: motorcycle.sectorId || '',
      });
    } else {
      setEditingMotorcycle(null);
      setFormData({
        licensePlate: '',
        model: '',
        brand: '',
        color: '',
        year: '',
        sectorId: sectors[0]?.id || '',
      });
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingMotorcycle(null);
    setFormData({
      licensePlate: '',
      model: '',
      brand: '',
      color: '',
      year: '',
      sectorId: '',
    });
  };

  const validateForm = () => {
    // Validar placa
    const plateValidation = validateBrazilianLicensePlate(formData.licensePlate);
    if (!plateValidation.isValid) {
      Alert.alert(i18n.t('common.error'), plateValidation.message);
      return false;
    }
    
    // Validar modelo
    if (!formData.model.trim()) {
      Alert.alert(i18n.t('common.error'), i18n.t('motorcycles.modelRequired'));
      return false;
    }
    
    // Validar ano
    if (formData.year) {
      const yearValidation = validateYear(formData.year);
      if (!yearValidation.isValid) {
        Alert.alert(i18n.t('common.error'), yearValidation.message);
        return false;
      }
    }
    
    // Validar setor
    if (!formData.sectorId) {
      Alert.alert(i18n.t('common.error'), 'Setor é obrigatório');
      return false;
    }
    
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      if (editingMotorcycle) {
        // Update existing motorcycle
        await updateMotorcycle(editingMotorcycle.motorcycleId, formData);
        Alert.alert(i18n.t('common.success'), i18n.t('motorcycles.motorcycleUpdated'));
      } else {
        // Create new motorcycle
        const motorcycleId = uuid.v4();
        await createMotorcycle({
          motorcycleId,
          ...formData,
        });
        
        // Send notification
        const sector = sectors.find(s => s.id === formData.sectorId);
        sendMotorcycleNotification.newMotorcycle(
          formData.licensePlate,
          sector?.name || 'Setor',
          'Nova vaga'
        );
        
        Alert.alert(i18n.t('common.success'), i18n.t('motorcycles.motorcycleAdded'));
      }
      
      closeModal();
      await loadData();
    } catch (error) {
      console.error('Error saving motorcycle:', error);
      Alert.alert(i18n.t('common.error'), error.message || 'Erro ao salvar moto');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (motorcycle) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir a moto ${motorcycle.licensePlate}?`,
      [
        { text: i18n.t('common.cancel'), style: 'cancel' },
        {
          text: i18n.t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await deleteMotorcycle(motorcycle.motorcycleId);
              
              // Send notification
              const sector = sectors.find(s => s.id === motorcycle.sectorId);
              sendMotorcycleNotification.motorcycleRemoved(
                motorcycle.licensePlate,
                sector?.name || 'Setor',
                'Vaga liberada'
              );
              
              Alert.alert(i18n.t('common.success'), i18n.t('motorcycles.motorcycleDeleted'));
              await loadData();
            } catch (error) {
              console.error('Error deleting motorcycle:', error);
              Alert.alert(i18n.t('common.error'), 'Erro ao excluir moto');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleMove = (motorcycle) => {
    const availableSectors = sectors.filter(s => s.id !== motorcycle.sectorId);
    
    if (availableSectors.length === 0) {
      Alert.alert('Aviso', 'Não há outros setores disponíveis');
      return;
    }

    Alert.alert(
      'Mover Moto',
      'Selecione o novo setor:',
      availableSectors.map(sector => ({
        text: sector.name,
        onPress: async () => {
          try {
            setLoading(true);
            await moveMotorcycle(motorcycle.motorcycleId, sector.id);
            
            sendMotorcycleNotification.spotAvailable(
              sector.name,
              'Nova localização'
            );
            
            Alert.alert(i18n.t('common.success'), 'Moto movida com sucesso!');
            await loadData();
          } catch (error) {
            console.error('Error moving motorcycle:', error);
            Alert.alert(i18n.t('common.error'), 'Erro ao mover moto');
          } finally {
            setLoading(false);
          }
        },
      })).concat([{ text: i18n.t('common.cancel'), style: 'cancel' }])
    );
  };

  const renderMotorcycle = ({ item }) => {
    const sector = sectors.find(s => s.id === item.sectorId);
    
    return (
      <View style={[styles.motorcycleCard, { backgroundColor: theme.inputBackground }]}>
        <View style={styles.motorcycleHeader}>
          <View style={styles.motorcycleInfo}>
            <Text style={[styles.licensePlate, { color: theme.text }]}>
              {item.licensePlate || 'N/A'}
            </Text>
            <Text style={[styles.motorcycleDetails, { color: theme.text }]}>
              {item.brand} {item.model} {item.year ? `(${item.year})` : ''}
            </Text>
            <Text style={[styles.sectorInfo, { color: theme.text }]}>
              📍 {sector?.name || 'Setor não encontrado'}
            </Text>
          </View>
          <View style={styles.motorcycleActions}>
            <TouchableOpacity
              style={[styles.actionButton, { borderColor: theme.primary }]}
              onPress={() => openModal(item)}
            >
              <Ionicons name="pencil" size={16} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { borderColor: '#4CAF50' }]}
              onPress={() => handleMove(item)}
            >
              <Ionicons name="swap-horizontal" size={16} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { borderColor: '#F44336' }]}
              onPress={() => handleDelete(item)}
            >
              <Ionicons name="trash" size={16} color="#F44336" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.text }]}>
          {i18n.t('common.loading')}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.inputBackground }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Gerenciar Motos
        </Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.primary }]}
          onPress={() => openModal()}
        >
          <Ionicons name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Motorcycle List */}
      <FlatList
        data={motorcycles}
        renderItem={renderMotorcycle}
        keyExtractor={(item) => item.motorcycleId || item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="motorbike-off"
              size={64}
              color={theme.text}
              style={{ opacity: 0.3 }}
            />
            <Text style={[styles.emptyText, { color: theme.text }]}>
              Nenhuma moto cadastrada
            </Text>
          </View>
        }
      />

      {/* Modal for Add/Edit */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.inputBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {editingMotorcycle ? i18n.t('motorcycles.editMotorcycle') : i18n.t('motorcycles.addMotorcycle')}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}
                placeholder={i18n.t('motorcycles.licensePlate')}
                placeholderTextColor={theme.text + '80'}
                value={formData.licensePlate}
                onChangeText={(text) => setFormData({ ...formData, licensePlate: text })}
                autoCapitalize="characters"
              />

              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}
                placeholder={i18n.t('motorcycles.brand')}
                placeholderTextColor={theme.text + '80'}
                value={formData.brand}
                onChangeText={(text) => setFormData({ ...formData, brand: text })}
              />

              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}
                placeholder={i18n.t('motorcycles.model')}
                placeholderTextColor={theme.text + '80'}
                value={formData.model}
                onChangeText={(text) => setFormData({ ...formData, model: text })}
              />

              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}
                placeholder={i18n.t('motorcycles.color')}
                placeholderTextColor={theme.text + '80'}
                value={formData.color}
                onChangeText={(text) => setFormData({ ...formData, color: text })}
              />

              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}
                placeholder={i18n.t('motorcycles.year')}
                placeholderTextColor={theme.text + '80'}
                value={formData.year}
                onChangeText={(text) => setFormData({ ...formData, year: text })}
                keyboardType="numeric"
              />

              <View style={[styles.pickerContainer, { backgroundColor: theme.inputBackground }]}>
                <Picker
                  selectedValue={formData.sectorId}
                  onValueChange={(value) => setFormData({ ...formData, sectorId: value })}
                  style={{ color: theme.text }}
                  dropdownIconColor={theme.text}
                >
                  <Picker.Item label={i18n.t('motorcycles.selectSector')} value="" />
                  {sectors.map((sector) => (
                    <Picker.Item
                      key={sector.id}
                      label={sector.name}
                      value={sector.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.cancelButtonText}>{i18n.t('common.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton, { backgroundColor: theme.primary }]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>{i18n.t('common.save')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
  },
  motorcycleCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  motorcycleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  motorcycleInfo: {
    flex: 1,
  },
  licensePlate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  motorcycleDetails: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 3,
  },
  sectorInfo: {
    fontSize: 12,
    opacity: 0.6,
  },
  motorcycleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 10,
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    borderRadius: 10,
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  saveButton: {
    // backgroundColor set dynamically
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
