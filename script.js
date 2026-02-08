const container = document.getElementById("sabores-container");
const buttons = document.querySelectorAll(".filters button");
const cartCount = document.getElementById("cart-count");
const modal = document.getElementById("modal");
const checkout = document.getElementById("checkout");

const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");

let sabores = [];
let cart = 0;
let selectedSabor = null;

fetch("data.json")
  .then(res => res.json())
    .then(data => {
        sabores = data.sabores;
            renderSabores(sabores);
              });

              function renderSabores(lista) {
                container.innerHTML = "";

                  lista.forEach(sabor => {
                      const card = document.createElement("div");
                          card.classList.add("card");

                              card.innerHTML = `
                                    <h3>${sabor.nome}</h3>
                                          <p>${sabor.descricao}</p>
                                                <small>${sabor.tipo}</small>
                                                    `;

                                                        card.addEventListener("click", () => openModal(sabor));
                                                            container.appendChild(card);
                                                              });
                                                              }

                                                              function openModal(sabor) {
                                                                selectedSabor = sabor;
                                                                  modalTitle.textContent = sabor.nome;
                                                                    modalDesc.textContent = sabor.descricao;
                                                                      modal.classList.remove("hidden");
                                                                      }

                                                                      document.getElementById("close-modal").onclick = () => {
                                                                        modal.classList.add("hidden");
                                                                        };

                                                                        document.getElementById("add-cart-modal").onclick = () => {
                                                                          cart++;
                                                                            cartCount.textContent = cart;
                                                                              modal.classList.add("hidden");
                                                                              };

                                                                              document.getElementById("checkout-btn").onclick = () => {
                                                                                if (cart === 0) return;
                                                                                  checkout.classList.remove("hidden");
                                                                                    cart = 0;
                                                                                      cartCount.textContent = 0;
                                                                                      };

                                                                                      document.getElementById("close-checkout").onclick = () => {
                                                                                        checkout.classList.add("hidden");
                                                                                        };

                                                                                        buttons.forEach(btn => {
                                                                                          btn.onclick = () => {
                                                                                              const filtro = btn.dataset.filter;
                                                                                                  if (filtro === "todos") renderSabores(sabores);
                                                                                                      else renderSabores(sabores.filter(s => s.tipo === filtro));
                                                                                                        };
                                                                                                        });