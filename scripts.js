const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject(`Erro ao ler o arquivo: ${arquivo.name}`);
    };
    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];
  if (arquivo) {
    try {
      const conteudoArquivo = await lerConteudoArquivo(arquivo);
      imagemPrincipal.src = conteudoArquivo.url;
      nomeImagem.textContent = conteudoArquivo.nome;
    } catch (erro) {
      console.error(erro);
      alert("Erro ao carregar a imagem. Por favor, tente novamente.");
    }
  }
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

inputTags.addEventListener("keypress", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      const newTag = document.createElement("li");
      newTag.innerHTML = `<p>${tagTexto}</p> <img src="img/close-black.svg" class="remove-tag"`;
      listaTags.appendChild(newTag);
      inputTags.value = ""; // Limpa o campo de entrada
    }
  }
});
