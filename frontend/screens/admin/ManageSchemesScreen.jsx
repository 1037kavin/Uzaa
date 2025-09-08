import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';

// Mock data for schemes
const SCHEMES = [
  {
    id: '1',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme to provide financial support to farmers suffering crop loss/damage due to unforeseen events.',
    eligibility: 'All farmers growing notified crops in notified areas.',
    benefits: 'Financial assistance in case of crop failure due to natural calamities.',
    deadline: '2023-12-31',
    status: 'Active',
  },
  {
    id: '2',
    title: 'PM Kisan Samman Nidhi',
    description: 'Income support scheme for farmers to help them meet farming expenses and household needs.',
    eligibility: 'All landholding farmers\' families.',
    benefits: 'Rs. 6,000 per year in three equal installments.',
    deadline: '2023-10-15',
    status: 'Active',
  },
  {
    id: '3',
    title: 'Kisan Credit Card',
    description: 'Provides farmers with timely access to credit.',
    eligibility: 'All farmers, sharecroppers, and tenant farmers.',
    benefits: 'Revolving credit facility with simplified renewal process.',
    deadline: '2023-11-30',
    status: 'Active',
  },
  {
    id: '4',
    title: 'Soil Health Card Scheme',
    description: 'Provides information on soil nutrient status and recommendations for appropriate dosage of nutrients.',
    eligibility: 'All farmers with agricultural land.',
    benefits: 'Improved soil health and increased productivity.',
    deadline: '2023-09-30',
    status: 'Active',
  },
  {
    id: '5',
    title: 'National Mission For Sustainable Agriculture',
    description: 'Promotes sustainable agriculture through climate change adaptation measures.',
    eligibility: 'Farmers adopting sustainable agricultural practices.',
    benefits: 'Financial assistance for adopting sustainable practices.',
    deadline: '2023-12-15',
    status: 'Upcoming',
  },
];

const ManageSchemesScreen = ({ navigation }) => {
  const [schemes, setSchemes] = useState(SCHEMES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter schemes based on search query and active filter
  const filteredSchemes = schemes.filter(scheme => {
    // Apply search filter
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = activeFilter === 'all' || scheme.status.toLowerCase() === activeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  const handleAddScheme = () => {
    navigation.navigate('AddScheme');
  };
  
  const handleEditScheme = (scheme) => {
    navigation.navigate('AddScheme', { scheme, isEditing: true });
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
            setSchemes(schemes.filter(scheme => scheme.id !== schemeId));
            Alert.alert("Success", "Scheme deleted successfully");
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const renderSchemeItem = ({ item }) => (
    <View style={styles.schemeItem}>
      <View style={styles.schemeInfo}>
        <View style={styles.schemeHeader}>
          <Text style={styles.schemeTitle}>{item.title}</Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: item.status === 'Active' ? '#2ECC40' : '#FF851B' }
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
      <Text style={styles.emptySubtext}>Add a new scheme or change your filter</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Schemes</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddScheme}
        >
          <Text style={styles.addButtonText}>+ Add New</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search schemes..."
          placeholderTextColor="#B3B3B3"
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
      
      <FlatList
        data={filteredSchemes}
        keyExtractor={item => item.id}
        renderItem={renderSchemeItem}
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
        
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={styles.navIcon}>📋</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Schemes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('ManageCrops')}
        >
          <Text style={styles.navIcon}>🌱</Text>
          <Text style={styles.navText}>Crops</Text>
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
  schemeItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  schemeInfo: {
    marginBottom: 12,
  },
  schemeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  schemeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  schemeDescription: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 8,
  },
  schemeDeadline: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  schemeDeadlineLabel: {
    color: '#FF851B',
    fontWeight: '500',
  },
  schemeActions: {
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

export default ManageSchemesScreen;
