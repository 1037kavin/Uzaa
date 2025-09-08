import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getSchemes } from '../../store/slices/schemeSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import SchemeCard from '../../components/SchemeCard';
import Header from '../../components/ui/Header';
import Loading from '../../components/ui/Loading';

const SchemesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { schemes, isLoading } = useSelector((state) => state.schemes);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    dispatch(getSchemes());
  }, [dispatch]);

  useEffect(() => {
    filterSchemes();
  }, [schemes, searchQuery, activeFilter]);

  const filterSchemes = () => {
    let filtered = [...schemes];
    
    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(scheme => scheme.status.toLowerCase() === activeFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(scheme => 
        scheme.title.toLowerCase().includes(query) || 
        scheme.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredSchemes(filtered);
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

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No schemes found</Text>
      <Text style={styles.emptySubtext}>Try adjusting your filters or search query</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Agricultural Schemes" showBackButton={false} />
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search schemes..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
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
          renderItem={({ item }) => (
            <SchemeCard
              scheme={item}
              onPress={() => navigation.navigate('SchemeDetail', { scheme: item })}
            />
          )}
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
  searchContainer: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
  },
  searchInput: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontSize: 14,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
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

export default SchemesScreen;
