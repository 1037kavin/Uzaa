import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getWeatherData } from '../../store/slices/weatherSlice';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import Header from '../../components/ui/Header';
import WeatherCard from '../../components/WeatherCard';
import Loading from '../../components/ui/Loading';

const WeatherScreen = () => {
  const dispatch = useDispatch();
  const { weatherData, isLoading } = useSelector((state) => state.weather);
  const [selectedLocation, setSelectedLocation] = useState('Current Location');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  // Mock locations for demonstration
  const locations = [
    'Current Location',
    'Jaipur, Rajasthan',
    'Delhi, NCR',
    'Mumbai, Maharashtra',
    'Bangalore, Karnataka',
  ];

  useEffect(() => {
    dispatch(getWeatherData(selectedLocation));
  }, [dispatch, selectedLocation]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  const renderLocationSelector = () => (
    <View style={styles.locationContainer}>
      <Text style={styles.locationLabel}>Weather Forecast for:</Text>
      <TouchableOpacity
        style={styles.locationSelector}
        onPress={() => setShowLocationDropdown(!showLocationDropdown)}
      >
        <Text style={styles.locationText}>{selectedLocation}</Text>
        <Text style={styles.dropdownIcon}>{showLocationDropdown ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      
      {showLocationDropdown && (
        <View style={styles.locationDropdown}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location}
              style={[
                styles.locationOption,
                selectedLocation === location && styles.selectedLocationOption,
              ]}
              onPress={() => handleLocationSelect(location)}
            >
              <Text
                style={[
                  styles.locationOptionText,
                  selectedLocation === location && styles.selectedLocationOptionText,
                ]}
              >
                {location}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderCurrentWeather = () => {
    if (!weatherData || weatherData.length === 0) return null;
    
    const today = weatherData[0];
    
    return (
      <View style={styles.currentWeatherContainer}>
        <Text style={styles.sectionTitle}>Current Weather</Text>
        <View style={styles.currentWeatherContent}>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>{today.temperature.max}°C</Text>
            <Text style={styles.condition}>{today.condition}</Text>
          </View>
          
          <View style={styles.weatherDetailsContainer}>
            <View style={styles.weatherDetailItem}>
              <Text style={styles.weatherDetailLabel}>Humidity</Text>
              <Text style={styles.weatherDetailValue}>{today.humidity}%</Text>
            </View>
            <View style={styles.weatherDetailItem}>
              <Text style={styles.weatherDetailLabel}>Precipitation</Text>
              <Text style={styles.weatherDetailValue}>{today.precipitation}%</Text>
            </View>
            <View style={styles.weatherDetailItem}>
              <Text style={styles.weatherDetailLabel}>Wind</Text>
              <Text style={styles.weatherDetailValue}>{today.windSpeed} km/h</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.advisoryContainer}>
          <Text style={styles.advisoryLabel}>Today's Advisory:</Text>
          <Text style={styles.advisoryText}>{today.advisory}</Text>
        </View>
      </View>
    );
  };

  const renderForecast = () => (
    <View style={styles.forecastContainer}>
      <Text style={styles.sectionTitle}>5-Day Forecast</Text>
      {weatherData.map((weather) => (
        <WeatherCard key={weather.id} weather={weather} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Weather Forecast" showBackButton={false} />
      
      {renderLocationSelector()}
      
      {isLoading ? (
        <Loading fullScreen />
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderCurrentWeather()}
          {renderForecast()}
        </ScrollView>
      )}
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
  locationContainer: {
    padding: SIZES.lg,
    position: 'relative',
    zIndex: 10,
  },
  locationLabel: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  locationSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  locationText: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  dropdownIcon: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  locationDropdown: {
    position: 'absolute',
    top: 85,
    left: SIZES.lg,
    right: SIZES.lg,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 20,
    elevation: 5,
  },
  locationOption: {
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedLocationOption: {
    backgroundColor: COLORS.primary,
  },
  locationOptionText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  selectedLocationOptionText: {
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
  currentWeatherContainer: {
    padding: SIZES.lg,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
  },
  currentWeatherContent: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperatureContainer: {
    alignItems: 'center',
  },
  temperature: {
    ...FONTS.bold,
    fontSize: 36,
    color: COLORS.textPrimary,
  },
  condition: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  weatherDetailsContainer: {
    flex: 1,
    marginLeft: SIZES.lg,
  },
  weatherDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.xs,
  },
  weatherDetailLabel: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  weatherDetailValue: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  advisoryContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginTop: SIZES.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.warning,
  },
  advisoryLabel: {
    ...FONTS.bold,
    fontSize: 14,
    color: COLORS.warning,
    marginBottom: SIZES.xs,
  },
  advisoryText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  forecastContainer: {
    padding: SIZES.lg,
  },
});

export default WeatherScreen;
