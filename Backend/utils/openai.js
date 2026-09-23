import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: message }]
                }
            ]
        })
    };

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
            options
        );
        const data = await response.json();

        if (data.error) {
            console.log("Gemini error:", data.error.message);
            return null;
        }

        return data.candidates[0].content.parts[0].text; //reply
    } catch (err) {
        console.log(err);
    }
};

export default getOpenAIAPIResponse;