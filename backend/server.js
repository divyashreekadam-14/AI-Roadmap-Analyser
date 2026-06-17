const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("AI Career Guidance Backend is Running 🚀");
});

// Get Skills for Any IT Role
app.get("/api/role/:roleName", async (req, res) => {
    try {
        const roleName = req.params.roleName?.trim();

        // Validate input
        if (!roleName) {
            return res.status(400).json({
                message: "Role name is required"
            });
        }

        console.log(`Searching skills for: ${roleName}`);

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4.1-mini",

                messages: [
                    {
                        role: "system",
                        content: `
You are a career guidance expert.

Return ONLY valid JSON.

Rules:
- No explanations
- No markdown
- No code blocks
- Return exactly 10 beginner-friendly technical skills
- Use short and common skill names
- Maximum 1-2 words per skill
`
                    },
                    {
                        role: "user",
                        content: `
For the role "${roleName}", return JSON in this exact format:

{
  "role": "${roleName}",
  "skills": [
    "skill1",
    "skill2",
    "skill3",
    "skill4",
    "skill5",
    "skill6",
    "skill7",
    "skill8",
    "skill9",
    "skill10"
  ]
}

Examples of skills:
Linux
Docker
AWS
Git
Python
SQL
Networking
JavaScript

Return ONLY JSON.
`
                    }
                ],

                temperature: 0.3,
                max_tokens: 300
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",

                    // Optional OpenRouter headers
                    "HTTP-Referer": "http://localhost:5500",
                    "X-Title": "AI Career Guidance"
                },

                timeout: 30000
            }
        );

        let aiResponse =
            response.data?.choices?.[0]?.message?.content;

        if (!aiResponse) {
            return res.status(500).json({
                message: "No response received from AI"
            });
        }

        console.log("Raw AI Response:", aiResponse);

        // Remove markdown if AI adds it accidentally
        aiResponse = aiResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let parsedResponse;

        try {
            parsedResponse = JSON.parse(aiResponse);

            // Validate response structure
            if (
                !parsedResponse.role ||
                !Array.isArray(parsedResponse.skills)
            ) {
                throw new Error(
                    "Invalid response structure"
                );
            }

            // Limit to 10 skills
            parsedResponse.skills =
                parsedResponse.skills.slice(0, 10);

        } catch (parseError) {

            console.error(
                "JSON Parse Error:",
                parseError.message
            );

            return res.status(500).json({
                message:
                    "Invalid JSON received from AI",
                rawResponse: aiResponse
            });
        }

        // Return data directly
        res.json(parsedResponse);

    } catch (error) {

        console.error(
            "OpenRouter Error:",
            error.response?.data ||
            error.message
        );

        res.status(
            error.response?.status || 500
        ).json({
            message:
                error.response?.data?.error?.message ||
                "Unable to fetch role skills"
        });
    }
});

// 404 Route
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(
        `🚀 Server running on http://localhost:${PORT}`
    );
});