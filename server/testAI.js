require("dotenv").config();

const { analyzeCode } = require("./src/services/ai/aiService");

(async () => {

    const result = await analyzeCode({
            language: "javascript",
            reviewType: "Security",
            code: `function login(password){
            if(password=="12345"){
                    console.log("Logged In");
                }
            }
        `,
        });
    console.log(result);
})();