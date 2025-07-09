// script.js (Shared by both pages)
const exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    const country = document.getElementById('countrySelect').value;
    if (country) {
      localStorage.setItem('selectedCountry', country);
      window.location.href = 'page2.html';
    } else {
      alert('Please select a country.');
    }
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  const country = localStorage.getItem('selectedCountry');
  if (!country) return;

  const response = await fetch(`/api/generate?country=${encodeURIComponent(country)}`);
  const data = await response.json();

  document.getElementById('reportTitle').innerText = data.title || '';
  document.getElementById('reportLead').innerText = data.lead || '';
  document.getElementById('latestNews').innerText = data.latest_news || '';
  document.getElementById('regulation').innerText = data.regulation || '';
  document.getElementById('opportunity').innerText = data.opportunity || '';
  document.getElementById('reportImage').style.backgroundImage = `url('https://source.unsplash.com/featured/?${country}')`;
});
