import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MainButton from './MainButton'; // Update the import path

interface Props {
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedDifficulty: React.Dispatch<React.SetStateAction<string | null>>;
  categoryOptions: { label: string; value: string }[];
  difficultyOptions: { label: string; value: string }[];
  onStartPressHandler: () => void;
}

const MainLayout = ({
  setSelectedCategory,
  setSelectedDifficulty,
  categoryOptions,
  difficultyOptions,
  onStartPressHandler,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.miniContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.questionText}>Pick Category And Difficulty Level:</Text>

          <RNPickerSelect
            placeholder={{
              label: 'Select Category',
              value: null,
            }}
            onValueChange={(value) => setSelectedCategory(value)}
            items={categoryOptions}
            style={pickerSelectStyles}
          />

          <RNPickerSelect
            placeholder={{
              label: 'Select Difficulty',
              value: null,
            }}
            onValueChange={(value) => setSelectedDifficulty(value)}
            items={difficultyOptions}
            style={pickerSelectStyles}
          />
        </View>

        <MainButton title="Start" onPress={onStartPressHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  miniContainer: {
    width: '100%',
    height: '75%',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  questionText: {
    lineHeight: 32,
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginBottom: 20,
    width: '100%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    marginBottom: 20,
    width: '100%',
  },
});

export default MainLayout;
