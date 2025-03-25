//Aqui é o caminho onde a API está rodando e a porta
const url = "http://localhost:8080";

export async function sendRequest(path, method,  body = null, jwt = null) {
  try {
    const response = await fetch(url + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      // Se for 204 No Content, não tenta converter pra JSON
      if (response.status === 204) {
        console.log("Sucesso, mas sem resposta");
        return;
      }

      const json = await response.json();
      console.log("Resposta da API:", json);
      return json;
    } else {
      let errorMessage = "Erro na requisição";

      // Se houver corpo, tenta pegar a mensagem
      if (response.headers.get("content-length") !== "0") {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      }

      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
