function atualizarDataHora() {
  const agora = new Date();

  const opcoes = {
    dateStyle: "full",
    timeStyle: "short"
  };

  const dataHoraFormatada = agora.toLocaleString("pt-BR", opcoes);
  const elemento = document.getElementById("dataHoraAtual");

  if (elemento) {
    elemento.textContent = dataHoraFormatada;
  }
}

function definirDataMinima() {
  const campoData = document.getElementById("dataAgendamento");
  if (!campoData) return;

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  campoData.min = `${ano}-${mes}-${dia}`;
}

function obterSexoSelecionado() {
  const sexoSelecionado = document.querySelector('input[name="sexo"]:checked');
  return sexoSelecionado ? sexoSelecionado.value : "";
}

function validarFormulario() {
  const nomeCliente = document.getElementById("nomeCliente").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const sexo = obterSexoSelecionado();
  const nomePet = document.getElementById("nomePet").value.trim();
  const raca = document.getElementById("raca").value.trim();
  const idade = document.getElementById("idade").value.trim();
  const servico = document.getElementById("servico").value;
  const atendimento = document.getElementById("atendimento").value;
  const dataAgendamento = document.getElementById("dataAgendamento").value;
  const horaAgendamento = document.getElementById("horaAgendamento").value;
  const aceite = document.getElementById("aceite").checked;

  if (
    !nomeCliente || !cpf || !endereco || !telefone || !email || !sexo ||
    !nomePet || !raca || !idade || !servico || !atendimento ||
    !dataAgendamento || !horaAgendamento || !aceite
  ) {
    return {
      valido: false,
      mensagem: "Preencha todos os campos obrigatórios e confirme as informações."
    };
  }

  if (!email.includes("@") || !email.includes(".")) {
    return {
      valido: false,
      mensagem: "Informe um e-mail válido."
    };
  }

  return { valido: true };
}

function exibirMensagem(texto, tipo = "success") {
  const mensagem = document.getElementById("mensagemResultado");
  mensagem.className = `alert alert-${tipo} mt-4`;
  mensagem.classList.remove("d-none");
  mensagem.innerHTML = texto;
}

function configurarFormulario() {
  const formulario = document.getElementById("formAgendamento");

  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const validacao = validarFormulario();

    if (!validacao.valido) {
      exibirMensagem(validacao.mensagem, "danger");
      return;
    }

    const nomeCliente = document.getElementById("nomeCliente").value.trim();
    const nomePet = document.getElementById("nomePet").value.trim();
    const servico = document.getElementById("servico").value;
    const atendimento = document.getElementById("atendimento").value;
    const dataAgendamento = document.getElementById("dataAgendamento").value;
    const horaAgendamento = document.getElementById("horaAgendamento").value;
    const petEspecial = document.getElementById("petEspecial").checked ? "Sim" : "Não";

    const resumo = `
      <strong>Agendamento realizado com sucesso!</strong><br>
      Cliente: ${nomeCliente}<br>
      Pet: ${nomePet}<br>
      Serviço: ${servico}<br>
      Método de atendimento: ${atendimento}<br>
      Data: ${dataAgendamento}<br>
      Horário: ${horaAgendamento}<br>
      Atenção especial: ${petEspecial}
    `;

    exibirMensagem(resumo, "success");
    formulario.reset();
    definirDataMinima();
  });

  formulario.addEventListener("reset", function () {
    const mensagem = document.getElementById("mensagemResultado");
    mensagem.classList.add("d-none");
  });
}

atualizarDataHora();
setInterval(atualizarDataHora, 1000);
definirDataMinima();
configurarFormulario();