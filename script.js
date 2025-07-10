// script.js

function goToPage2() {
  const selectedCountry = document.getElementById('country-select').value;
  if (!selectedCountry || selectedCountry === 'Select a Country') {
    alert('Please select a country first!');
    return;
  }
  localStorage.setItem('selectedCountry', selectedCountry);
  window.location.href = 'page2.html';
}

async function loadInsights() {
  const country = localStorage.getItem('selectedCountry') || 'Germany';

  document.getElementById('insights-container').innerHTML = `
    <p class="text-[#181111] text-base leading-normal px-4 py-4">Loading insights for ${country}...</p>
  `;

  try {
    const response = await fetch(`https://what-up-world-1.onrender.com/api/generate?country=${country}`);
    const data = await response.json();

    if (!data || !data.content) {
      throw new Error('No content received');
    }

    const content = data.content;

    const formattedHtml = formatInsights(content);
    document.getElementById('insights-container').innerHTML = formattedHtml;

  } catch (error) {
    console.error('Error fetching insights:', error);
    document.getElementById('insights-container').innerHTML = `
      <p class="text-[#f20c0c] text-base leading-normal px-4 py-4">❌ Failed to load insights. Please try again later.</p>
    `;
  }
}

function formatInsights(rawText) {
  const lines = rawText.split(/\n+/).filter(Boolean);

  let title = '';
  let lead = '';
  let latestNews = '';
  let regulation = '';
  let opportunities = '';

  lines.forEach(line => {
    if (line.startsWith('(1)')) title = line.replace('(1)', '').trim();
    else if (line.startsWith('(2)')) lead = line.replace('(2)', '').trim();
    else if (line.startsWith('(3)')) latestNews = line.replace('(3)', '').trim();
    else if (line.startsWith('(4)')) regulation = line.replace('(4)', '').trim();
    else if (line.startsWith('(5)')) opportunities = line.replace('(5)', '').trim();
  });

  return `
    <h1 class="text-[#181111] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">${title}</h1>
    <p class="text-[#181111] text-base font-normal leading-normal pb-3 pt-1 px-4">${lead}</p>

    <div class="flex w-full grow bg-white @container p-4">
      <div class="w-full gap-1 overflow-hidden bg-white @[480px]:gap-2 aspect-[3/2] rounded-lg flex">
        <div
          class="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
          style='background-image: url("https://images.unsplash.com/photo-1581090700227-1e7e646ffedb");'
        ></div>
      </div>
    </div>

    <h3 class="text-[#181111] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Latest News</h3>
    <p class="text-[#181111] text-base font-normal leading-normal pb-3 pt-1 px-4">${latestNews}</p>

    <h3 class="text-[#181111] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Regulation Snapshot</h3>
    <p class="text-[#181111] text-base font-normal leading-normal pb-3 pt-1 px-4">${regulation}</p>

    <h3 class="text-[#181111] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Opportunity Highlight</h3>
    <p class="text-[#181111] text-base font-normal leading-normal pb-3 pt-1 px-4">${opportunities}</p>
  `;
}

if (window.location.pathname.includes('page2.html')) {
  window.onload = loadInsights;
}
