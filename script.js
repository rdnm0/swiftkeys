// 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
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const wordCountDisplay = document.getElementById('wordCount');
    const charCountDisplay = document.getElementById('charCount');
    const feedbackDisplay = document.getElementById('feedback');

    textInput.addEventListener('input', function() {
        const text = textInput.value;
        const wordCount = countWords(text);
        const charCount = text.length;

        wordCountDisplay.textContent = `Word Count: ${wordCount}`;
        charCountDisplay.textContent = `Character Count: ${charCount}`;

        if (wordCount > 0) {
            getFeedback(text);
        } else {
            feedbackDisplay.textContent = "";
        }
    });

    function countWords(text) {
        const words = text.trim().split(/\s+/);
        return words.filter(word => word !== '').length;
    }

    function getFeedback(text) {
        const apiKey = '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';
        const endpoint = 'https://api.openai.com/v1/engines/davinci/completions';

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: text,
                max_tokens: 50 // Adjust as needed
            })
        })
        .then(response => response.json())
        .then(data => {
            const generatedFeedback = data.choices[0].text.trim();
            feedbackDisplay.textContent = `AI Feedback: ${generatedFeedback}`;
        })
        .catch(error => {
            console.error('Error fetching AI feedback:', error);
            feedbackDisplay.textContent = "Error fetching feedback. Please try again.";
        });
    }
});
