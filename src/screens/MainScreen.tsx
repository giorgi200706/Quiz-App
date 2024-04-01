import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { fetchTriviaCategories } from '../api/api';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const difficultyOptions = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ];
  
  const fetchCategories = async () => {
    try {
      const fetchedAllCategories = await fetchTriviaCategories();
      setAllCategories(fetchedAllCategories);
    } catch (error) {
      if(error instanceof Error){
        console.error('Error fetching categories:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const navigation = useNavigation();
  const onStartPressHandler = () => {
    if(selectedCategory && selectedDifficulty){
      navigation.navigate('Questions', {selectedCategory, selectedDifficulty});
    }else{
      Alert.alert('Please select a category and difficulty.');
    }
  };

  const categoryOptions = allCategories.map((category:{name: string, id: number}) => ({
    label: category.name,
    value: category.id.toString(),
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>Pick category and difficulty level:</Text>
      
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

      <Button title="Start" onPress={onStartPressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 10,
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

export default MainScreen;
