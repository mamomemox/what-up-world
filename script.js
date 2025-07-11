
const backendURL = "https://what-up-world-1.onrender.com/api/generate";

function handleExplore() {
  const select = document.getElementById("country-select");
  const selectedCountry = select.value;
  if (!selectedCountry) {
    alert("Please select a country.");
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
  const container = document.getElementById("insights-container");

  if (country && container) {
    container.innerHTML = '<p class="text-[#181111] text-base">Loading insights...</p>';
    try {
      const response = await fetch(`${backendURL}?country=${country}`);
      const data = await response.json();
      container.innerHTML = `<div class="text-[#181111] text-base leading-relaxed">${data.content}</div>`;
    } catch (error) {
      container.innerHTML = '<p class="text-red-500 text-base">Failed to load insights.</p>';
    }
  }
};
