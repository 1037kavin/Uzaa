import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';

const CropDetailScreen = ({ route }) => {
  const { crop } = route.params;
  const { fertilizers } = useSelector((state) => state.crops);
  
  // Default image if crop.image is not available
  const defaultImage = require('../../assets/images/icon.png');
  
  // Filter fertilizers recommended for this crop
  const recommendedFertilizers = fertilizers.filter(fertilizer => 
    fertilizer.crops.includes(crop.name)
  );

  const renderSection = (title, content) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );

  const renderInfoItem = (label, value) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const renderFertilizerItem = (fertilizer) => (
    <View key={fertilizer.id} style={styles.fertilizerItem}>
      <View style={styles.fertilizerHeader}>
        <Text style={styles.fertilizerName}>{fertilizer.name}</Text>
        <Text style={styles.fertilizerNutrient}>{fertilizer.nutrientContent}</Text>
      </View>
      <Text style={styles.fertilizerApplication}>
        <Text style={styles.fertilizerLabel}>Application: </Text>
        {fertilizer.application}
      </Text>
      <Text style={styles.fertilizerPrecautions}>
        <Text style={styles.fertilizerLabel}>Precautions: </Text>
        {fertilizer.precautions}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Crop Details" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={crop.image || defaultImage} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{crop.name}</Text>
          <Text style={styles.scientificName}>{crop.scientificName}</Text>
          
          {renderSection('Description', crop.description)}
          
          <View style={styles.infoContainer}>
            {renderInfoItem('Season', crop.season)}
            {renderInfoItem('Soil Types', crop.soilTypes.join(', '))}
            {renderInfoItem('Water Requirement', crop.waterRequirement)}
          </View>
          
          <View style={styles.fertilizerSection}>
            <Text style={styles.sectionTitle}>Recommended Fertilizers</Text>
            {recommendedFertilizers.length > 0 ? (
              recommendedFertilizers.map(renderFertilizerItem)
            ) : (
              <Text style={styles.noFertilizerText}>
                No specific fertilizer recommendations available for this crop.
              </Text>
            )}
          </View>
          
          <View style={styles.farmingTipsSection}>
            <Text style={styles.sectionTitle}>Farming Tips</Text>
            <View style={styles.tipItem}>
              <Text style={styles.tipNumber}>1</Text>
              <Text style={styles.tipText}>
                Prepare the soil well before sowing. Ensure proper tillage and soil health.
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipNumber}>2</Text>
              <Text style={styles.tipText}>
                Follow recommended spacing between plants for optimal growth.
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipNumber}>3</Text>
              <Text style={styles.tipText}>
                Monitor for pests and diseases regularly, especially during critical growth stages.
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipNumber}>4</Text>
              <Text style={styles.tipText}>
                Ensure adequate irrigation, particularly during flowering and fruit development.
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipNumber}>5</Text>
              <Text style={styles.tipText}>
                Harvest at the right time to ensure quality and maximum yield.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    height: 200,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: SIZES.lg,
  },
  name: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  scientificName: {
    ...FONTS.regular,
    fontSize: 16,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    marginBottom: SIZES.lg,
  },
  section: {
    marginBottom: SIZES.lg,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: SIZES.sm,
  },
  sectionContent: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  infoContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.lg,
  },
  infoItem: {
    marginBottom: SIZES.sm,
  },
  infoLabel: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 2,
  },
  infoValue: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  fertilizerSection: {
    marginBottom: SIZES.lg,
  },
  fertilizerItem: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
  },
  fertilizerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xs,
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
  },
  fertilizerLabel: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
  fertilizerApplication: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  fertilizerPrecautions: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  noFertilizerText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  farmingTipsSection: {
    marginBottom: SIZES.lg,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: SIZES.sm,
  },
  tipNumber: {
    ...FONTS.bold,
    fontSize: 16,
    color: COLORS.primary,
    width: 24,
    marginRight: SIZES.xs,
  },
  tipText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
});

export default CropDetailScreen;
