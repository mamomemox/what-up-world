
const backendURL = "https://what-up-world-1.onrender.com/api/generate";

function handleExplore() {
  const select = document.getElementById("country-select");
  const selectedCountry = select.value;
  if (!selectedCountry) {
    return;
  }
  window.location.href = `page2.html?country=${encodeURIComponent(selectedCountry)}`;
}

function goHome() {
  window.location.href = 'index.html';
}

window.onload = async () => {
  const params = new URLSearchParams(window.location.search);
  const country = params.get("country");

  const titleEl = document.getElementById("insight-title");
  const leadEl = document.getElementById("insight-lead");
  const newsEl = document.getElementById("insight-news");
  const regEl = document.getElementById("insight-regulation");
  const oppEl = document.getElementById("insight-opportunity");

  if (country && titleEl) {
    titleEl.textContent = "Loading insights...";

    try {
      const response = await fetch(`${backendURL}?country=${country}`);
      const data = await response.json();

      titleEl.textContent = data.title || `Market Insights: ${country}`;
      leadEl.textContent = data.lead || '';
      newsEl.textContent = data.news || '';
      regEl.textContent = data.regulation || '';
      oppEl.textContent = data.opportunity || '';
    } catch (error) {
      titleEl.textContent = "Failed to load insights";
      leadEl.textContent = "Please try again later.";
    }
  }
};
