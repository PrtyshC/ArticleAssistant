chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "summarize" || message.action === "chat") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0];

            if (!activeTab || !activeTab.id) {
                console.error("No active tab found.");
                sendResponse({ error: "No active tab found." });
                return;
            }

            
            chrome.scripting.executeScript(
                {
                    target: { tabId: activeTab.id },
                    files: ["content.js"]
                },
                () => {
                    if (chrome.runtime.lastError) {
                        console.error("Error injecting content script:", chrome.runtime.lastError.message);
                        sendResponse({ error: "Error injecting content script" });
                        return;
                    }

                    console.log("Content script injected successfully.");

                    
                    chrome.tabs.sendMessage(activeTab.id, { action: "extractText" }, function (response) {
                        if (chrome.runtime.lastError || !response || !response.text) {
                            console.error("❌ Error extracting text:", chrome.runtime.lastError?.message || "Unknown error");
                            sendResponse({ error: "Failed to extract text from page" });
                            return;
                        }

                        console.log("Extracted text:", response.text);

                        if (message.action === "summarize") {
            
                            fetch("http://localhost:3000/api/summarize", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ text: response.text })
                            })
                            .then(res => res.json())
                            .then(data => {
                                console.log("Summary received:", data);

                                if (data.summary) {
                                    sendResponse({ summary: data.summary });
                                } else {
                                    sendResponse({ error: "Invalid response from summarize API" });
                                }
                            })
                            .catch(error => {
                                console.error("Error fetching summary:", error);
                                sendResponse({ error: "Error fetching summary" });
                            });
                        } 
                        else if (message.action === "chat") {
                            
                            fetch("http://localhost:3000/api/chat", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ text: message.question, context: response.text }),
                            })
                            .then(res => res.json())
                            .then(data => {
                                console.log("Chatbot response received:", data);
                                sendResponse({ answer: data.answer });
                            })
                            .catch(error => {
                                console.error("Error fetching chatbot response:", error);
                                sendResponse({ error: "Error fetching chatbot response" });
                            });
                        }
                    });
                }
            );
        });

        return true; // ✅ Keeps sendResponse open for async operations
    }
});
