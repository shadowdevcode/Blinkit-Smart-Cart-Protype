import { GoogleGenAI, Type } from "@google/genai";
import { Order, CartItem } from "../types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const productSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A unique product ID" },
        name: { type: Type.STRING, description: "The product name" },
        price: { type: Type.NUMBER, description: "The price of the product in INR" },
        image: { type: Type.STRING, description: "A placeholder image URL from picsum.photos" },
        unit: { type: Type.STRING, description: "The unit of measurement, e.g., '500g', '1L', 'pack of 6'" },
        quantity: { type: Type.INTEGER, description: "The quantity of this item in the order" },
    },
    required: ["id", "name", "price", "image", "unit", "quantity"]
};

const productSchemaWithStatus = {
    type: Type.OBJECT,
    properties: {
        ...productSchema.properties,
        status: { type: Type.STRING, description: "The stock status: 'AVAILABLE', 'OUT_OF_STOCK', or 'DELISTED'." },
        previousPrice: { type: Type.NUMBER, description: "The item's price during the last purchase, only include if it has changed." }
    },
    required: [...productSchema.required, 'status']
};

const orderSchema = {
    type: Type.OBJECT,
    properties: {
        orderId: { type: Type.STRING, description: "A unique order ID" },
        date: { type: Type.STRING, description: "The date of the order in ISO 8601 format" },
        items: {
            type: Type.ARRAY,
            items: productSchema
        },
    },
    required: ["orderId", "date", "items"]
};


export const generateAndPredictCart = async (): Promise<{ pastOrders: Order[]; predictedCart: CartItem[] }> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
                You are a user data simulator and shopping cart predictor for an Indian online grocery app like Blinkit.
                Your task is to perform two steps in one go and provide a single JSON object as output.

                Step 1: Internally simulate a realistic purchase history.
                - Generate a history of the last 4 weekly orders for a user in India.
                - Include common Indian household items: Atta (flour), Dal (lentils), Ghee, Paneer, Dahi (yogurt), rice, onions, tomatoes, and some popular snacks like 'Kurkure' or 'Lays'.
                - Vary quantities and items slightly between orders.
                - Each order's total value must be at least 350 INR.
                - This simulated history should be included in the final JSON output under the key "pastOrders".

                Step 2: Predict the next smart cart.
                - Based on the history you just generated, analyze buying frequency and recency to predict their next weekly shopping cart.
                - The prediction should be a list of items they are most likely to need now.
                - Exclude one-off purchases.
                - Apply these modifications to the predicted items:
                    1. Mark exactly one item as 'OUT_OF_STOCK'.
                    2. Mark exactly one different item as 'DELISTED'.
                    3. For exactly one of the 'AVAILABLE' items, provide a 'previousPrice' that is different from its current 'price'.
                    4. All other items must have a status of 'AVAILABLE'.
                - This predicted cart should be in the final JSON output under the key "predictedCart".

                For all items, use 'https://picsum.photos/100/100' for images and calculate prices in INR.
                Provide the output as a single JSON object.
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        pastOrders: {
                            type: Type.ARRAY,
                            items: orderSchema,
                            description: "The simulated past 4 orders."
                        },
                        predictedCart: {
                            type: Type.ARRAY,
                            items: productSchemaWithStatus,
                            description: "The AI-predicted next shopping cart."
                        }
                    },
                    required: ["pastOrders", "predictedCart"]
                }
            }
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (!data.pastOrders || !data.predictedCart) {
            console.error("AI response is missing required keys:", data);
            throw new Error("AI returned an unexpected format.");
        }

        return data as { pastOrders: Order[]; predictedCart: CartItem[] };

    } catch (error) {
        console.error("Error generating and predicting cart:", error);
        throw new Error("Failed to generate and predict smart cart from AI.");
    }
};