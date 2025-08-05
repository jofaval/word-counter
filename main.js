(() => {
  displaySavedTexts();

  getTextArea().addEventListener("input", () => {
    getWordCountSpan().textContent = countWords(getTextArea().value);
  });

  document.getElementById("save").addEventListener("click", onSaveClick);
})();

/**
 * @returns {HTMLTextAreaElement} The textarea element where the user inputs text.
 */
function getTextArea() {
  return document.getElementById("text");
}

/**
 * @returns {HTMLSpanElement} The span element that displays the word count.
 *
 */
function getWordCountSpan() {
  return document.getElementById("word-count");
}

/**
 * @returns {HTMLDivElement} The div element that displays the count of saved texts.
 */
function getSavedTextsCount() {
  return document.querySelector(".saved-texts-count");
}

/**
 * @returns {void}
 */
function updateSavedTextsCount() {
  const savedTextsCount = getSavedTextsCount();
  savedTextsCount.textContent = document.querySelectorAll(".saved-text").length;
}

/**
 * Retrieve saved texts from local storage
 * @returns {{ text: string, date: number }[]} An array of saved texts from local storage.
 */
function getStoredSavedTexts() {
  const savedTexts = localStorage.getItem("word-counter__texts");
  return savedTexts ? JSON.parse(savedTexts) : [];
}

/**
 * Load saved texts from local storage
 * @returns {void}
 */
function displaySavedTexts() {
  const savedTextsContainer = document.getElementById("savedTexts");
  if (!savedTextsContainer) return;

  savedTextsContainer.innerHTML = ""; // Clear previous content

  getStoredSavedTexts()
    .reverse()
    .forEach((item) => {
      savedTextsContainer.appendChild(generateSavedTextElement(item));
    });

  updateSavedTextsCount();
}

function onSaveClick() {
  const text = getTextArea().value;
  if (!text) {
    alert("Please enter some text before saving.");
    return;
  }

  saveText(text);
}

/**
 * @param {string} text
 * @returns {void}
 */
function saveText(text) {
  const wordCounterTexts = getStoredSavedTexts();
  wordCounterTexts.push({ date: new Date().getTime(), text });

  localStorage.setItem("word-counter__texts", JSON.stringify(wordCounterTexts));
  alert("Text saved to local storage!");

  displaySavedTexts();
}

/**
 * @param {{ text: string, date: number }} item
 * @returns {HTMLDivElement} A div element containing the saved text and its date.
 */
function generateSavedTextElement(item) {
  const textDiv = document.createElement("div");
  textDiv.classList.add("saved-text");

  textDiv.innerHTML = `<strong>${new Date(
    item.date
  ).toLocaleString()} (${countWords(
    item.text
  )}):</strong> <br /> <br /> ${item.text.replace(/\n/g, "<br />")}`;

  textDiv.addEventListener("click", () => {
    getTextArea().value = item.text;
    getWordCountSpan().textContent = countWords(item.text);
  });

  return textDiv;
}

/**
 * @param {string} text
 * @returns {number} The number of words in the text.
 */
function countWords(text) {
  const parsedText = text.trim();
  const words = parsedText ? parsedText.split(/\s+/) : [];
  return words.length;
}
