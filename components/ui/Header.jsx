import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';

const Header = ({
  title,
  showBackButton = true,
  rightComponent,
  style,
  titleStyle,
  backgroundColor = COLORS.background,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor }, style]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            {/* You can replace this with an icon component */}
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightContainer}>
        {rightComponent ? rightComponent : <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: SIZES.xs,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  placeholder: {
    width: 24,
    height: 24,
  },
});

export default Header;
