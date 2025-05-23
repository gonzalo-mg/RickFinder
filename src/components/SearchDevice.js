import styles from './SearchDevice.css' with {type: 'css'};

class SearchDevice extends HTMLElement {
  #characters = [];
  #locations = [];

  #screenDiv;
  #radioButtons;
  #filteredNameInput;

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

    this.#radioButtons = this.shadowRoot.querySelectorAll('input[name=searchedItems]');
    this.#radioButtons.forEach(radio => {
      radio.addEventListener('click', this.#handleRadioChange.bind(this));
    });

    this.#filteredNameInput = this.shadowRoot.querySelector('input[name=filteredName]');
    this.#filteredNameInput.addEventListener('input', this.#handleFilteredNameChange.bind(this));
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

    } catch (error) {
      console.error("Failed to fetch data:", error);
      this.#screenDiv.innerHTML = /* html */ `
        <p>Error loading data. Please try again later.</p>
        `;
    }
  }

  #renderCharacters(filteredName = '') {
    if (!this.#screenDiv) {
      return;
    }
  
    // clear previous
    this.#screenDiv.innerHTML = "";
  
    const charactersToRender = this.#characters.filter(character =>
      character.name.toLowerCase().includes(filteredName.toLowerCase())
    );
  
    if (charactersToRender.length === 0) {
      this.#screenDiv.innerHTML = "<p>No character matches your search.</p>";
      return;
    }
  
    charactersToRender.forEach((character) => {
      const cardCharacter = document.createElement("card-character");
      cardCharacter.set(character);
      this.#screenDiv.appendChild(cardCharacter);
    });
  }

  #renderLocations(filteredName = '') {
    if (!this.#screenDiv) {
      return;
    }
  
    // clear previous
    this.#screenDiv.innerHTML = "";
  
    const locationsToRender = this.#locations.filter(location =>
      location.name.toLowerCase().includes(filteredName.toLowerCase())
    );
  
    if (locationsToRender.length === 0) {
      this.#screenDiv.innerHTML = "<p>No location matches your search.</p>";
      return;
    }
  
    locationsToRender.forEach((location) => {
      const cardLocation = document.createElement("card-location");
      cardLocation.set(location);
      this.#screenDiv.appendChild(cardLocation);
    });
  }

  #handleRadioChange(event) {
    const currentFilterName = this.#filteredNameInput.value;
    switch (event.target.value){
      case 'characters':
        this.#renderCharacters(currentFilterName);
        break;
      case 'locations':
        this.#renderLocations(currentFilterName);
        break;
    }
  }
  
  #handleFilteredNameChange(event) {
    const currentFilterName = this.#filteredNameInput.value;
    const selectedRadioButton = this.shadowRoot.querySelector('input[name="searchedItems"]:checked');
    
    if (selectedRadioButton) {
      switch (selectedRadioButton.value) {
        case 'characters':
          this.#renderCharacters(currentFilterName);
          break;
        case 'locations':
          this.#renderLocations(currentFilterName);
          break;
      }
    } else {
      
    }
  }
}

customElements.define("search-device", SearchDevice);
