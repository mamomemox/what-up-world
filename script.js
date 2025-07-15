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

function shareReport() {
  if (navigator.share) {
    navigator.share({
      title: 'Market Insights Report',
      text: 'Check out this comprehensive market analysis',
      url: window.location.href
    });
  } else {
    // Fallback: Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert('Report link copied to clipboard!');
  }
}

function downloadPDF() {
  alert('PDF download feature coming soon!');
}

window.onload = async () => {
  const params = new URLSearchParams(window.location.search);
  const country = params.get("country");
  const container = document.getElementById("insights-container");

  if (country && container) {
    try {
      const response = await fetch(`${backendURL}?country=${country}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check if we got HTML content (from n8n) or plain text
      if (data.html) {
        // Full HTML from n8n
        container.innerHTML = data.html;
      } else if (data.content) {
        // Plain text content - wrap in styled container
        container.innerHTML = `
          <div class="max-w-4xl mx-auto p-6">
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h1 class="text-[#181111] text-2xl font-bold mb-6 text-center">
                📊 Market Insights: ${country}
              </h1>
              <div class="text-[#181111] text-base leading-relaxed">
                ${data.content}
              </div>
            </div>
          </div>
        `;
      } else {
        throw new Error('No content received');
      }
      
    } catch (error) {
      console.error('Error loading insights:', error);
      container.innerHTML = `
        <div class="max-w-4xl mx-auto p-6">
          <div class="bg-white rounded-lg shadow-lg p-8 text-center">
            <div class="text-red-500 text-lg font-bold mb-4">⚠️ Error Loading Report</div>
            <div class="text-[#8a6060] text-base mb-4">
              Failed to load market insights. Please try again.
            </div>
            <button onclick="window.location.reload()" class="bg-[#f20c0c] text-white px-6 py-3 rounded-lg font-bold">
              Retry
            </button>
          </div>
        </div>
      `;
    }
  }
};
