import React, { useState } from 'react'
import ImageRow from './imageRow'
import AnswerForm from './answerForm'

export default function Home() {
  const apiKey = process.env.OPENAI_API_KEY;
  const [showImageRow, setShowImageRow] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);

  const HandleButtonClick = async () => {
    setIsInProgress(true);

    try {
      const movies = ['Titanic', 'Finding+Nemo', 'Forest+Gump', 'The+Shawshank+Redemption', 'Die+Hard', 'The+Wizard+Of+Oz', 'Home+Alone', 'The+Little+Mermaid', 'Matilda', '27+Dresses', 'The+Devil+Wears+Prada', 'The+Princess+Diaries', 'Mamma+Mia+!', 'The+Godfather', 'The+Dark+Knight', 'Jaws', 'Alien', 'The+Truman+Show', 'Interstellar', 'Inception', 'Toy+Story', 'Gone+Girl', 'The+Kings+Speech', 'La+La+Land', 'The+Social+Network', 'Arrival'];


      // Generate a random index within the array length
      const randomIndex = Math.floor(Math.random() * movies.length);

      // Get the random item from the array
      const randomTitle = movies[randomIndex];

      const modifiedTitle = randomTitle.toLowerCase().replace(/\+/g, ' ');
      localStorage.setItem('movieTitle', JSON.stringify(modifiedTitle));


      const response = await fetch("/api/getPlot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          movieTitle: randomTitle
        }),
      });
      const data = await response.json();

      generateSentences(data);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const generateSentences = async (plot) => {
    try {
      const response = await fetch("/api/splitPlot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          plot: plot
        }),
      });
      const data = await response.json();
      // Display the data response in the console
      console.log(data); 

      if (!Array.isArray(data)) {
        console.log('Invalid image prompt');
        return;
      } 

      fetchImageUrls(data);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [imageUrls, setImageUrls] = useState([]);

  const fetchImageUrls = async (sentences) => {
    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompts: sentences
        }),
      });
      const data = await response.json();

      setImageUrls(data);
      setShowImageRow(true);
      setShowAnswerForm(true);
      setShowButton(false);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-10 mx-auto mb-10">
      <h1 className="mb-4 text-2xl font-bold">Mystery Movie</h1>
      <p className="mb-2"><span className="font-bold">How to use:</span> Click 'Play Now' to generate three AI images based on the plot of a random movie. The images will depict the start, middle and end of the story.</p>
			<p className="mb-4">Can you guess the movie title?</p> 

      {showButton && <div className="flex items-center mb-6"><button className="font-bold rounded-md bg-violet-600 text-white hover:bg-white hover:text-violet-600 active:bg-white active:text-violet-600 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-sky-400 p-2" onClick={HandleButtonClick}>Play Now</button><p className={isInProgress ? 'ml-4' : 'hidden'}>Image generation in progress... this may take some time.</p></div>}
      {showAnswerForm && <AnswerForm />}
      {showImageRow && <ImageRow imageUrls={imageUrls} />}
    </div>
  );
}
