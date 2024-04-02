import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import MainButton from './MainButton';
import { QuestionLayoutProps } from './types';

const QuestionsLayout = ({score, currentQuestionIndex, currentQuestion, currentAnswers, selectedAnswer, handleAnswerSelect, onHomePressHandler, onRestartPressHandler }: QuestionLayoutProps) => { 
  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
      <Text style={styles.scoreText}>{currentQuestionIndex < 9 && `Score: ${score}/10`}</Text>
        <View>
          {currentQuestionIndex < 9 ? (
            <>
              <Text style={styles.QuestionNText}>Question N:{currentQuestionIndex + 1}</Text>
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
              {currentAnswers.map((answer: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.answerContainer,
                    selectedAnswer === answer && (answer === currentQuestion.correct_answer ? styles.correctAnswer : styles.incorrectAnswer), // Style for selected answer
                  ]}
                  onPress={() => handleAnswerSelect(answer)}
                  disabled={selectedAnswer !== null}
                >
                  <Text>{answer}</Text>
                </TouchableOpacity>
              ))}
            </>
          ): <Text style={[styles.scoreText, {fontSize: 32}]}>Score: {score}/10</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <MainButton title='Back To Home' onPress={onHomePressHandler}/>
          <MainButton title='Restart Test' onPress={onRestartPressHandler}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    height: '100%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  QuestionNText: {
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%'
  },
  questionText: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 20,
    color: 'black',
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
    backgroundColor: 'lightgreen',
  },
  incorrectAnswer: {
    backgroundColor: 'lightcoral',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'green',
  },
});

export default QuestionsLayout;
