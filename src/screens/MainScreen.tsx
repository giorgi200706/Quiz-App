import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { fetchTriviaCategories } from '../api/api';
import { useNavigation } from '@react-navigation/native';
import { MainLayout } from '../components';

const MainScreen = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

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
    if(selectedCategory !== null && selectedDifficulty !== null){
      navigation.navigate('Questions', {selectedCategory , selectedDifficulty});
    }else{
      Alert.alert('Please select a category and difficulty.');
    }
  };

  const categoryOptions = allCategories.map((category:{name: string, id: number}) => ({
    label: category.name,
    value: category.id.toString(),
  }));

  return (
    <MainLayout 
      setSelectedCategory={setSelectedCategory} 
      setSelectedDifficulty={setSelectedDifficulty} 
      categoryOptions={categoryOptions} 
      difficultyOptions={difficultyOptions} 
      onStartPressHandler={onStartPressHandler}
    />
  );
};

export default MainScreen;
