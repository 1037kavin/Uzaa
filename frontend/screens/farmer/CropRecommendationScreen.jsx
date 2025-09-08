import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Mock data for soil types, seasons, and irrigation types
const SOIL_TYPES = [
  { label: 'Clayey', value: 'clayey' },
  { label: 'Loamy', value: 'loamy' },
  { label: 'Sandy', value: 'sandy' },
  { label: 'Silt', value: 'silt' },
  { label: 'Black Cotton Soil', value: 'black_cotton' },
  { label: 'Red Soil', value: 'red_soil' },
  { label: 'Alluvial', value: 'alluvial' },
];

const SEASONS = [
  { label: 'Kharif', value: 'kharif' },
  { label: 'Rabi', value: 'rabi' },
  { label: 'Zaid', value: 'zaid' },
];

const IRRIGATION_TYPES = [
  { label: 'Flood Irrigation', value: 'flood' },
  { label: 'Drip Irrigation', value: 'drip' },
  { label: 'Sprinkler Irrigation', value: 'sprinkler' },
  { label: 'Furrow Irrigation', value: 'furrow' },
  { label: 'Rainfed', value: 'rainfed' },
];

// Mock data for recommended crops
const RECOMMENDED_CROPS = [
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
];

const CropRecommendationScreen = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState('soil');
  const [formData, setFormData] = useState({
    soilType: '',
    season: '',
    irrigationType: '',
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const handleSelectOption = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const handleGetRecommendations = () => {
    if (formData.soilType && formData.season && formData.irrigationType) {
      setShowRecommendations(true);
    }
  };
  
  const renderSoilTypeSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Select Soil Type</Text>
      <View style={styles.optionsContainer}>
        {SOIL_TYPES.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.optionButton,
              formData.soilType === item.value && styles.selectedOption,
            ]}
            onPress={() => handleSelectOption('soilType', item.value)}
          >
            <Text
              style={[
                styles.optionText,
                formData.soilType === item.value && styles.selectedOptionText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity 
        style={[
          styles.nextButton,
          !formData.soilType && styles.disabledButton
        ]}
        onPress={() => formData.soilType && setActiveSection('season')}
        disabled={!formData.soilType}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderSeasonSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Select Season</Text>
      <View style={styles.optionsContainer}>
        {SEASONS.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.optionButton,
              formData.season === item.value && styles.selectedOption,
            ]}
            onPress={() => handleSelectOption('season', item.value)}
          >
            <Text
              style={[
                styles.optionText,
                formData.season === item.value && styles.selectedOptionText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.navigationButtons}>
        <TouchableOpacity 
          style={[styles.backButton]}
          onPress={() => setActiveSection('soil')}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.nextButton,
            !formData.season && styles.disabledButton
          ]}
          onPress={() => formData.season && setActiveSection('irrigation')}
          disabled={!formData.season}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderIrrigationSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Select Irrigation Type</Text>
      <View style={styles.optionsContainer}>
        {IRRIGATION_TYPES.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.optionButton,
              formData.irrigationType === item.value && styles.selectedOption,
            ]}
            onPress={() => handleSelectOption('irrigationType', item.value)}
          >
            <Text
              style={[
                styles.optionText,
                formData.irrigationType === item.value && styles.selectedOptionText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.navigationButtons}>
        <TouchableOpacity 
          style={[styles.backButton]}
          onPress={() => setActiveSection('season')}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.nextButton,
            !formData.irrigationType && styles.disabledButton
          ]}
          onPress={handleGetRecommendations}
          disabled={!formData.irrigationType}
        >
          <Text style={styles.nextButtonText}>Get Recommendations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderRecommendations = () => (
    <View style={styles.recommendationsContainer}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Your Field Details</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Soil Type:</Text>
          <Text style={styles.summaryValue}>
            {SOIL_TYPES.find(item => item.value === formData.soilType)?.label}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Season:</Text>
          <Text style={styles.summaryValue}>
            {SEASONS.find(item => item.value === formData.season)?.label}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Irrigation:</Text>
          <Text style={styles.summaryValue}>
            {IRRIGATION_TYPES.find(item => item.value === formData.irrigationType)?.label}
          </Text>
        </View>
      </View>

      <Text style={styles.recommendationTitle}>Recommended Crops</Text>
      
      {RECOMMENDED_CROPS.map(crop => (
        <TouchableOpacity 
          key={crop.id}
          style={styles.cropCard}
          onPress={() => navigation.navigate('CropDetail', { crop })}
        >
          <View style={styles.cropHeader}>
            <Text style={styles.cropName}>{crop.name}</Text>
            <Text style={styles.cropScientificName}>{crop.scientificName}</Text>
          </View>
          
          <View style={styles.cropDetails}>
            <View style={styles.cropDetailItem}>
              <Text style={styles.cropDetailLabel}>Season:</Text>
              <Text style={styles.cropDetailValue}>{crop.season}</Text>
            </View>
            
            <View style={styles.cropDetailItem}>
              <Text style={styles.cropDetailLabel}>Water Need:</Text>
              <Text style={styles.cropDetailValue}>{crop.waterRequirement}</Text>
            </View>
            
            <View style={styles.cropDetailItem}>
              <Text style={styles.cropDetailLabel}>Soil Types:</Text>
              <Text style={styles.cropDetailValue}>{crop.soilTypes.join(', ')}</Text>
            </View>
          </View>
          
          <View style={styles.fertilizerTags}>
            {crop.fertilizers.map((fertilizer, index) => (
              <View key={index} style={styles.fertilizerTag}>
                <Text style={styles.fertilizerTagText}>{fertilizer}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity 
        style={styles.newRecommendationButton}
        onPress={() => {
          setShowRecommendations(false);
          setActiveSection('soil');
          setFormData({
            soilType: '',
            season: '',
            irrigationType: '',
          });
        }}
      >
        <Text style={styles.newRecommendationButtonText}>Start New Recommendation</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crop Recommendations</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {!showRecommendations ? (
          <>
            <View style={styles.introContainer}>
              <Text style={styles.introTitle}>Get Personalized Crop Recommendations</Text>
              <Text style={styles.introText}>
                Tell us about your field conditions and we'll recommend the most suitable crops and fertilizers for optimal yield.
              </Text>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={[
                styles.progressStep,
                activeSection === 'soil' && styles.activeStep,
                (activeSection === 'season' || activeSection === 'irrigation') && styles.completedStep,
              ]}>
                <Text style={styles.progressStepText}>1</Text>
              </View>
              <View style={styles.progressLine} />
              <View style={[
                styles.progressStep,
                activeSection === 'season' && styles.activeStep,
                activeSection === 'irrigation' && styles.completedStep,
              ]}>
                <Text style={styles.progressStepText}>2</Text>
              </View>
              <View style={styles.progressLine} />
              <View style={[
                styles.progressStep,
                activeSection === 'irrigation' && styles.activeStep,
              ]}>
                <Text style={styles.progressStepText}>3</Text>
              </View>
            </View>
            
            {activeSection === 'soil' && renderSoilTypeSection()}
            {activeSection === 'season' && renderSeasonSection()}
            {activeSection === 'irrigation' && renderIrrigationSection()}
          </>
        ) : (
          renderRecommendations()
        )}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('FarmerHome')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Schemes')}
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
          onPress={() => navigation.navigate('Weather')}
        >
          <Text style={styles.navIcon}>☁️</Text>
          <Text style={styles.navText}>Weather</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
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
  scrollView: {
    flex: 1,
  },
  introContainer: {
    padding: 16,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: '#B3B3B3',
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  activeStep: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  completedStep: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  progressStepText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressLine: {
    height: 2,
    width: 50,
    backgroundColor: '#333333',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  selectedOption: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  optionText: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#1DB954',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#333333',
    opacity: 0.7,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: '#333333',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#1DB954',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    width: '48%',
  },
  recommendationsContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  summaryContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#B3B3B3',
    width: 80,
  },
  summaryValue: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 16,
  },
  cropCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cropHeader: {
    marginBottom: 12,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cropScientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#B3B3B3',
  },
  cropDetails: {
    marginBottom: 12,
  },
  cropDetailItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  cropDetailLabel: {
    fontSize: 14,
    color: '#B3B3B3',
    width: 80,
  },
  cropDetailValue: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  fertilizerTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  newRecommendationButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#1DB954',
  },
  newRecommendationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1DB954',
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

export default CropRecommendationScreen;
