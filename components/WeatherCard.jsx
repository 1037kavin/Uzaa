import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/theme';
import Card from './ui/Card';

const WeatherCard = ({ weather }) => {
  // Function to format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to get icon based on weather condition
  const getWeatherIcon = (condition) => {
    // This is a placeholder - in a real app, you would use actual icons
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

  return (
    <Card style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.date}>{formatDate(weather.date)}</Text>
        <Text style={styles.condition}>{weather.condition}</Text>
      </View>

      <View style={styles.iconRow}>
        <Text style={styles.weatherIcon}>{getWeatherIcon(weather.condition)}</Text>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{weather.temperature.max}°C</Text>
          <Text style={styles.minTemperature}>{weather.temperature.min}°C</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{weather.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Precipitation</Text>
          <Text style={styles.detailValue}>{weather.precipitation}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>{weather.windSpeed} km/h</Text>
        </View>
      </View>

      {weather.advisory && (
        <View style={styles.advisoryContainer}>
          <Text style={styles.advisoryLabel}>Advisory:</Text>
          <Text style={styles.advisoryText}>{weather.advisory}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: SIZES.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  date: {
    ...FONTS.medium,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  condition: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  weatherIcon: {
    fontSize: 48,
    marginRight: SIZES.lg,
  },
  temperatureContainer: {
    flexDirection: 'column',
  },
  temperature: {
    ...FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
  },
  minTemperature: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.md,
    paddingTop: SIZES.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    ...FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  advisoryContainer: {
    backgroundColor: COLORS.card,
    padding: SIZES.sm,
    borderRadius: SIZES.radius,
    marginTop: SIZES.xs,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.warning,
  },
  advisoryLabel: {
    ...FONTS.bold,
    fontSize: 14,
    color: COLORS.warning,
    marginBottom: 2,
  },
  advisoryText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
});

export default WeatherCard;
