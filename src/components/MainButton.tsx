import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

const MainButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.bigGreenButton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bigGreenButton: {
    backgroundColor: '#188918',
    paddingVertical: 10,
    borderRadius: 10,
    margin: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainButton;
