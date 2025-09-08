import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';

// Mock data for crops
const CROPS = [
  {
    id: '1',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    season: 'Kharif',
    soilTypes: ['Clayey', 'Loamy'],
    waterRequirement: 'High',
    fertilizers: ['Urea', 'DAP', 'Potash'],
    description: 'A staple food crop grown in flooded fields.',
  },
  {
    id: '2',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    season: 'Rabi',
    soilTypes: ['Loamy', 'Clay Loam'],
    waterRequirement: 'Medium',
    fertilizers: ['Urea', 'DAP', 'MOP'],
    description: 'A major cereal grain cultivated worldwide.',
  },
  {
    id: '3',
    name: 'Maize',
    scientificName: 'Zea mays',
    season: 'Kharif, Rabi',
    soilTypes: ['Loamy', 'Sandy Loam'],
    waterRequirement: 'Medium',
    fertilizers: ['Urea', 'DAP', 'Zinc Sulphate'],
    description: 'Also known as corn, a versatile crop used for food and feed.',
  },
  {
    id: '4',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    season: 'Kharif',
    soilTypes: ['Black Cotton Soil', 'Alluvial'],
    waterRequirement: 'Medium',
    fertilizers: ['Urea', 'SSP', 'MOP'],
    description: 'A major cash crop grown for its fiber.',
  },
];

const ManageCropsScreen = ({ navigation }) => {
  const [crops, setCrops] = useState(CROPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter crops based on search query and active filter
  const filteredCrops = crops.filter(crop => {
    // Apply search filter
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply season filter
    const matchesSeason = activeFilter === 'all' || crop.season.toLowerCase().includes(activeFilter.toLowerCase());
    
    return matchesSearch && matchesSeason;
  });
  
  const handleAddCrop = () => {
    navigation.navigate('AddCrop');
  };
  
  const handleEditCrop = (crop) => {
    navigation.navigate('AddCrop', { crop, isEditing: true });
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
            setCrops(crops.filter(crop => crop.id !== cropId));
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
        
        <View style={styles.fertilizerTags}>
          {item.fertilizers.map((fertilizer, index) => (
            <View key={index} style={styles.fertilizerTag}>
              <Text style={styles.fertilizerTagText}>{fertilizer}</Text>
            </View>
          ))}
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
      <Text style={styles.emptyText}>No crops found</Text>
      <Text style={styles.emptySubtext}>Add a new crop or change your filter</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Crops</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddCrop}
        >
          <Text style={styles.addButtonText}>+ Add New</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.fertilizerButton}
        onPress={handleManageFertilizers}
      >
        <Text style={styles.fertilizerButtonText}>Manage Fertilizers</Text>
      </TouchableOpacity>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search crops..."
          placeholderTextColor="#B3B3B3"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.filtersContainer}>
        {renderFilterButton('All', 'all')}
        {renderFilterButton('Kharif', 'kharif')}
        {renderFilterButton('Rabi', 'rabi')}
        {renderFilterButton('Zaid', 'zaid')}
      </View>
      
      <FlatList
        data={filteredCrops}
        keyExtractor={item => item.id}
        renderItem={renderCropItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
      />
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('AdminHome')}
        >
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('ManageSchemes')}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navText}>Schemes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={styles.navIcon}>🌱</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Crops</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('AdminProfile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#0D0D0D',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#1DB954',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  fertilizerButton: {
    backgroundColor: '#00A86B',
    marginHorizontal: 16,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  fertilizerButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
  },
  activeFilterButton: {
    backgroundColor: '#1DB954',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  cropItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cropInfo: {
    marginBottom: 12,
  },
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cropSeason: {
    fontSize: 14,
    color: '#1DB954',
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  cropScientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#B3B3B3',
    marginBottom: 12,
  },
  cropDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cropDetailLabel: {
    fontSize: 14,
    color: '#B3B3B3',
    width: 120,
  },
  cropDetailValue: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  fertilizerTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  fertilizerTag: {
    backgroundColor: '#00A86B',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  fertilizerTagText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  cropActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 12,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#00A86B',
  },
  deleteButton: {
    backgroundColor: '#FF4136',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#B3B3B3',
    textAlign: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#1DB954',
    marginTop: -2,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#B3B3B3',
  },
  activeNavText: {
    color: '#1DB954',
  },
});

export default ManageCropsScreen;
