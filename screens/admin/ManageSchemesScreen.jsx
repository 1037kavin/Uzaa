import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getSchemes, deleteScheme } from '../../store/slices/schemeSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Loading from '../../components/ui/Loading';

const ManageSchemesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { schemes, isLoading } = useSelector((state) => state.schemes);
  
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    dispatch(getSchemes());
  }, [dispatch]);

  useEffect(() => {
    filterSchemes();
  }, [schemes, activeFilter]);

  const filterSchemes = () => {
    if (activeFilter === 'all') {
      setFilteredSchemes(schemes);
    } else {
      setFilteredSchemes(schemes.filter(scheme => scheme.status.toLowerCase() === activeFilter));
    }
  };

  const handleAddScheme = () => {
    navigation.navigate('SchemeForm');
  };

  const handleEditScheme = (scheme) => {
    navigation.navigate('SchemeForm', { scheme, isEditing: true });
  };

  const handleDeleteScheme = (schemeId) => {
    Alert.alert(
      "Delete Scheme",
      "Are you sure you want to delete this scheme? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            dispatch(deleteScheme(schemeId));
            Alert.alert("Success", "Scheme deleted successfully");
          },
          style: "destructive"
        }
      ]
    );
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

  const renderSchemeItem = ({ item }) => (
    <View style={styles.schemeItem}>
      <View style={styles.schemeInfo}>
        <View style={styles.schemeHeader}>
          <Text style={styles.schemeTitle}>{item.title}</Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: item.status === 'Active' ? COLORS.success : COLORS.warning }
          ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        
        <Text style={styles.schemeDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <Text style={styles.schemeDeadline}>
          <Text style={styles.schemeDeadlineLabel}>Deadline: </Text>
          {item.deadline}
        </Text>
      </View>
      
      <View style={styles.schemeActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditScheme(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteScheme(item.id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No schemes found</Text>
      <Text style={styles.emptySubtext}>Add a new scheme or change your filter</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Manage Schemes" 
        rightComponent={
          <Button
            title="Add New"
            onPress={handleAddScheme}
            size="small"
          />
        }
      />
      
      <View style={styles.filtersContainer}>
        {renderFilterButton('All', 'all')}
        {renderFilterButton('Active', 'active')}
        {renderFilterButton('Upcoming', 'upcoming')}
        {renderFilterButton('Expired', 'expired')}
      </View>
      
      {isLoading ? (
        <Loading fullScreen />
      ) : (
        <FlatList
          data={filteredSchemes}
          keyExtractor={(item) => item.id}
          renderItem={renderSchemeItem}
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
  schemeItem: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.md,
  },
  schemeInfo: {
    marginBottom: SIZES.sm,
  },
  schemeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  schemeTitle: {
    ...FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SIZES.sm,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: SIZES.radius,
  },
  statusText: {
    ...FONTS.medium,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  schemeDescription: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  schemeDeadline: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  schemeDeadlineLabel: {
    ...FONTS.medium,
    color: COLORS.warning,
  },
  schemeActions: {
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

export default ManageSchemesScreen;
