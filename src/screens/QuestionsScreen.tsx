import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { fetchTriviaQuestions } from '../api/api';
import { useNavigation } from '@react-navigation/native';
import { QuestionsLayout } from '../components';

let onlyOneShuffle: string[] = [];

const QuestionsScreen = ({ route }: any) => {
  const selectedCategory = route.params.selectedCategory;
  const selectedDifficulty = route.params.selectedDifficulty;
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string  | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    handleStart();
  }, []);

  const handleStart = async () => {
    try {
      const amount = 10;
      const questions = await fetchTriviaQuestions(selectedCategory, selectedDifficulty, amount);
      setFetchedQuestions(questions);
    } catch (error) {
      if(error instanceof Error){
        console.error('Error fetching questions:', error.message);
      }
    }
  };

  const handleAnswerSelect = (selectedOption: string) => {
    setSelectedAnswer(selectedOption);
    if(selectedOption === currentQuestion.correct_answer){
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestionIndex !== fetchedQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }
    }, 1000);
  };

  const onRestartPressHandler = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
  }

  const shuffleArray = (array: string[]) => {
    if(onlyOneShuffle !== array.sort()){
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      onlyOneShuffle = array.sort();
    }
    return array;
  };

  if (fetchedQuestions.length === 0) {
    return <Text>Loading...</Text>;
  }

  const currentQuestion = fetchedQuestions[currentQuestionIndex];
  const currentAnswers = shuffleArray([...currentQuestion.incorrect_answers, currentQuestion.correct_answer]);

  const navigation = useNavigation();
  const onHomePressHandler = () => {
    navigation.navigate('Main');
  }

  return (
    <QuestionsLayout
      score={score}
      currentQuestionIndex={currentQuestionIndex}
      currentQuestion={currentQuestion} 
      currentAnswers={currentAnswers} 
      selectedAnswer={selectedAnswer}
      handleAnswerSelect={handleAnswerSelect}
      onHomePressHandler={onHomePressHandler}
      onRestartPressHandler={onRestartPressHandler}
    />
  );
};

const styles = StyleSheet.create({
  
});

export default QuestionsScreen;
