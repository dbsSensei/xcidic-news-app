import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IconButton({ iconName, color, size, onPress, style }:any) {
  return (
    <TouchableOpacity style={[style]} onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
}
