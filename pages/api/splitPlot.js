const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { plot } = req.body;

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
    const moviePlot = `Please split the following movie plot into 3 short sentences. 1 sentence should explain the beginning of the movie, 1 should explain the middle and 1 should explain the end.
    Movie plot: ${plot}`;

    // const roleContent = genericCritic;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 200,
      messages: [
        { role: "system", content: 'You are a helpful assistant.' },
        { role: "user", content: moviePlot },
      ],
    });

    const generatedResponse = response.choices[0].message.content;
    // Remove the labels "Beginning:", "Middle:", "End:" using regular expressions
    const plotSentences = generatedResponse.split('\n')
    .map(sentence => sentence.replace(/(Beginning:|Middle:|End:)\s*/, ''));

    // Remove empty lines and trim leading/trailing whitespace
    const plotSentencesFiltered = plotSentences.filter(sentence => sentence.trim() !== '');

    res.status(200).json(plotSentencesFiltered);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
