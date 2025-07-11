
<!-- script.js (Shared JavaScript) -->
let selectedCountry = "";

function handleExplore() {
  const select = document.getElementById("country-select");
  selectedCountry = select.value;
  if (!selectedCountry) {
    alert("Please select a country.");
    return;
  }
  window.location.href = `page2.html?country=${encodeURIComponent(selectedCountry)}`;
}

window.onload = async () => {
  const params = new URLSearchParams(window.location.search);
  const country = params.get("country");
  if (country) {
    const container = document.getElementById("insights-container");
    try {
      const response = await fetch(`https://what-up-world-backend.onrender.com/api/generate?country=${country}`);
      const data = await response.json();
      container.innerHTML = data.content;
    } catch (error) {
      container.innerHTML = '<p class="text-red-500">Failed to load insights.</p>';
    }
  }
};
