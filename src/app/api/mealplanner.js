import openai from 'openai';
require('dotenv').config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = new openai.OpenAI(openaiApiKey);

export default async function handler(req, res) {
    try {
        const prompt = req.body.prompt; // Get prompt from request body
        console.log(prompt);
        /*const response = await openai.createCompletion({
            model: "text-davinci-003", // Or any other preferred model
            prompt: prompt,
            max_tokens: 150, // Adjust as needed
            temperature: 0.7, // Adjust for creativity
            // ...other parameters
        });*/
        res.status(200).json({ text: prompt/*response.data.choices[0].text*/ });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate text" });
    }
}
