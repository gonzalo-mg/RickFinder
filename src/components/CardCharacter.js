import styles from './CardCharacter.css' with {type: 'css'};

class CardCharacter extends HTMLElement {
  name = `unknown`;
  origin = `unknown`;
  species = `unknown`;
  location = `unknown`;
  status = `unknown`;
  image = `../public/noPhotoAvailable.jpg`;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set(character) {
    this.name = character.name;
    this.origin = character.origin.name;
    this.species = character.species;
    this.location = character.location.name;
    this.status = character.status;
    this.image = character.image;
  }

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets.push(styles);
    this.shadowRoot.innerHTML = /* html */ `

        <div class="card">
            <img alt="profile picture" src=${this.image} width="250" height="250">    
            <ul>
                <li><div class='fieldTitle'>Name:</div> ${this.name}</li>
                <li><div class='fieldTitle'>Origin:</div> ${this.origin}</li>
                <li><div class='fieldTitle'>Species:</div> ${this.species}</li>
                <li><div class='fieldTitle'>Last known location:</div> ${this.location}</li>
                <li><div class='fieldTitle'>Status:</div> <div class=${this.status}>${this.status}</div></li>
            </ul>
        </div>
    `;
  }
}

customElements.define("card-character", CardCharacter);
