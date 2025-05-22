import styles from './SearchDevice.css' with {type: 'css'};

class SearchDevice extends HTMLElement {
  #characters = [];
  #locations = [];

  #screenDiv;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets.push(styles);
    this.shadowRoot.innerHTML = /* html */ `

        <div class='controls'>
          <div class='radioGroup'>
            <input type="radio" id="characters" name="searchedItems" value="characters">
            <label for="characters">characters</label>
          </div>
          <div class='radioGroup'>
            <input type="radio" id="locations" name="searchedItems" value="locations">
            <label for="locations">locations</label>
          </div>
          <input type='text' id='filteredName' name='filteredName'>
        </div>

        <div class='screen'>Loading ...</div>
    
      `;

    this.#screenDiv = this.shadowRoot.querySelector(".screen");

    this.#fetchData();
  }

  async #fetchData() {
    try {
      const response = await fetch("src/database/db_2025_05_20.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      this.#characters = data.characters;
      this.#locations = data.locations;
      
      this.#screenDiv.innerHTML = /* html */ `
        <p>Data loaded. Ready to begin your search.</p>
        `;

        this.#renderCharacters();

    } catch (error) {
      console.error("Failed to fetch data:", error);
      this.#screenDiv.innerHTML = /* html */ `
        <p>Error loading data. Please try again later.</p>
        `;
    }
  }

  #renderCharacters() {
    if (!this.#screenDiv) {
      return; // Ensure screenDiv is available
    }

    // Clear previous content
    this.#screenDiv.innerHTML = "";

    this.#characters.forEach((character) => {
      const cardCharacter = document.createElement("card-character");
      cardCharacter.set(character);
      this.#screenDiv.appendChild(cardCharacter);
    });
  }

  #renderLocations() {
    if (!this.#screenDiv) {
      return; // Ensure screenDiv is available
    }

    // Clear previous content
    this.#screenDiv.innerHTML = "";

    this.#locations.forEach((location) => {
      const cardLocation = document.createElement("card-location");
      cardLocation.set(location);
      this.#screenDiv.appendChild(cardLocation);
    });
  }
}

customElements.define("search-device", SearchDevice);
