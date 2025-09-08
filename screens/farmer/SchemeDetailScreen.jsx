import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';

const SchemeDetailScreen = ({ navigation, route }) => {
  const { scheme } = route.params;
  
  // Default image if scheme.image is not available
  const defaultImage = require('../../assets/images/icon.png');

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

  return (
    <View style={styles.container}>
      <Header title="Scheme Details" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={scheme.image || defaultImage} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, { backgroundColor: scheme.status === 'Active' ? COLORS.success : COLORS.warning }]}>
              <Text style={styles.statusText}>{scheme.status}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{scheme.title}</Text>
          
          {renderSection('Description', scheme.description)}
          
          <View style={styles.infoContainer}>
            {renderInfoItem('Eligibility', scheme.eligibility)}
            {renderInfoItem('Benefits', scheme.benefits)}
            {renderInfoItem('Deadline', scheme.deadline)}
          </View>
          
          <View style={styles.documentsSection}>
            <Text style={styles.sectionTitle}>Required Documents</Text>
            <View style={styles.documentsList}>
              <View style={styles.documentItem}>
                <Text style={styles.documentIcon}>📄</Text>
                <Text style={styles.documentName}>Identification Proof (Aadhar/PAN)</Text>
              </View>
              <View style={styles.documentItem}>
                <Text style={styles.documentIcon}>📄</Text>
                <Text style={styles.documentName}>Land Records/Ownership Documents</Text>
              </View>
              <View style={styles.documentItem}>
                <Text style={styles.documentIcon}>📄</Text>
                <Text style={styles.documentName}>Bank Account Details</Text>
              </View>
              <View style={styles.documentItem}>
                <Text style={styles.documentIcon}>📄</Text>
                <Text style={styles.documentName}>Passport Size Photograph</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <Text style={styles.contactText}>
              For any queries related to this scheme, please contact the helpline number or visit the nearest agriculture office.
            </Text>
            <View style={styles.contactButtons}>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonIcon}>📞</Text>
                <Text style={styles.contactButtonText}>Call Helpline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonIcon}>📧</Text>
                <Text style={styles.contactButtonText}>Email Support</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <Button
            title="Apply for Scheme"
            onPress={() => navigation.navigate('SchemeApplication', { scheme })}
            style={styles.applyButton}
          />
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
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusContainer: {
    position: 'absolute',
    top: SIZES.md,
    right: SIZES.md,
  },
  statusBadge: {
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.sm,
    borderRadius: SIZES.radius,
  },
  statusText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    ...FONTS.medium,
  },
  contentContainer: {
    padding: SIZES.lg,
  },
  title: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
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
  documentsSection: {
    marginBottom: SIZES.lg,
  },
  documentsList: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  documentIcon: {
    fontSize: 20,
    marginRight: SIZES.sm,
  },
  documentName: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  contactSection: {
    marginBottom: SIZES.lg,
  },
  contactText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.48,
    justifyContent: 'center',
  },
  contactButtonIcon: {
    fontSize: 16,
    marginRight: SIZES.xs,
  },
  contactButtonText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  applyButton: {
    marginTop: SIZES.md,
    marginBottom: SIZES.xl,
  },
});

export default SchemeDetailScreen;
