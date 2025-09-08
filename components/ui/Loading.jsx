import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { COLORS, FONTS } from '../../utils/theme';

const Loading = ({
  size = 'large',
  color = COLORS.primary,
  text = 'Loading...',
  fullScreen = false,
  backgroundColor = COLORS.background,
}) => {
  if (fullScreen) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size={size} color={color} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.centered}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    color: COLORS.textPrimary,
    ...FONTS.medium,
  },
});

export default Loading;
