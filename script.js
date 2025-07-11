// script.js
async function generateReport() {
  const country = document.getElementById('countrySelect').value;
  if (!country) {
    alert('Please select a country.');
    return;
  }

  const reportSection = document.getElementById('reportSection');
  const overviewText = document.getElementById('overviewText');
  const marketText = document.getElementById('marketText');
  const newsText = document.getElementById('newsText');
  const exportText = document.getElementById('exportText');

  overviewText.innerText = "Generating report...";
  marketText.innerText = "";
  newsText.innerText = "";
  exportText.innerText = "";
  reportSection.classList.remove('hidden');

  try {
    const response = await fetch(`http://127.0.0.1:8000/generate?country=${encodeURIComponent(country)}`);
    const data = await response.json();

    if (data.text) {
      const sections = data.text.split(/\n(?=\d\.)/);
      overviewText.innerText = `AI-powered insights about ${country}.`;

      sections.forEach(section => {
        if (section.includes('Overview Market')) {
          marketText.innerText = section.replace(/^1\.\s*Overview Market[:\-]?\s*/i, '').trim();
        } else if (section.includes('Latest News')) {
          newsText.innerText = section.replace(/^2\.\s*Latest News[:\-]?\s*/i, '').trim();
        } else if (section.includes('Export Opportunities')) {
          exportText.innerText = section.replace(/^3\.\s*Export Opportunities[:\-]?\s*/i, '').trim();
        }
      });

    } else {
      overviewText.innerText = "No data received.";
    }
  } catch (error) {
    console.error(error);
    overviewText.innerText = "Failed to load report.";
  }
}

function shareReport() {
  alert('Share feature coming soon!');
}

function downloadPDF() {
  alert('Download as PDF coming soon!');
}
