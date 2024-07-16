// Scroll smoothly between headers
document.querySelectorAll(".storyHeader a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Read paragraph from json file and load to html file
async function getDescription(firstKey, secondKey) {
  try {
    const response = await fetch("./data/json/storyContents.json");
    const data = await response.json();

    if (data[firstKey] && data[firstKey][secondKey]) {
      return data[firstKey][secondKey];
    } else {
      throw new Error("Invalid keys provided.");
    }
  } catch (error) {
    console.error("Error fetching or processing JSON:", error);
    return "Error: Unable to retrieve the description.";
  }
}

async function displayDescription(firstKey, secondKey, elementId) {
  const description = await getDescription(firstKey, secondKey);
  document.getElementById(elementId).innerText = description;
}

document.addEventListener("DOMContentLoaded", () => {
  // Select all <p> elements with IDs that start with "description" or "shortinfo"
  const paragraphs = document.querySelectorAll('p[id^="description"]');

  paragraphs.forEach((paragraph) => {
    const firstKey = paragraph.getAttribute("data-first-key");
    const secondKey = paragraph.getAttribute("data-second-key");
    displayDescription(firstKey, secondKey, paragraph.id);
  });
});
