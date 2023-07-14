import AnswerForm from './answerForm'

// Get artwork data from form and store or discard
export default function checkAnswer(answer) {
    // Get current title
    if (localStorage.getItem('movieTitle')) {
        // object = JSON.parse(localStorage.getItem('movieTitle'));
        
        let storedMovieTitle = localStorage.getItem('movieTitle');

        // Todo: There must be a better way, like removing the wrapping "" from storedMovieTitle?
        if (storedMovieTitle === '"' + answer.toLowerCase() + '"') {
            // Code to execute if the comparison is true
            alert('Well done! You won the game.');
            setIsActive(true);
        } else {
            // Code to execute if the comparison is false
            alert('Too bad, that\'s the wrong answer. The correct answer is ' + storedMovieTitle);
        }
    }
}