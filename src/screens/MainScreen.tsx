import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { fetchTriviaQuestions, fetchTriviaCategories } from '../api/api';

const MainScreen = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);

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

  const handleStart = async () => {
    try {
      const amount = 10;
      const fetchedQuestions = await fetchTriviaQuestions(selectedCategory, selectedDifficulty, amount);
      console.log('Fetched Questions:', fetchedQuestions);
      setQuestions(fetchedQuestions);
    } catch (error) {
      if(error instanceof Error){
        console.error('Error fetching categories:', error.message);
        throw error;
      }
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

      <Button title="Start" onPress={handleStart} />

      {/* <Text style={styles.questionText}>Fetched Questions:</Text>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text>{index + 1}. {question.question}</Text>
        </View>
      ))} */}
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
