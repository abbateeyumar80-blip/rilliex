import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { USER_NAME, USER_BIO_EN, USER_BIO_ZH, SCHEDULE_DATA, ACHIEVEMENTS_DATA, COACHING_INFO, SOCIAL_DATA } from '../constants';
import { Language } from '../types';

// Initialize Gemini Client
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const getSystemInstruction = (language: Language) => {
    const bio = language === 'en' ? USER_BIO_EN : USER_BIO_ZH;
    const langInstruction = language === 'en' 
        ? "Respond in English." 
        : "Respond in Chinese (Simplified).";

    const achievementsText = ACHIEVEMENTS_DATA.map(a => 
        `- ${a.year}: ${language === 'en' ? a.title_en : a.title_zh}`
    ).join('\n');

    const coachingText = `
    Location: ${COACHING_INFO.locations[language]}
    Target Students: ${COACHING_INFO.targets[language].join(', ')}
    Format: ${COACHING_INFO.formats[language].join(', ')}
    `;

    const socialText = SOCIAL_DATA.map(s => 
        `- ${s.platform} (${s.handle}): ${s.followers} followers. URL: ${s.url}`
    ).join('\n');

    return `
You are an AI Assistant for the personal website of ${USER_NAME}.
Your persona is professional, knowledgeable about tennis, and friendly.
${langInstruction}

Context about ${USER_NAME}:
${bio}

Social Media Stats:
${socialText}

Coaching Info:
${coachingText}

Key Achievements:
${achievementsText}

Typical Weekly Schedule:
${SCHEDULE_DATA.map(e => `- ${e.dayOfWeek} at ${e.time}: ${e.title} (${e.type})`).join('\n')}

Your goal is to answer visitor questions about ${USER_NAME}, their tennis schedule, coaching availability, career achievements, or general tennis advice.
Keep answers concise (under 100 words usually) and engaging.
If asked about coaching, emphasize the "Hainan/Chengdu" locations and encourage them to contact via email.
If asked about videos or social media, direct them to the appropriate platform from the list above.
`;
};

export const createChatSession = (language: Language = 'en'): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: getSystemInstruction(language),
      temperature: 0.7,
    },
  });
};

export const sendMessageToGemini = async (chatSession: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong connecting to the AI coach. Please try again.";
  }
};