import { Router } from 'express';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const openai = createOpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    headers: {
        'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
        'X-Title': 'AI Kingdom Council',
    },
});

router.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        const result = await streamText({
            model: openai('openai/gpt-4o'), // You can make this dynamic based on req.body.model
            messages,
        });

        result.pipeDataStreamToResponse(res);

    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

export default router;

