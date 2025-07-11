document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const country = params.get('country');
  const container = document.getElementById('insights-container');

  if (country) {
    fetch(`https://YOUR_RENDER_BACKEND_URL/api/generate?country=${country}`)
      .then(response => response.json())
      .then(data => {
        container.innerHTML = `
          <h1 class="text-[#181111] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">${data.title}</h1>
          <p class="text-[#181111] text-base font-normal leading-normal pb-3">${data.lead}</p>
          <h3 class="text-[#181111] text-lg font-bold pb-2 pt-4">Latest News</h3>
          <p class="text-[#181111] text-base">${data.news}</p>
          <h3 class="text-[#181111] text-lg font-bold pb-2 pt-4">Regulation Snapshot</h3>
          <p class="text-[#181111] text-base">${data.regulation}</p>
          <h3 class="text-[#181111] text-lg font-bold pb-2 pt-4">Opportunity Highlight</h3>
          <p class="text-[#181111] text-base">${data.opportunity}</p>
        `;
      })
      .catch(() => {
        container.innerHTML = "<p>Failed to load insights.</p>";
      });
  } else {
    container.innerHTML = "<p>No market selected.</p>";
  }
});
