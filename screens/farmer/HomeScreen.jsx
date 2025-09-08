import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import { getSchemes } from '../../store/slices/schemeSlice';
import { getWeatherData } from '../../store/slices/weatherSlice';
import { getNotifications } from '../../store/slices/notificationSlice';
import SchemeCard from '../../components/SchemeCard';
import WeatherCard from '../../components/WeatherCard';
import NotificationItem from '../../components/NotificationItem';
import Card from '../../components/ui/Card';
import Loading from '../../components/ui/Loading';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { schemes, isLoading: schemesLoading } = useSelector((state) => state.schemes);
  const { weatherData, isLoading: weatherLoading } = useSelector((state) => state.weather);
  const { notifications, isLoading: notificationsLoading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getSchemes());
    dispatch(getWeatherData());
    dispatch(getNotifications());
  }, [dispatch]);

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.userName}>{user?.name || 'Farmer'}</Text>
      </View>
      
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={() => navigation.navigate('Notifications')}
      >
        <Text style={styles.notificationIcon}>🔔</Text>
        {notifications.filter(n => !n.read).length > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>
              {notifications.filter(n => !n.read).length}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderWeatherSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Weather</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      {weatherLoading ? (
        <Loading />
      ) : (
        <WeatherCard weather={weatherData[0]} />
      )}
    </View>
  );

  const renderSchemesSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Schemes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Schemes')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      {schemesLoading ? (
        <Loading />
      ) : (
        schemes.slice(0, 2).map((scheme) => (
          <SchemeCard
            key={scheme.id}
            scheme={scheme}
            onPress={() => navigation.navigate('Schemes', {
              screen: 'SchemeDetail',
              params: { scheme },
            })}
          />
        ))
      )}
    </View>
  );

  const renderCropRecommendationCard = () => (
    <Card style={styles.cropRecommendationCard} onPress={() => navigation.navigate('Crops')}>
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
    </Card>
  );

  const renderNotificationsSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Notifications</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      {notificationsLoading ? (
        <Loading />
      ) : (
        notifications.slice(0, 3).map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onPress={() => {}}
          />
        ))
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderWeatherSection()}
        {renderSchemesSection()}
        {renderCropRecommendationCard()}
        {renderNotificationsSection()}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.xl,
    paddingBottom: SIZES.lg,
  },
  greeting: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  userName: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
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
    backgroundColor: COLORS.primary,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    ...FONTS.bold,
    fontSize: 10,
    color: COLORS.textPrimary,
  },
  section: {
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
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
  seeAllText: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  cropRecommendationCard: {
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
    backgroundColor: COLORS.primary,
  },
  cropRecommendationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cropRecommendationTitle: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  cropRecommendationSubtitle: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
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
});

export default HomeScreen;
