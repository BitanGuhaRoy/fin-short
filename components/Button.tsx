import React, { ComponentProps } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps {
  title: string;
  onPress: () => void;
  icon?: ComponentProps<typeof Ionicons>['name'];
  style?: any;
}

export function Button({ title, onPress, icon, style }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color="#fff"
          style={styles.icon}
        />
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
