/* script.js (update this) */

const params = new URLSearchParams(window.location.search);
const country = params.get("country");

if (country) {
  fetch(`https://your-backend-url.onrender.com/api/generate?country=${country}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("ai-title").innerText = data.title;
      document.getElementById("ai-lead").innerText = data.lead_text;
      document.getElementById("ai-news").innerText = data.latest_news;
      document.getElementById("ai-regulation").innerText = data.regulation_snapshot;
      document.getElementById("ai-opportunity").innerText = data.export_opportunities;
      document.getElementById("ai-image").style.backgroundImage = `url('${data.image_url}')`;
    })
    .catch((err) => {
      document.getElementById("ai-title").innerText = "Failed to load insights.";
    });
}
