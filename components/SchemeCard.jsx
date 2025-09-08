import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../utils/theme';
import Card from './ui/Card';

const SchemeCard = ({ scheme, onPress }) => {
  // Default image if scheme.image is not available
  const defaultImage = require('../assets/images/icon.png');
  
  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: scheme.status === 'Active' ? COLORS.success : COLORS.warning }]}>
          <Text style={styles.statusText}>{scheme.status}</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={scheme.image || defaultImage} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>{scheme.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{scheme.description}</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Eligibility:</Text>
              <Text style={styles.detailValue} numberOfLines={1}>{scheme.eligibility}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Benefits:</Text>
              <Text style={styles.detailValue} numberOfLines={1}>{scheme.benefits}</Text>
            </View>
            
            <View style={styles.deadlineContainer}>
              <Text style={styles.deadlineLabel}>Deadline:</Text>
              <Text style={styles.deadlineValue}>{scheme.deadline}</Text>
            </View>
          </View>
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
  statusContainer: {
    position: 'absolute',
    top: SIZES.xs,
    right: SIZES.xs,
    zIndex: 1,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: SIZES.radius,
  },
  statusText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    ...FONTS.medium,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 100,
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    padding: SIZES.md,
  },
  title: {
    ...FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  description: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SIZES.sm,
  },
  detailsContainer: {
    marginTop: SIZES.xs,
  },
  detailItem: {
    marginBottom: SIZES.xs,
  },
  detailLabel: {
    ...FONTS.medium,
    fontSize: 12,
    color: COLORS.primary,
  },
  detailValue: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.xs,
  },
  deadlineLabel: {
    ...FONTS.medium,
    fontSize: 12,
    color: COLORS.warning,
    marginRight: SIZES.xs,
  },
  deadlineValue: {
    ...FONTS.bold,
    fontSize: 12,
    color: COLORS.warning,
  },
});

export default SchemeCard;
