import { NextResponse } from 'next/server';
import OpenAI from "openai";

require('dotenv').config();

const openaiApiKey = process.env.OPENAI_API_KEY;

const client = new OpenAI({
    apiKey: openaiApiKey,
});

export async function POST(req) {
    const textData = await req.text() // Get prompt from request body
    const data = JSON.parse(textData);

    const prompt = data.prompt;

    try {
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo", // Or any other preferred model
            messages: [{ role: "assistant", content: prompt}],
        });

        console.log(response.choices[0].message)
        return NextResponse.json({ text: response.choices[0].message });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to generate meal plan" });
    }
}
