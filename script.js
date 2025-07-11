function handleExploreClick() {
  const country = document.getElementById('country-select').value;
  if (!country) {
    alert('Please select a country first.');
    return;
  }
  localStorage.setItem('selectedCountry', country);
  window.location.href = 'page2.html';
}

async function loadInsights() {
  const country = localStorage.getItem('selectedCountry') || 'USA';
  const container = document.getElementById('insights-container');
  container.innerHTML = '<p>Loading insights...</p>';

  try {
    const response = await fetch(`https://your-backend-url.onrender.com/api/generate?country=${encodeURIComponent(country)}`);
    const data = await response.json();
    if (data.content) {
      container.innerHTML = formatInsights(data.content);
    } else {
      container.innerHTML = '<p>Failed to load insights.</p>';
    }
  } catch (error) {
    console.error('Frontend Error:', error);
    container.innerHTML = '<p>Failed to load insights.</p>';
  }
}

function formatInsights(text) {
  const sections = text.split(/\n{2,}/);
  return sections.map(section => `<p style="margin-bottom: 12px;">${section}</p>`).join('');
}
