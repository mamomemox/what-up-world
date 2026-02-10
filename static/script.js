
const backendURL = "https://what-up-world-1.onrender.com/api/generate";

const cityImages = {
  "Germany": "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80",
  "USA": "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&q=80",
  "China": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80"
};

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
  const cityImgEl = document.getElementById("city-image");

  if (country && titleEl) {
    titleEl.textContent = "Loading insights...";

    // Set city image
    if (cityImgEl && cityImages[country]) {
      cityImgEl.style.backgroundImage = `url("${cityImages[country]}")`;
    }

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
