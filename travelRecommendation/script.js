async function searchRecommendations() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (!input) {
    resultsContainer.innerHTML = "<p>Please enter a keyword (beach, temple, or country name).</p>";
    return;
  }

  try {
    const response = await fetch("travel_recommendation_api.json");
    const data = await response.json();
    let matches = [];

    // Keyword matching
    if (input.includes("beach")) {
      matches = data.beaches;
    } 
    else if (input.includes("temple")) {
      matches = data.temples;
    } 
    else {
      // Country search — match against country names
      const country = data.countries.find(c => c.name.toLowerCase().includes(input));
      if (country) {
        country.cities.forEach(city => matches.push(city));
      }
    }

    // Display results
    if (matches.length > 0) {
      matches.forEach(place => {
        const card = `
          <div class="result-card">
            <img src="${place.imageUrl}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
          </div>
        `;
        resultsContainer.innerHTML += card;
      });
    } else {
      resultsContainer.innerHTML = "<p>No matching results found. Try beach, temple, or a country name (e.g., Japan, Brazil, Australia).</p>";
    }

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
}
