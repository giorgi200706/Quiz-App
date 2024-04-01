import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { fetchTriviaQuestions } from '../api/api';
import { useNavigation } from '@react-navigation/native';

let onlyOneShuffle = 0;

const QuestionScreen = ({ route }) => {
  const selectedCategory = route.params.selectedCategory;
  const selectedDifficulty = route.params.selectedDifficulty;
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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
      console.error('Error fetching questions:', error.message);
    }
  };

  const handleAnswerSelect = (selectedOption) => {
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

  const shuffleArray = (array) => {
    if(onlyOneShuffle>0){
      return array;
    }
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    onlyOneShuffle++;
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
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}/10</Text>
      {currentQuestionIndex < 9 && (
        <>
          <Text style={styles.scoreText}>Question N: {currentQuestionIndex + 1}</Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          {currentAnswers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerContainer,
                selectedAnswer === answer && (answer === currentQuestion.correct_answer ? styles.correctAnswer : styles.incorrectAnswer), // Style for selected answer
              ]}
              onPress={() => handleAnswerSelect(answer)}
              disabled={selectedAnswer !== null} // Disable selecting a new answer until next question
            >
              <Text>{answer}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
      <Button title='Back To Home' onPress={onHomePressHandler}/>
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
    textAlign: 'center',
  },
  answerContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  correctAnswer: {
    backgroundColor: 'lightgreen', // Background color for correct answer
  },
  incorrectAnswer: {
    backgroundColor: 'lightcoral', // Background color for incorrect answer
  },
  scoreText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default QuestionScreen;
