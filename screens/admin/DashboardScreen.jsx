import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import Card from '../../components/ui/Card';

const DashboardScreen = ({ navigation }) => {
  const { schemes } = useSelector((state) => state.schemes);
  const { crops } = useSelector((state) => state.crops);
  const { fertilizers } = useSelector((state) => state.crops);
  
  // Mock data for dashboard
  const dashboardData = {
    totalUsers: 1248,
    activeSchemes: schemes.filter(s => s.status === 'Active').length,
    totalSchemes: schemes.length,
    totalCrops: crops.length,
    totalFertilizers: fertilizers.length,
    schemeApplications: 356,
    pendingApplications: 42,
    approvedApplications: 314,
  };
  
  const renderStatCard = (title, value, iconText, onPress) => (
    <Card style={styles.statCard} onPress={onPress}>
      <View style={styles.statIconContainer}>
        <Text style={styles.statIcon}>{iconText}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </Card>
  );
  
  const renderActivityItem = (title, description, time, type) => (
    <View style={styles.activityItem}>
      <View style={[styles.activityDot, { backgroundColor: getActivityColor(type) }]} />
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityDescription}>{description}</Text>
      </View>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  );
  
  const getActivityColor = (type) => {
    switch (type) {
      case 'application':
        return COLORS.primary;
      case 'scheme':
        return COLORS.secondary;
      case 'user':
        return COLORS.warning;
      default:
        return COLORS.info;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Admin Dashboard" showBackButton={false} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome back, Admin</Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Text>
        </View>
        
        <View style={styles.statsContainer}>
          {renderStatCard('Total Users', dashboardData.totalUsers, '👥', () => {})}
          {renderStatCard('Active Schemes', dashboardData.activeSchemes, '📋', () => navigation.navigate('ManageSchemes'))}
          {renderStatCard('Total Crops', dashboardData.totalCrops, '🌱', () => navigation.navigate('ManageCrops'))}
          {renderStatCard('Applications', dashboardData.schemeApplications, '📝', () => {})}
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Applications Overview</Text>
          </View>
          
          <Card style={styles.applicationsCard}>
            <View style={styles.applicationStat}>
              <View style={styles.applicationStatItem}>
                <Text style={styles.applicationStatValue}>{dashboardData.pendingApplications}</Text>
                <Text style={styles.applicationStatLabel}>Pending</Text>
              </View>
              <View style={styles.applicationStatItem}>
                <Text style={styles.applicationStatValue}>{dashboardData.approvedApplications}</Text>
                <Text style={styles.applicationStatLabel}>Approved</Text>
              </View>
              <View style={styles.applicationStatItem}>
                <Text style={styles.applicationStatValue}>{dashboardData.schemeApplications}</Text>
                <Text style={styles.applicationStatLabel}>Total</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Applications</Text>
            </TouchableOpacity>
          </Card>
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <Card style={styles.activityCard}>
            {renderActivityItem(
              'New Scheme Application',
              'Rajesh Kumar applied for PM Kisan Samman Nidhi',
              '2h ago',
              'application'
            )}
            {renderActivityItem(
              'Scheme Updated',
              'Soil Health Card Scheme details were updated',
              '5h ago',
              'scheme'
            )}
            {renderActivityItem(
              'New User Registration',
              'Amit Sharma registered as a new farmer',
              '1d ago',
              'user'
            )}
            {renderActivityItem(
              'Application Approved',
              'Kisan Credit Card application was approved',
              '1d ago',
              'application'
            )}
          </Card>
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('ManageSchemes', { screen: 'SchemeForm' })}
            >
              <Text style={styles.quickActionIcon}>➕</Text>
              <Text style={styles.quickActionText}>Add New Scheme</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('ManageCrops', { screen: 'CropForm' })}
            >
              <Text style={styles.quickActionIcon}>➕</Text>
              <Text style={styles.quickActionText}>Add New Crop</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('ManageCrops', { screen: 'ManageFertilizers' })}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SIZES.xxl,
  },
  welcomeContainer: {
    padding: SIZES.lg,
  },
  welcomeText: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  dateText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.lg,
  },
  statCard: {
    width: '48%',
    marginBottom: SIZES.md,
    alignItems: 'center',
    padding: SIZES.md,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  statTitle: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  sectionContainer: {
    marginTop: SIZES.lg,
    paddingHorizontal: SIZES.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  viewAllLink: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  applicationsCard: {
    padding: SIZES.md,
  },
  applicationStat: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SIZES.md,
  },
  applicationStatItem: {
    alignItems: 'center',
  },
  applicationStatValue: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  applicationStatLabel: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  viewAllButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.sm,
    alignItems: 'center',
  },
  viewAllText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  activityCard: {
    padding: SIZES.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: SIZES.sm,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  activityDescription: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  activityTime: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: SIZES.sm,
  },
  quickActionText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});

export default DashboardScreen;
