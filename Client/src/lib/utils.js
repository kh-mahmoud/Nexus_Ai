

import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });


// Helper function to convert Blob to base64 string
export const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(",")[1]); // Get base64 part
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };




