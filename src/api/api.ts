import axios from 'axios';

const BASE_URL = 'https://opentdb.com';

export async function fetchTriviaQuestions(category: number, difficulty: string, amount: number) {
  try {
    const response = await axios.get(`${BASE_URL}/api.php`, {
      params: {
        amount,
        category,
        difficulty,
      }, 
    });

    if (response.status === 200) {
      return response.data.results;
    } else {
      throw new Error('Failed to fetch questions');
    }
  } catch (error) {
    if(error instanceof Error){
      console.error('Error fetching questions:', error.message);
      throw error;
    }
  }
}

export async function fetchTriviaCategories() {
  try {
    const response = await axios.get(`${BASE_URL}/api_category.php`);

    if (response.status === 200) {
      return response.data.trivia_categories;
    } else {
      throw new Error('Failed to fetch categories');
    }
  } catch (error) {
    if(error instanceof Error){
      console.error('Error fetching categories:', error.message);
      throw error;
    }
  }
}
