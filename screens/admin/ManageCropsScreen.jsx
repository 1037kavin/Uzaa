import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCrop } from '../../store/slices/cropSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Loading from '../../components/ui/Loading';

const ManageCropsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { crops, isLoading } = useSelector((state) => state.crops);
  
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    filterCrops();
  }, [crops, activeFilter]);

  const filterCrops = () => {
    if (activeFilter === 'all') {
      setFilteredCrops(crops);
    } else {
      setFilteredCrops(crops.filter(crop => 
        crop.season.toLowerCase().includes(activeFilter.toLowerCase())
      ));
    }
  };

  const handleAddCrop = () => {
    navigation.navigate('CropForm');
  };

  const handleEditCrop = (crop) => {
    navigation.navigate('CropForm', { crop, isEditing: true });
  };

  const handleDeleteCrop = (cropId) => {
    Alert.alert(
      "Delete Crop",
      "Are you sure you want to delete this crop? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            dispatch(deleteCrop(cropId));
            Alert.alert("Success", "Crop deleted successfully");
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleManageFertilizers = () => {
    navigation.navigate('ManageFertilizers');
  };

  const renderFilterButton = (title, value) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === value && styles.activeFilterButton,
      ]}
      onPress={() => setActiveFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          activeFilter === value && styles.activeFilterButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderCropItem = ({ item }) => (
    <View style={styles.cropItem}>
      <View style={styles.cropInfo}>
        <View style={styles.cropHeader}>
          <Text style={styles.cropName}>{item.name}</Text>
          <Text style={styles.cropSeason}>{item.season}</Text>
        </View>
        
        <Text style={styles.cropScientificName}>{item.scientificName}</Text>
        
        <View style={styles.cropDetails}>
          <Text style={styles.cropDetailLabel}>Soil Types:</Text>
          <Text style={styles.cropDetailValue}>{item.soilTypes.join(', ')}</Text>
        </View>
        
        <View style={styles.cropDetails}>
          <Text style={styles.cropDetailLabel}>Water Requirement:</Text>
          <Text style={styles.cropDetailValue}>{item.waterRequirement}</Text>
        </View>
      </View>
      
      <View style={styles.cropActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditCrop(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteCrop(item.id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No crops found</Text>
      <Text style={styles.emptySubtext}>Add a new crop or change your filter</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Manage Crops" 
        rightComponent={
          <Button
            title="Add New"
            onPress={handleAddCrop}
            size="small"
          />
        }
      />
      
      <View style={styles.actionsContainer}>
        <Button
          title="Manage Fertilizers"
          onPress={handleManageFertilizers}
          type="secondary"
          style={styles.fertilizerButton}
        />
      </View>
      
      <View style={styles.filtersContainer}>
        {renderFilterButton('All', 'all')}
        {renderFilterButton('Kharif', 'kharif')}
        {renderFilterButton('Rabi', 'rabi')}
        {renderFilterButton('Zaid', 'zaid')}
      </View>
      
      {isLoading ? (
        <Loading fullScreen />
      ) : (
        <FlatList
          data={filteredCrops}
          keyExtractor={(item) => item.id}
          renderItem={renderCropItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  actionsContainer: {
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.md,
  },
  fertilizerButton: {
    marginBottom: SIZES.sm,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
  },
  filterButton: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    marginRight: SIZES.sm,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.card,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  activeFilterButtonText: {
    color: COLORS.textPrimary,
  },
  listContent: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xxl,
  },
  cropItem: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.md,
  },
  cropInfo: {
    marginBottom: SIZES.sm,
  },
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  cropName: {
    ...FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SIZES.sm,
  },
  cropSeason: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: SIZES.radius,
  },
  cropScientificName: {
    ...FONTS.regular,
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    marginBottom: SIZES.sm,
  },
  cropDetails: {
    flexDirection: 'row',
    marginBottom: SIZES.xs,
  },
  cropDetailLabel: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
    width: 120,
  },
  cropDetailValue: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
  },
  cropActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SIZES.sm,
  },
  actionButton: {
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.sm,
    borderRadius: SIZES.radius,
    marginLeft: SIZES.sm,
  },
  editButton: {
    backgroundColor: COLORS.secondary,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
  },
  actionButtonText: {
    ...FONTS.medium,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xxl,
  },
  emptyText: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
  },
  emptySubtext: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default ManageCropsScreen;
