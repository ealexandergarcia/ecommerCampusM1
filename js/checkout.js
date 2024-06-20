import { cardProductCheckout, billProductCheckout } from "./components/section.js";

let sessionStorageValues = Object.values(sessionStorage);
console.log(sessionStorageValues);

let checkout__details = document.querySelector(".checkout__details");
let bill__section = document.querySelector(".section__bill"); // Asume que tienes un contenedor para la sección de la factura

addEventListener("DOMContentLoaded", async (e) => {
    checkout__details.innerHTML = await cardProductCheckout(sessionStorageValues);

    // Seleccionar todos los elementos de incremento, decremento y valores de contador
    let incrementButtons = document.querySelectorAll(".increment");
    let decrementButtons = document.querySelectorAll(".decrement");
    let counterValues = document.querySelectorAll(".counter__value");
    let totalPriceElements = document.querySelectorAll(".total-price");
    let unitPriceElements = document.querySelectorAll(".unit-price");

    // Inicializar la factura
    updateBillSection();

    // Añadir event listeners a cada par de botones de incremento y decremento
    incrementButtons.forEach((incrementButton, index) => {
        let counterValue = counterValues[index];
        let totalPriceElement = totalPriceElements[index];
        let unitPrice = parseFloat(unitPriceElements[index].getAttribute('data-price'));

        incrementButton.addEventListener("click", (e) => {
            let currentValue = parseInt(counterValue.textContent);
            e.preventDefault();
            counterValue.textContent = currentValue + 1;
            totalPriceElement.textContent = `${(unitPrice * (currentValue + 1)).toFixed(2)}`;
            updateBillSection();
          
            Object.keys(sessionStorage).forEach((key) => {
              const storedValue = sessionStorage.getItem(key);
              if (storedValue) {
                try {
                  const data = JSON.parse(storedValue);
                  if (data.status === 'OK' && data.request_id && data.data) {
                    data.data.quantity = currentValue+1;
                    sessionStorage.setItem(key, JSON.stringify(data));
                  }
                } catch (error) {
                  console.error(`Error parsing Session Storage value: ${error}`);
                }
              }
            });
          });
    });

    decrementButtons.forEach((decrementButton, index) => {
        let counterValue = counterValues[index];
        let totalPriceElement = totalPriceElements[index];
        let unitPrice = parseFloat(unitPriceElements[index].getAttribute('data-price'));

        decrementButton.addEventListener("click", (e) => {
            e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            let currentValue = parseInt(counterValue.textContent);
            if (currentValue > 1) {
                counterValue.textContent = currentValue - 1;
                totalPriceElement.textContent = `$${(unitPrice * (currentValue - 1)).toFixed(2)}`;
                updateBillSection();
                
                Object.keys(sessionStorage).forEach((key) => {
                  const storedValue = sessionStorage.getItem(key);
                  if (storedValue) {
                    try {
                      const data = JSON.parse(storedValue);
                      if (data.status === 'OK' && data.request_id && data.data) {
                        data.data.quantity = currentValue -1;
                        sessionStorage.setItem(key, JSON.stringify(data));
                      }
                    } catch (error) {
                      console.error(`Error parsing Session Storage value: ${error}`);
                    }
                  }
                });
            }
        });
    });
});


// Función para actualizar la sección de la factura
const updateBillSection = async () => {
    let totalItems = 0;
    let totalPrice = 0;

    let counterValues = document.querySelectorAll(".counter__value");
    let unitPriceElements = document.querySelectorAll(".unit-price");

    counterValues.forEach((counterValue, index) => {
        let count = parseInt(counterValue.textContent);
        let unitPrice = parseFloat(unitPriceElements[index].getAttribute('data-price'));

        totalItems += count;
        totalPrice += count * unitPrice;
    });

    bill__section.innerHTML = await billProductCheckout(totalItems, totalPrice);
};

