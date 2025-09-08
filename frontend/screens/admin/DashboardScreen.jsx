import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome,</Text>
          <Text style={styles.userName}>Admin</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('AdminProfile')}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>👥</Text>
            </View>
            <Text style={styles.statValue}>1,248</Text>
            <Text style={styles.statTitle}>Total Users</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>📋</Text>
            </View>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statTitle}>Active Schemes</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>🌱</Text>
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statTitle}>Total Crops</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>📝</Text>
            </View>
            <Text style={styles.statValue}>356</Text>
            <Text style={styles.statTitle}>Applications</Text>
          </View>
        </View>
        
        {/* Applications Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Applications Overview</Text>
          </View>
          
          <View style={styles.applicationsCard}>
            <View style={styles.applicationStat}>
              <View style={styles.applicationStatItem}>
                <Text style={styles.applicationStatValue}>42</Text>
                <Text style={styles.applicationStatLabel}>Pending</Text>
              </View>
              <View style={styles.applicationStatItem}>
                <Text style={styles.applicationStatValue}>314</Text>
                <Text style={styles.applicationStatLabel}>Approved</Text>
              </View>
              <View style={styles.applicationStatItem}>
                <Text style={styles.applicationStatValue}>356</Text>
                <Text style={styles.applicationStatLabel}>Total</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Applications</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#1DB954' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New Scheme Application</Text>
                <Text style={styles.activityDescription}>Rajesh Kumar applied for PM Kisan Samman Nidhi</Text>
              </View>
              <Text style={styles.activityTime}>2h ago</Text>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#00A86B' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Scheme Updated</Text>
                <Text style={styles.activityDescription}>Soil Health Card Scheme details were updated</Text>
              </View>
              <Text style={styles.activityTime}>5h ago</Text>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#FF851B' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New User Registration</Text>
                <Text style={styles.activityDescription}>Amit Sharma registered as a new farmer</Text>
              </View>
              <Text style={styles.activityTime}>1d ago</Text>
            </View>
          </View>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('AddScheme')}
            >
              <Text style={styles.quickActionIcon}>➕</Text>
              <Text style={styles.quickActionText}>Add New Scheme</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('AddCrop')}
            >
              <Text style={styles.quickActionIcon}>➕</Text>
              <Text style={styles.quickActionText}>Add New Crop</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('ManageFertilizers')}
            >
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionText}>Manage Fertilizers</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionIcon}>📣</Text>
              <Text style={styles.quickActionText}>Send Notification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={styles.navIcon}>📊</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('ManageSchemes')}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navText}>Schemes</Text>
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
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statTitle: {
    fontSize: 14,
    color: '#B3B3B3',
    marginTop: 4,
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
  applicationsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
  },
  applicationStat: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  applicationStatItem: {
    alignItems: 'center',
  },
  applicationStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  applicationStatLabel: {
    fontSize: 14,
    color: '#B3B3B3',
    marginTop: 4,
  },
  viewAllButton: {
    backgroundColor: '#1DB954',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  activityCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  activityDescription: {
    fontSize: 12,
    color: '#B3B3B3',
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#B3B3B3',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
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

export default DashboardScreen;
