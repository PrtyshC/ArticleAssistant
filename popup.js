document.getElementById('summarizeBtn').addEventListener('click', function () {
    // Show loading spinner while the summarize function is processing
    document.getElementById('loading').style.display = 'block';
    document.getElementById('summary').textContent = "";  // Clear previous summary

    chrome.runtime.sendMessage({ action: "summarize" }, function (response) {
        console.log("Response received in popup:", response);

        // Hide loading spinner after the response is received
        document.getElementById('loading').style.display = 'none';

        if (!response) {
            document.getElementById('summary').textContent = "Error: No response received.";
            return;
        }

        if (response.error) {
            console.error("Error from background script:", response.error);
            document.getElementById('summary').textContent = `Error: ${response.error}`;
        } else {
            console.log("Summary received:", response.summary);
            document.getElementById('summary').textContent = response.summary || "No summary found.";
        }
    });
});

document.getElementById('askBtn').addEventListener('click', function () {
    const query = document.getElementById('queryInput').value.trim();

    if (query) {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('response').textContent = "";  

        chrome.runtime.sendMessage({ action: "chat", question: query }, function (response) {
            console.log("📩 Extracted text response:", response);
            
            if (!response || !response.answer) {
                console.error("❌ Error: No chatbot answer received!", response);
                document.getElementById('response').textContent = "Failed to get an answer.";
            } else {
                console.log("✅ Chatbot answer:", response.answer);

                let formattedAnswer = beautifyAnswer(response.answer);
                
                document.getElementById('response').innerHTML = formattedAnswer;
            }

            document.getElementById('loading').style.display = 'none';
        });
    }
});


function beautifyAnswer(answer) {
    
    answer = answer.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    
    
    answer = answer.replace(/\n/g, '<br>');

    return answer;
}
