function extractText() {
  let bodyText = document.body.innerText;

  console.log("📄 Extracted Raw Text Length:", bodyText.length); // Debug log
  if (!bodyText || bodyText.trim() === "") {
    console.error("❌ Error: No text found on the page.");
    return null;
  }

  let trimmedText = bodyText.substring(0, 10000).trim();
  console.log("✂️ Trimmed Text Length:", trimmedText.length); // Debug log
  return trimmedText;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractText") {
    console.log("📩 Received request to extract text.");
    const extractedText = extractText();

    if (extractedText) {
      console.log("✅ Sending extracted text to popup.");
      sendResponse({ text: extractedText });
    } else {
      console.error("❌ Sending error response: Failed to extract text.");
      sendResponse({ error: "Failed to extract text from page" });
    }
  }
});
