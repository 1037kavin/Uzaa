import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Mock weather data
const WEATHER_DATA = [
  {
    id: '1',
    date: '2023-08-25',
    temperature: {
      min: 24,
      max: 32,
    },
    humidity: 75,
    precipitation: 30,
    windSpeed: 12,
    condition: 'Rainy',
    icon: 'rainy',
    advisory: 'Avoid spraying pesticides due to expected rainfall.',
  },
  {
    id: '2',
    date: '2023-08-26',
    temperature: {
      min: 25,
      max: 33,
    },
    humidity: 70,
    precipitation: 10,
    windSpeed: 10,
    condition: 'Partly Cloudy',
    icon: 'partly-cloudy',
    advisory: 'Good day for light irrigation.',
  },
  {
    id: '3',
    date: '2023-08-27',
    temperature: {
      min: 26,
      max: 34,
    },
    humidity: 65,
    precipitation: 0,
    windSpeed: 8,
    condition: 'Sunny',
    icon: 'sunny',
    advisory: 'Ideal conditions for harvesting mature crops.',
  },
  {
    id: '4',
    date: '2023-08-28',
    temperature: {
      min: 25,
      max: 31,
    },
    humidity: 80,
    precipitation: 60,
    windSpeed: 15,
    condition: 'Thunderstorm',
    icon: 'thunderstorm',
    advisory: 'Secure young plants and avoid field operations.',
  },
  {
    id: '5',
    date: '2023-08-29',
    temperature: {
      min: 24,
      max: 30,
    },
    humidity: 85,
    precipitation: 70,
    windSpeed: 14,
    condition: 'Heavy Rain',
    icon: 'heavy-rain',
    advisory: 'Ensure proper drainage in fields to prevent waterlogging.',
  },
];

// Mock locations
const LOCATIONS = [
  'Current Location',
  'Jaipur, Rajasthan',
  'Delhi, NCR',
  'Mumbai, Maharashtra',
  'Bangalore, Karnataka',
];

const WeatherScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState('Current Location');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  // Function to format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Function to get weather icon based on condition
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return '☀️';
      case 'partly cloudy':
        return '⛅';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'thunderstorm':
        return '⛈️';
      case 'heavy rain':
        return '🌧️🌧️';
      default:
        return '🌤️';
    }
  };
  
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
          {LOCATIONS.map((location) => (
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
    const today = WEATHER_DATA[0];
    
    return (
      <View style={styles.currentWeatherContainer}>
        <Text style={styles.sectionTitle}>Current Weather</Text>
        <View style={styles.currentWeatherContent}>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>{today.temperature.max}°C</Text>
            <Text style={styles.condition}>{today.condition}</Text>
          </View>
          
          <Text style={styles.weatherIcon}>{getWeatherIcon(today.condition)}</Text>
        </View>
        
        <View style={styles.weatherDetailsContainer}>
          <View style={styles.weatherDetailItem}>
            <Text style={styles.weatherDetailLabel}>Min Temp</Text>
            <Text style={styles.weatherDetailValue}>{today.temperature.min}°C</Text>
          </View>
          <View style={styles.weatherDetailItem}>
            <Text style={styles.weatherDetailLabel}>Humidity</Text>
            <Text style={styles.weatherDetailValue}>{today.humidity}%</Text>
          </View>
          <View style={styles.weatherDetailItem}>
            <Text style={styles.weatherDetailLabel}>Wind</Text>
            <Text style={styles.weatherDetailValue}>{today.windSpeed} km/h</Text>
          </View>
          <View style={styles.weatherDetailItem}>
            <Text style={styles.weatherDetailLabel}>Rain</Text>
            <Text style={styles.weatherDetailValue}>{today.precipitation}%</Text>
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
      
      {WEATHER_DATA.map((weather) => (
        <View key={weather.id} style={styles.forecastCard}>
          <View style={styles.forecastHeader}>
            <Text style={styles.forecastDate}>{formatDate(weather.date)}</Text>
            <Text style={styles.forecastCondition}>{weather.condition}</Text>
          </View>
          
          <View style={styles.forecastContent}>
            <Text style={styles.forecastIcon}>{getWeatherIcon(weather.condition)}</Text>
            
            <View style={styles.forecastTemperature}>
              <Text style={styles.forecastMaxTemp}>{weather.temperature.max}°C</Text>
              <Text style={styles.forecastMinTemp}>{weather.temperature.min}°C</Text>
            </View>
            
            <View style={styles.forecastDetails}>
              <View style={styles.forecastDetailItem}>
                <Text style={styles.forecastDetailLabel}>Humidity</Text>
                <Text style={styles.forecastDetailValue}>{weather.humidity}%</Text>
              </View>
              <View style={styles.forecastDetailItem}>
                <Text style={styles.forecastDetailLabel}>Rain</Text>
                <Text style={styles.forecastDetailValue}>{weather.precipitation}%</Text>
              </View>
              <View style={styles.forecastDetailItem}>
                <Text style={styles.forecastDetailLabel}>Wind</Text>
                <Text style={styles.forecastDetailValue}>{weather.windSpeed} km/h</Text>
              </View>
            </View>
          </View>
          
          {weather.advisory && (
            <View style={styles.forecastAdvisory}>
              <Text style={styles.forecastAdvisoryLabel}>Advisory:</Text>
              <Text style={styles.forecastAdvisoryText}>{weather.advisory}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather Forecast</Text>
      </View>
      
      {renderLocationSelector()}
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderCurrentWeather()}
        {renderForecast()}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('FarmerHome')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
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
        
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={styles.navIcon}>☁️</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Weather</Text>
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
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#0D0D0D',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  locationContainer: {
    padding: 16,
    position: 'relative',
    zIndex: 10,
  },
  locationLabel: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 8,
  },
  locationSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  locationText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#1DB954',
  },
  locationDropdown: {
    position: 'absolute',
    top: 85,
    left: 16,
    right: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    zIndex: 20,
    elevation: 5,
  },
  locationOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  selectedLocationOption: {
    backgroundColor: '#1DB954',
  },
  locationOptionText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  selectedLocationOptionText: {
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  currentWeatherContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  currentWeatherContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperatureContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  condition: {
    fontSize: 16,
    color: '#B3B3B3',
  },
  weatherIcon: {
    fontSize: 48,
  },
  weatherDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  weatherDetailItem: {
    alignItems: 'center',
  },
  weatherDetailLabel: {
    fontSize: 12,
    color: '#B3B3B3',
    marginBottom: 4,
  },
  weatherDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  advisoryContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#FF851B',
  },
  advisoryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF851B',
    marginBottom: 8,
  },
  advisoryText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  forecastContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  forecastCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  forecastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  forecastDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  forecastCondition: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  forecastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  forecastIcon: {
    fontSize: 36,
    marginRight: 16,
  },
  forecastTemperature: {
    marginRight: 16,
  },
  forecastMaxTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  forecastMinTemp: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  forecastDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastDetailItem: {
    alignItems: 'center',
  },
  forecastDetailLabel: {
    fontSize: 12,
    color: '#B3B3B3',
    marginBottom: 4,
  },
  forecastDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  forecastAdvisory: {
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 16,
  },
  forecastAdvisoryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF851B',
    marginBottom: 4,
  },
  forecastAdvisoryText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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

export default WeatherScreen;
