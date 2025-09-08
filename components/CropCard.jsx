import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/theme';
import Card from './ui/Card';

const CropCard = ({ crop, onPress }) => {
  // Default image if crop.image is not available
  const defaultImage = require('../assets/images/icon.png');
  
  return (
    <Card onPress={onPress} style={styles.card}>
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
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Season:</Text>
          <Text style={styles.infoValue}>{crop.season}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Soil Types:</Text>
          <Text style={styles.infoValue}>{crop.soilTypes.join(', ')}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Water Requirement:</Text>
          <Text style={styles.infoValue}>{crop.waterRequirement}</Text>
        </View>
        
        <View style={styles.tagsContainer}>
          {crop.fertilizers.map((fertilizer, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{fertilizer}</Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: SIZES.sm,
    padding: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 150,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: SIZES.md,
  },
  name: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  scientificName: {
    ...FONTS.regular,
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    marginBottom: SIZES.md,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: SIZES.xs,
  },
  infoLabel: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
    width: 120,
  },
  infoValue: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.sm,
  },
  tag: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: SIZES.radius,
    marginRight: SIZES.xs,
    marginBottom: SIZES.xs,
  },
  tagText: {
    ...FONTS.medium,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
});

export default CropCard;
