
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

export const generatePastOrders = async (): Promise<Order[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
                You are a user data simulator for an Indian online grocery app like Blinkit.
                Generate a realistic purchase history for a user in India who shops weekly.
                The history should span the last 4 orders.
                Include common Indian household items like Atta (flour), Dal (lentils), Ghee, Paneer, Dahi (yogurt), rice, onions, tomatoes, and some popular snacks like 'Kurkure' or 'Lays'.
                Vary the quantities and items slightly between orders to show a realistic pattern.
                The total value for each order must be at least 350 Rupees. Calculate prices in INR.
                For images, use 'https://picsum.photos/100/100' as a placeholder.
                Provide the output as a JSON object, with prices as numbers.
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
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
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);
        if (!Array.isArray(data)) {
            console.error("AI response for past orders was not an array:", data);
            throw new Error("AI returned an unexpected format for past orders.");
        }
        return data as Order[];
    } catch (error) {
        console.error("Error generating past orders:", error);
        throw new Error("Failed to generate past orders from AI.");
    }
};


export const predictSmartCart = async (pastOrders: Order[]): Promise<CartItem[]> => {
    try {
        const prompt = `
            Given the following purchase history (in INR) for a user in India:
            ${JSON.stringify(pastOrders, null, 2)}

            Analyze their buying frequency, recency, and common quantities. 
            Predict their next weekly shopping cart. The prediction should be a list of items they are most likely to need now.
            Exclude items that were purchased only once or seem to be a one-off purchase.
            
            To make this simulation more realistic, please apply the following rules to the predicted items:
            1. Mark one item as 'OUT_OF_STOCK'. This item's price should not be counted in any total. Set its quantity to what it normally would be.
            2. For one of the available items, provide a 'previousPrice' that is different from its current 'price' to simulate a price change. For example, if the current price is 55, set previousPrice to 52.
            3. All other items should have a status of 'AVAILABLE'.
            4. Do not include any 'DELISTED' items in this prediction.

            Return a JSON array of items, with prices in INR.
            For images, use 'https://picsum.photos/100/100' as a placeholder.
        `;
        
        const productSchemaWithStatus = {
            type: Type.OBJECT,
            properties: {
                ...productSchema.properties,
                status: { type: Type.STRING, description: "The stock status: 'AVAILABLE' or 'OUT_OF_STOCK'." },
                previousPrice: { type: Type.NUMBER, description: "The item's price during the last purchase, only include if it has changed." }
            },
            // The required fields from productSchema PLUS 'status'. 'previousPrice' is optional as it's not in this list.
            required: [...productSchema.required, 'status']
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: productSchemaWithStatus
                }
            }
        });
        
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);
        if (!Array.isArray(data)) {
            console.error("AI response for smart cart was not an array:", data);
            throw new Error("AI returned an unexpected format for the smart cart.");
        }
        return data as CartItem[];
    } catch (error) {
        console.error("Error predicting smart cart:", error);
        throw new Error("Failed to predict smart cart from AI.");
    }
};