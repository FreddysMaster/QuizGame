<script>
// @ts-nocheck
import { Sound } from "svelte-sound";
import correctsound from "./assets/correctsound.mp3";
import incorrectsound from "./assets/wrongsound.mp3";
const correct_sound = new Sound(correctsound);
const incorrect_sound = new Sound(incorrectsound);
let score =  0;
let currentQuestionIndex =  0;
let categories = [
    'General Knowledge',
    'Entertainment: Books',
    'Entertainment: Film',
    'Entertainment: Music',
    'Entertainment: Musicals &amp; Theatres',
    'Entertainment: Television',
    'Entertainment: Video Games',
    'Entertainment: Board Games',
    'Science &amp; Nature',
    'Science: Computers',
    'Science: Mathematics',
    'Mythology',
    'Sports',
    'Geography',
    'History',
    'Politics',
    'Art',
    'Celebrities',
    'Animals',
    'Vehicles',
    'Entertainment: Comics',
    'Science: Gadgets',
    'Entertainment: Japanese Anime &amp; Manga',
    'Entertainment: Cartoon &amp; Animations'
  ];
let selectedCategory = '';

let questions = [];

let loading = true; // Add a loading state

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length -  1; i >  0; i--) {
    const j = Math.floor(Math.random() * (i +  1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Fetch questions from the backend when the page loads
async function fetchQuestions() {
  try {
    let allQuestions = [];
    // Fetch questions for random categories
    for (let i =  0; i <  categories.length; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const response = await fetch(`http://localhost:3000/api/questions?category=${randomCategory}`);
      const categoryQuestions = await response.json();
      allQuestions = [...allQuestions, ...categoryQuestions];
    }
    // Shuffle the questions
    questions = shuffleArray(allQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
  } finally {
    loading = false; // Set loading to false regardless of success or failure
  }
}


// Call fetchQuestions when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchQuestions();
});
 
  let filteredQuestions = [];
  $: filteredQuestions = questions.filter(q => !selectedCategory || q.category === selectedCategory);
 
  let selectedAnswers = {};
 
  function handleCategoryChange(event) {
     selectedCategory = event.target.value;
     currentQuestionIndex = 0;
  }
 
  function handleClick(answer) {
   currentQuestionIndex++;
   if (answer !== filteredQuestions[currentQuestionIndex - 1].correctAnswer) {
       gameOver = true;
       incorrect_sound.play();
   } else {
       correct_sound.play();
       score++;
   }
}

  let gameOver = false;

// Reactive statement to check if the game is over
$: if (!loading && currentQuestionIndex >= filteredQuestions.length && score === 0) {
 gameOver = true;
}

// Function to reset the game state
function resetGame() {
  questions = shuffleArray(questions);
  score = 0;
  currentQuestionIndex = 0;
  gameOver = false;
}
 </script>
 
 <main>
  <!-- Category Selection -->
  <select bind:value={selectedCategory} on:change={handleCategoryChange}>
     <option value="">All Categories</option>
     {#each categories as category}
       <option value={category}>{category}</option>
     {/each}
  </select>
 
  <!-- Quiz Interface -->
  {#if gameOver}
  <div class="game-over">
    <h2>Game Over!</h2>
    <p>You got {score} question(s) right.</p>
    <button on:click={resetGame}>Try Again</button>
  </div>
  {:else if filteredQuestions.length > 0 && currentQuestionIndex < filteredQuestions.length}
  <h2>Score: {score}</h2>
  <h2 class="question">{filteredQuestions[currentQuestionIndex].question}</h2>
  <div class="grid">
     {#each filteredQuestions[currentQuestionIndex].answers as answer, index (answer)}
       <button on:click|preventDefault={() => handleClick(answer)}>
         <span class="answer-label">{`${String.fromCharCode(65 + index)}. `}</span>{answer}
       </button>
     {/each}
   </div>
  {:else}
     <h2>Congrats! You answered all our questions!</h2>
     <h2>Score: {score}</h2>
     <button on:click={resetGame}>Play Again</button>
  {/if}
 </main>