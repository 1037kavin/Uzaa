import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFertilizer } from '../../store/slices/cropSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Loading from '../../components/ui/Loading';

const ManageFertilizersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { fertilizers, isLoading } = useSelector((state) => state.crops);

  const handleAddFertilizer = () => {
    navigation.navigate('FertilizerForm');
  };

  const handleEditFertilizer = (fertilizer) => {
    navigation.navigate('FertilizerForm', { fertilizer, isEditing: true });
  };

  const handleDeleteFertilizer = (fertilizerId) => {
    Alert.alert(
      "Delete Fertilizer",
      "Are you sure you want to delete this fertilizer? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            dispatch(deleteFertilizer(fertilizerId));
            Alert.alert("Success", "Fertilizer deleted successfully");
          },
          style: "destructive"
        }
      ]
    );
  };

  const renderFertilizerItem = ({ item }) => (
    <View style={styles.fertilizerItem}>
      <View style={styles.fertilizerInfo}>
        <View style={styles.fertilizerHeader}>
          <Text style={styles.fertilizerName}>{item.name}</Text>
          <Text style={styles.fertilizerNutrient}>{item.nutrientContent}</Text>
        </View>
        
        <View style={styles.fertilizerDetails}>
          <Text style={styles.fertilizerDetailLabel}>Suitable for:</Text>
          <Text style={styles.fertilizerDetailValue}>{item.crops.join(', ')}</Text>
        </View>
        
        <View style={styles.fertilizerDetails}>
          <Text style={styles.fertilizerDetailLabel}>Application:</Text>
          <Text style={styles.fertilizerDetailValue}>{item.application}</Text>
        </View>
        
        <View style={styles.fertilizerDetails}>
          <Text style={styles.fertilizerDetailLabel}>Precautions:</Text>
          <Text style={styles.fertilizerDetailValue}>{item.precautions}</Text>
        </View>
      </View>
      
      <View style={styles.fertilizerActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditFertilizer(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteFertilizer(item.id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No fertilizers found</Text>
      <Text style={styles.emptySubtext}>Add a new fertilizer using the button above</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Manage Fertilizers" 
        rightComponent={
          <Button
            title="Add New"
            onPress={handleAddFertilizer}
            size="small"
          />
        }
      />
      
      {isLoading ? (
        <Loading fullScreen />
      ) : (
        <FlatList
          data={fertilizers}
          keyExtractor={(item) => item.id}
          renderItem={renderFertilizerItem}
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
  listContent: {
    padding: SIZES.lg,
    paddingBottom: SIZES.xxl,
  },
  fertilizerItem: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.md,
  },
  fertilizerInfo: {
    marginBottom: SIZES.sm,
  },
  fertilizerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  fertilizerName: {
    ...FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  fertilizerNutrient: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.secondary,
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: SIZES.radius,
  },
  fertilizerDetails: {
    marginBottom: SIZES.xs,
  },
  fertilizerDetailLabel: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  fertilizerDetailValue: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  fertilizerActions: {
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

export default ManageFertilizersScreen;
