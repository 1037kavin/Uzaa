import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendations } from '../../store/slices/cropSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import { SOIL_TYPES, SEASONS, IRRIGATION_TYPES } from '../../utils/mockData';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import CropCard from '../../components/CropCard';
import Loading from '../../components/ui/Loading';

const CropRecommendationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { recommendedCrops, recommendedFertilizers, isLoading } = useSelector((state) => state.crops);
  
  const [formData, setFormData] = useState({
    soilType: '',
    season: '',
    irrigationType: '',
  });
  
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeSection, setActiveSection] = useState('soil');

  const handleSelectOption = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGetRecommendations = () => {
    if (formData.soilType && formData.season && formData.irrigationType) {
      dispatch(getRecommendations(formData));
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
      <Button
        title="Next"
        onPress={() => setActiveSection('season')}
        disabled={!formData.soilType}
        style={styles.nextButton}
      />
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
        <Button
          title="Back"
          onPress={() => setActiveSection('soil')}
          type="outline"
          style={styles.backButton}
        />
        <Button
          title="Next"
          onPress={() => setActiveSection('irrigation')}
          disabled={!formData.season}
          style={styles.nextButton}
        />
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
        <Button
          title="Back"
          onPress={() => setActiveSection('season')}
          type="outline"
          style={styles.backButton}
        />
        <Button
          title="Get Recommendations"
          onPress={handleGetRecommendations}
          disabled={!formData.irrigationType}
          style={styles.nextButton}
        />
      </View>
    </View>
  );

  const renderRecommendations = () => (
    <View style={styles.recommendationsContainer}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
          {recommendedCrops.length > 0 ? (
            recommendedCrops.map((crop) => (
              <CropCard
                key={crop.id}
                crop={crop}
                onPress={() => navigation.navigate('CropDetail', { crop })}
              />
            ))
          ) : (
            <Text style={styles.noRecommendationsText}>
              No crop recommendations found for the selected field conditions.
            </Text>
          )}

          <Button
            title="Start New Recommendation"
            onPress={() => {
              setShowRecommendations(false);
              setActiveSection('soil');
              setFormData({
                soilType: '',
                season: '',
                irrigationType: '',
              });
            }}
            type="outline"
            style={styles.newRecommendationButton}
          />
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Crop Recommendations" showBackButton={false} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  introContainer: {
    padding: SIZES.lg,
  },
  introTitle: {
    ...FONTS.bold,
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
  },
  introText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.lg,
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeStep: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  completedStep: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  progressStepText: {
    ...FONTS.bold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  progressLine: {
    height: 2,
    width: 50,
    backgroundColor: COLORS.border,
  },
  section: {
    padding: SIZES.lg,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.lg,
  },
  optionButton: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
    marginRight: SIZES.sm,
    marginBottom: SIZES.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  selectedOptionText: {
    color: COLORS.textPrimary,
  },
  nextButton: {
    marginTop: SIZES.md,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.md,
  },
  backButton: {
    flex: 0.48,
  },
  nextButton: {
    flex: 0.48,
  },
  recommendationsContainer: {
    padding: SIZES.lg,
    paddingBottom: SIZES.xxl,
  },
  summaryContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.lg,
  },
  summaryTitle: {
    ...FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
  },
  summaryItem: {
    flexDirection: 'row',
    marginBottom: SIZES.xs,
  },
  summaryLabel: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
    width: 80,
  },
  summaryValue: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
  },
  recommendationTitle: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: SIZES.md,
  },
  noRecommendationsText: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginVertical: SIZES.xl,
  },
  newRecommendationButton: {
    marginTop: SIZES.xl,
  },
});

export default CropRecommendationScreen;
