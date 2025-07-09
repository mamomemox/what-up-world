// Save this as script.js in your frontend folder

// Store selected country in localStorage when button is clicked
function handleExploreClick() {
    const selectElement = document.getElementById('country-select');
    const selectedCountry = selectElement.value;

    if (!selectedCountry || selectedCountry === "none") {
        alert("Please select a country.");
        return;
    }

    localStorage.setItem('selectedCountry', selectedCountry);
    window.location.href = 'page2.html';
}

// On Page 2: Fetch AI-generated content
async function loadAIInsights() {
    const country = localStorage.getItem('selectedCountry');
    if (!country) return;

    // Set loading text
    document.getElementById('title').innerText = `Loading ${country} insights...`;

    try {
        const response = await fetch('https://YOUR_BACKEND_URL/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: country })
        });

        const data = await response.json();

        if (data.error) {
            document.getElementById('title').innerText = "Error loading insights.";
            console.error(data.error);
            return;
        }

        // Inject AI content into Page 2
        document.getElementById('title').innerText = data.title;
        document.getElementById('lead').innerText = data.lead;
        document.getElementById('latest-news').innerText = data.latest_news;
        document.getElementById('regulation').innerText = data.regulation;
        document.getElementById('opportunity').innerText = data.opportunity;

    } catch (error) {
        console.error(error);
        document.getElementById('title').innerText = "Failed to load insights.";
    }
}

// Run the function on Page 2 load
if (window.location.pathname.includes('page2.html')) {
    window.onload = loadAIInsights;
}
