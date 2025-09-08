import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/theme';

const Button = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const getButtonStyles = () => {
    let buttonStyles = [styles.button];
    
    // Button type
    if (type === 'primary') {
      buttonStyles.push(styles.primaryButton);
    } else if (type === 'secondary') {
      buttonStyles.push(styles.secondaryButton);
    } else if (type === 'outline') {
      buttonStyles.push(styles.outlineButton);
    } else if (type === 'text') {
      buttonStyles.push(styles.textButton);
    }
    
    // Button size
    if (size === 'small') {
      buttonStyles.push(styles.smallButton);
    } else if (size === 'large') {
      buttonStyles.push(styles.largeButton);
    }
    
    // Disabled state
    if (disabled) {
      buttonStyles.push(styles.disabledButton);
    }
    
    // Custom styles
    if (style) {
      buttonStyles.push(style);
    }
    
    return buttonStyles;
  };
  
  const getTextStyles = () => {
    let textStyles = [styles.buttonText];
    
    // Text color based on button type
    if (type === 'primary') {
      textStyles.push(styles.primaryButtonText);
    } else if (type === 'secondary') {
      textStyles.push(styles.secondaryButtonText);
    } else if (type === 'outline') {
      textStyles.push(styles.outlineButtonText);
    } else if (type === 'text') {
      textStyles.push(styles.textButtonText);
    }
    
    // Text size based on button size
    if (size === 'small') {
      textStyles.push(styles.smallButtonText);
    } else if (size === 'large') {
      textStyles.push(styles.largeButtonText);
    }
    
    // Disabled state
    if (disabled) {
      textStyles.push(styles.disabledButtonText);
    }
    
    // Custom text styles
    if (textStyle) {
      textStyles.push(textStyle);
    }
    
    return textStyles;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyles()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' ? COLORS.primary : COLORS.textPrimary} size="small" />
      ) : (
        <>
          {icon && icon}
          <Text style={getTextStyles()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.lg,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  smallButton: {
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.sm,
  },
  largeButton: {
    paddingVertical: SIZES.lg,
    paddingHorizontal: SIZES.xl,
  },
  disabledButton: {
    backgroundColor: COLORS.border,
    borderColor: COLORS.border,
    opacity: 0.7,
  },
  buttonText: {
    ...FONTS.medium,
    marginLeft: 8,
  },
  primaryButtonText: {
    color: COLORS.textPrimary,
  },
  secondaryButtonText: {
    color: COLORS.textPrimary,
  },
  outlineButtonText: {
    color: COLORS.primary,
  },
  textButtonText: {
    color: COLORS.primary,
  },
  smallButtonText: {
    fontSize: 12,
  },
  largeButtonText: {
    fontSize: 16,
  },
  disabledButtonText: {
    color: COLORS.textSecondary,
  },
});

export default Button;
