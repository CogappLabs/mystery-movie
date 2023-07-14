import React, { useState } from 'react'
// import RevealAnswer from './revealAnswer'
import Emoji from 'react-emoji-render';

const AnswerForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [isRight, setIsRight] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false);
    const [localStorageValue, setLocalStorageValue] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        // Get current title
        if (localStorage.getItem('movieTitle')) {
            // object = JSON.parse(localStorage.getItem('movieTitle'));
            
            let storedMovieTitle = localStorage.getItem('movieTitle');

            // Todo: There must be a better way, like removing the wrapping "" from storedMovieTitle?
            if (storedMovieTitle === '"' + inputValue.toLowerCase() + '"') {
                // Code to execute if the comparison is true
                setIsRight(true);
                setIsWrong(false);
                setShowButton(false);
            } else {
                // Code to execute if the comparison is false
                // alert('Too bad, that\'s the wrong answer. The correct answer is ' + storedMovieTitle);
                setIsWrong(true);
            }
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const revealAnswer = (e) => {
        e.preventDefault();

        if (localStorage.getItem('movieTitle')) {        
            const storedMovieTitle = localStorage.getItem('movieTitle');

            const arr = storedMovieTitle.split(" ");

            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].replace(/"/g, '');
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1); 
            }

            const formattedMovieTitle = arr.join(" ");


            setLocalStorageValue(formattedMovieTitle);

            setShowAnswer(true);
            setShowButton(false);
            setIsWrong(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="answer-title" className="mr-4 font-bold">Guess the Title:</label>
            <input type="text" className="rounded-md text-black focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-sky-400 p-2" name="answer" value={inputValue} onChange={handleInputChange}></input>
            
            <p className={isRight ? 'font-bold text-lg mt-6 mb-6' : 'hidden'}>Well done! You won the game! <Emoji text=":tada:" /></p>
            <p className={isWrong ? 'font-bold text-lg mt-6' : 'hidden'}>Too bad, that&apos;s the wrong answer.</p>
            {showAnswer && <p className="font-bold text-lg mt-6 mb-6">The correct answer is: {localStorageValue}</p>}
            <div className="flex">
                <button type="submit" className={showButton ? 'block rounded-md bg-violet-600 text-white p-2 mt-6 mr-6 mb-6 hover:bg-white hover:text-violet-600 active:bg-white active:text-violet-600 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-sky-400' : 'hidden'}>Submit</button>
                <button className={isWrong ? 'block rounded-md bg-violet-600 text-white hover:bg-white hover:text-violet-600 active:bg-white active:text-violet-600 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-sky-400 p-2 mt-6 mb-6' : 'hidden'} onClick={revealAnswer}>Reveal the Answer</button>
            </div>
        </form>
    );
};

export default AnswerForm;