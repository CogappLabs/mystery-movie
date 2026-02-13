const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    const { prompts } = req.body;
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const imagePromises = prompts.map(async (prompt) => {
            const response = await openai.images.generate({
                prompt: prompt,
                n: 1,
                size: "512x512",
            });

            return response.data[0].url;
        });

        const imageUrls = await Promise.all(imagePromises);

        res.status(200).json(imageUrls);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
