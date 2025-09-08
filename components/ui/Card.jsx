import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../utils/theme';

const Card = ({
  children,
  style,
  onPress,
  elevation = 'medium',
  backgroundColor = COLORS.card,
  borderRadius = SIZES.radius,
  padding = SIZES.md,
}) => {
  const cardStyles = [
    styles.card,
    elevation === 'small' && SHADOWS.small,
    elevation === 'medium' && SHADOWS.medium,
    elevation === 'large' && SHADOWS.large,
    {
      backgroundColor,
      borderRadius,
      padding,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginVertical: SIZES.sm,
    overflow: 'hidden',
  },
});

export default Card;
