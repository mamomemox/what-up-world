document.addEventListener("DOMContentLoaded", () => {
  const exploreButton = document.querySelector("button span.truncate");
  const countrySelect = document.querySelector("select");

  if (exploreButton) {
    exploreButton.closest("button").addEventListener("click", async () => {
      const selectedOption = countrySelect.value;

      if (!selectedOption || selectedOption === "one") {
        alert("Please select a country.");
        return;
      }

      // Show loading state (optional)
      exploreButton.innerText = "Loading...";

      try {
        const response = await fetch(`/api/generate?country=${encodeURIComponent(selectedOption)}`);
        const data = await response.json();

        if (data.result) {
          localStorage.setItem("marketData", data.result);
          window.location.href = "page2.html";
        } else {
          alert("Error: " + (data.error || "No data received."));
        }
      } catch (error) {
        alert("Request failed. Please try again.");
      } finally {
        exploreButton.innerText = "Click to Explore";
      }
    });
  }

  // On Page2: Display results
  if (window.location.pathname.includes("page2.html")) {
    const container = document.querySelector("#insights-container");
    const storedText = localStorage.getItem("marketData");

    if (container && storedText) {
      const [overview, news, opportunities] = storedText.split(/\n(?=[(12]\))/g);

      container.innerHTML = `
        <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Overview Market</h2>
        <p class="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">${overview?.replace(/^\(1\)\s*/, '')}</p>
        
        <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Latest News</h2>
        <p class="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">${news?.replace(/^\(2\)\s*/, '')}</p>
        
        <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Export Opportunities</h2>
        <p class="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">${opportunities?.replace(/^\(3\)\s*/, '')}</p>
      `;
    }
  }
});
