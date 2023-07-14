// Make an API call to get a movie plot 
export default async function getMoviePlot (req, res) {
    const { movieTitle } = req.body;
    const apiKey = process.env.OMDB_API_KEY;

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        // Store the API response in a variable
        let response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}&plot=full`);

        // If the call failed, throw an error
        if (!response.ok) {
            throw 'Something went wrong.';
        }

        // Otherwise, get the post JSON
        let data = await response.json();

        res.status(200).json(data.Plot);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}