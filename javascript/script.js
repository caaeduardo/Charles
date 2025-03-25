import * as api from "./api.js";

//-----------------------------------------------------------------------------------------------------------
// ANIMAÇÃO DE TEXTO
//-----------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const typedTextSpan = document.querySelector(".texto-animado");
  const textArray = ["em cada Solicitação", "em cada Chamado", "É Charles²"];
  const typingDelay = 100;
  const erasingDelay = 150;
  const newTextDelay = 1000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  function init() {
    typedTextSpan.textContent = textArray[textArrayIndex];
    charIndex = textArray[textArrayIndex].length;
    setTimeout(erase, newTextDelay);
  }

  init();
});

//-----------------------------------------------------------------------------------------------------------
// ENVIAR REQUISIÇÃO DE CONTATO
//-----------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const cidade = document.getElementById("cidade").value;
    const mensagem = document.getElementById("mensagem").value;
    const tipoPlano = document.querySelector(
      'input[name="tipo_plano"]:checked'
    )?.value;

    const body = {
      name: nome,
      phone: telefone,
      email: email,
      city: cidade,
      personType: tipoPlano === "pf" ? "PF" : "PJ",
      message: mensagem,
    };

    try {
      await api.sendRequest("/contactRequest/send", body, "POST");

      alert("Mensagem enviada com sucesso!");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Erro: " + error.message);
    }
  });
});
