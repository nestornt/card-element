const template = document.createElement('template');

template.innerHTML = `

<style>
  .user-card {
    font-family: 'Arial', sans-serif;
    background: #f4f4f4;
    width: 500px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    margin-bottom: 15px;
    border-bottom: darkorchid 5px solid;
  }

  .user-card img {
    width: 100%;
  }

  .user-card button {
    cursor: pointer;
    background: darkorchid;
    color: #fff;
    border: 0;
    border-radius: 5px;
    padding: 5px 10px;
  }
</style>

  <div class="user-card">
    <img />
    <div>
      <h3></h3>
      <div class="info">
        <p> <slot name="email" /> </p>
        <p> <slot name="phone" /> </p>
      </div>
      <button id="toogle-info">Hide Info</button>
    </div>
  </div>
`

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Busca el h3 en la shadowRoot y cambia su texto al valor del
    // atributo "name" del primer elemento que lo contenga en el dom
    this.shadowRoot.querySelector('h3').innerText = 
    this.getAttribute('name');

    this.shadowRoot.querySelector('img').src = 
    this.getAttribute('avatar');


    //this.innerHTML =` <h3>${this.getAttribute('name')}</h3> `;
                      
  }

  toogleInfo() {

    this.showInfo = !this.showInfo

    const info = this.shadowRoot.querySelector('.info');
    const toogleBtn = this.shadowRoot.querySelector('#toogle-info');

    if (this.showInfo) {

      info.style.display = 'block';
      toogleBtn.innerText = 'Hide Info';

    } else {

      info.style.display = 'none';
      toogleBtn.innerText = 'Show Info';

    }
  }

  connectedCallback() {

    this.shadowRoot.querySelector('#toogle-info').
    addEventListener('click', () => this.toogleInfo());

    console.log("3 componentes montados")
  }

  disconnectedCallback() {

    this.shadowRoot.querySelector('#toogle-info').
    removeEventListener();
  }
}

window.customElements.define('user-card', UserCard);