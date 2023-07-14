const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const { prompts } = req.body;
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const imageUrls = [];

        for (const prompt of prompts) {
            const response = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: "512x512",
            });

            const imageUrl = response.data.data[0].url;
            imageUrls.push(imageUrl);
        }

    res.status(200).json(imageUrls);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
