import styles from '../styles/cards.css' with {type: 'css'};

class CardLocation extends HTMLElement {
    id = `id`;
    name = `unknown`;
    type = `unknown`;
    dimension = `unknown`;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }

    set (location) {
        this.id = location.id;
        this.name = location.name;
        this.type = location.type;
        this.dimension = location.dimension;
    }

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets.push(styles);
        this.shadowRoot.innerHTML = /* html */ `
    
            <div class="card" id=${this.id}>   
                <ul>
                    <li><div class='fieldTitle'>Name:</div> ${this.name}</li>
                    <li><div class='fieldTitle'>Type:</div> ${this.type}</li>
                    <li><div class='fieldTitle'>Dimension:</div> ${this.dimension}</li>
                </ul>
            </div>
        `;
      }
}

customElements.define("card-location", CardLocation);