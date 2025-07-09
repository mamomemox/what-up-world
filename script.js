// Page 1: Handle button click
document.addEventListener('DOMContentLoaded', () => {
  const exploreButton = document.getElementById('exploreButton');
  const countrySelect = document.getElementById('countrySelect');

  if (exploreButton && countrySelect) {
    exploreButton.addEventListener('click', () => {
      const selectedCountry = countrySelect.value;
      if (!selectedCountry) {
        alert('Please select a country.');
        return;
      }
      window.location.href = `page2.html?country=${encodeURIComponent(selectedCountry)}`;
    });
  }

  // Page 2: Fetch and display AI content
  const insightsContainer = document.getElementById('insights-container');
  const urlParams = new URLSearchParams(window.location.search);
  const country = urlParams.get('country');

  if (insightsContainer && country) {
    insightsContainer.innerHTML = `<p class="text-gray-500 text-center">Loading insights for ${country}...</p>`;

    fetch(`/api/generate?country=${country}`)
      .then(response => response.json())
      .then(data => {
        if (data.content) {
          insightsContainer.innerHTML = data.content;
        } else {
          insightsContainer.innerHTML = `<p class="text-red-500">Failed to load insights.</p>`;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        insightsContainer.innerHTML = `<p class="text-red-500">Failed to load insights.</p>`;
      });
  }
});
