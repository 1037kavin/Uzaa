import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>Rajesh Kumar</Text>
        </View>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>3</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Weather Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Weather</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.weatherCard}>
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherTemp}>32°C</Text>
              <Text style={styles.weatherCondition}>Partly Cloudy</Text>
            </View>
            <Text style={styles.weatherIcon}>⛅</Text>
          </View>
        </View>
        
        {/* Schemes Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Schemes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Schemes')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.schemeCard}
            onPress={() => navigation.navigate('SchemeDetail')}
          >
            <View style={styles.schemeHeader}>
              <Text style={styles.schemeTitle}>PM Kisan Samman Nidhi</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
            <Text style={styles.schemeDescription}>
              Income support scheme for farmers to help them meet farming expenses and household needs.
            </Text>
            <Text style={styles.schemeDeadline}>Deadline: 2023-10-15</Text>
          </TouchableOpacity>
        </View>
        
        {/* Crop Recommendation Card */}
        <TouchableOpacity 
          style={styles.cropRecommendationCard}
          onPress={() => navigation.navigate('CropRecommendation')}
        >
          <View style={styles.cropRecommendationContent}>
            <View>
              <Text style={styles.cropRecommendationTitle}>Crop Recommendations</Text>
              <Text style={styles.cropRecommendationSubtitle}>
                Get personalized crop and fertilizer recommendations based on your field conditions.
              </Text>
            </View>
            <View style={styles.cropIconContainer}>
              <Text style={styles.cropIcon}>🌱</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        {/* Recent Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.notificationItem}>
            <View style={[styles.notificationDot, { backgroundColor: '#2ECC40' }]} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Scheme Application Approved</Text>
              <Text style={styles.notificationMessage}>
                Your application for PM Kisan Samman Nidhi has been approved.
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.notificationItem}>
            <View style={[styles.notificationDot, { backgroundColor: '#FF851B' }]} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Weather Alert</Text>
              <Text style={styles.notificationMessage}>
                Heavy rainfall expected in your region in the next 48 hours.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Schemes')}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navText}>Schemes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('CropRecommendation')}
        >
          <Text style={styles.navIcon}>🌱</Text>
          <Text style={styles.navText}>Crops</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#B3B3B3',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#1DB954',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 14,
    color: '#1DB954',
  },
  weatherCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherInfo: {
    flex: 1,
  },
  weatherTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  weatherCondition: {
    fontSize: 16,
    color: '#B3B3B3',
  },
  weatherIcon: {
    fontSize: 48,
  },
  schemeCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
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
    backgroundColor: '#2ECC40',
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
    color: '#FF851B',
    fontWeight: '500',
  },
  cropRecommendationCard: {
    backgroundColor: '#1DB954',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  cropRecommendationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cropRecommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cropRecommendationSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    maxWidth: '80%',
  },
  cropIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropIcon: {
    fontSize: 24,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  bottomNav: {
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

export default HomeScreen;
