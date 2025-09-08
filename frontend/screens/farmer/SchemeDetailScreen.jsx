import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const SchemeDetailScreen = ({ route, navigation }) => {
  const { scheme } = route.params;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scheme Details</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{scheme.title}</Text>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: scheme.status === 'Active' ? '#2ECC40' : '#FF851B' }
            ]}>
              <Text style={styles.statusText}>{scheme.status}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>{scheme.description}</Text>
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Eligibility</Text>
              <Text style={styles.infoValue}>{scheme.eligibility}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Benefits</Text>
              <Text style={styles.infoValue}>{scheme.benefits}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Deadline</Text>
              <Text style={styles.infoValue}>{scheme.deadline}</Text>
            </View>
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
        </View>
      </ScrollView>
      
      <View style={styles.applyButtonContainer}>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => navigation.navigate('SchemeApplication', { scheme })}
        >
          <Text style={styles.applyButtonText}>Apply for Scheme</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#0D0D0D',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  infoContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  documentsSection: {
    marginBottom: 16,
  },
  documentsList: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  documentIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  documentName: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  contactSection: {
    marginBottom: 16,
  },
  contactText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    justifyContent: 'center',
  },
  contactButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  contactButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  applyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(13, 13, 13, 0.9)',
  },
  applyButton: {
    backgroundColor: '#1DB954',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default SchemeDetailScreen;
