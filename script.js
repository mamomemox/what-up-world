const backendUrl = "https://what-up-world-1.onrender.com";

async function fetchMarketUpdate() {
  const country = document.getElementById('country-select').value;
  try {
    const response = await fetch(`${backendUrl}/generate?country=${country}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    let resultHTML = `
      <h2>${data.title}</h2>
      <p><strong>${data.lead}</strong></p>
      <img src="${data.image}" alt="Market Image" class="result-image">
    `;

    data.insights.forEach(insight => {
      resultHTML += `<h3>${insight.subtitle}</h3><p>${insight.content}</p>`;
    });

    document.getElementById('result').innerHTML = resultHTML;

  } catch (error) {
    document.getElementById('result').innerHTML = '<p style="color:red;">Sorry, something went wrong. Please try again.</p>';
  }
}
