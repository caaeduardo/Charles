document.addEventListener('DOMContentLoaded', function() {
  const typedTextSpan = document.querySelector(".texto-animado");
const textArray = ["em cada Solicitação", "em cada Chamado","É Charles²"]
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
          typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
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

// Requisição do API

const https = require('https');

const options = {
  hostname: 'api.exemplo.com',
  path: '/data',
  method: 'GET'
};

const req = https.request(options, res => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log('Dados recebidos:', jsonData);
    } catch (error) {
      console.error('Erro ao parsear JSON:', error);
      console.log('Resposta não JSON:', data);
    }
  });
});

req.on('error', error => {
  console.error('Erro na requisição:', error);
});

req.end(); // Envia a requisição
