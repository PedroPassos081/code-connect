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

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const tagRemover = evento.target.parentElement;
    listaTags.removeChild(tagRemover);
  }
});

const tagsDisponiveis = [
  "Front-end",
  "Programação",
  "Data Science",
  "Full-stack",
  "HTML",
  "CSS",
  "JavaScript",
];

async function verificarTags(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000); // Simula uma verificação assíncrona
  });
}

inputTags.addEventListener("keypress", async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      try {
        const tagExiste = await verificarTags(tagTexto);
        if (tagExiste) {
          const tagNova = document.createElement("li");
          tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
          listaTags.appendChild(tagNova);
          inputTags.value = "";
        } else {
          alert("Tag não foi encontrada.");
        }
      } catch (error) {
        console.error("Erro ao verificar a existência da tag");
        alert("Erro ao verificar a existência da tag. Verifique o console.");
      }
    }
  }
});

const btnPublicar = document.getElementById("btnPublicar");

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;

      if (deuCerto) {
        resolve("Projeto publicado com sucesso!");
      } else {
        reject("Erro ao publicar o projeto. Tente novamente.");
      }
    }, 2000); // Correto: setTimeout deve estar dentro do Promise
  });
}

btnPublicar.addEventListener("click", async (evento) => {
  evento.preventDefault();

  const nomeDoProjeto = document.getElementById("nome").value;
  const descricaoDoProjeto = document.getElementById("descricao").value;
  const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map(
    (tag) => tag.textContent
  );

  try {
    const resultado = await publicarProjeto(
      nomeDoProjeto,
      descricaoDoProjeto,
      tagsProjeto
    );
  } catch (error) {
    console.log(error);
    alert(
      "Erro ao publicar o projeto. Verifique o console para mais detalhes."
    );
  }
});

//função para descartar
const btnDescartar = document.getElementById("btnDescartar");

btnDescartar.addEventListener("click", (evento) => {
  evento.preventDefault();

  const formulario = document.querySelector("form");
  formulario.reset();

  imagemPrincipal.src = "./img/imagem1.png";
  nomeImagem.textContent = "image_projeto.png";

  listaTags.innerHTML = "";
});
