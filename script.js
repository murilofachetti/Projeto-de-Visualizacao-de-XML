let xmlData; // Variável global para armazenar os dados do XML após a leitura
let leituraData = {}; // Variável global para armazenar os valores de leitura

$(document).ready(function () {
  let highlightedRow = null; // Variável para armazenar a referência da linha destacada
  let codigoBarrasInput = $("#codigoBarrasInput"); // Seleciona o input de código de barras

  // Event listener para o clique em qualquer lugar da página
  $(document).on("click", function (e) {
    // Verifica se o elemento clicado não é o input de código de barras
    if (!$(e.target).is(codigoBarrasInput)) {
      // Foca no input de código de barras
      codigoBarrasInput.focus();
    }
  });

  // Função para exibir a tabela e marcar a linha correspondente ao código de barras lido
  function showTableAndHighlightRow(codigoLido) {
    if (!xmlData) return; // Se os dados do XML ainda não foram lidos, sair da função
    $("#xmlTable").empty(); // Limpa a tabela para inserir novos dados

    let tableContent =
      "<tr><th>ID</th><th>Peça</th><th>Módulo</th><th>Largura</th><th>Altura</th><th>Cor</th><th>Código</th><th>Leitura</th></tr>";

    // Loop para percorrer os dados do XML
    xmlData.find("Part").each(function () {
      let id = $(this).attr("id");
      let peca = $(this).attr("CabDesc");
      let modulo = $(this).attr("CabCode");
      let larg = $(this).attr("L");
      let alt = $(this).attr("W");
      let cor = $(this).attr("Material");
      let codigo = $(this).attr("MatEdgeUp");

      // Verifica se o código lido corresponde ao código da peça atual no loop
      let isCodigoLido = codigoLido === codigo;

      // Se o código foi lido, adiciona a classe "highlight" para destacar a linha
      let rowClass = isCodigoLido ? "highlight" : "";

      // Constrói a linha da tabela com os dados da peça e a classe de destaque, se aplicável
      tableContent += `<tr class="${rowClass}">
          <td>${id}</td>
          <td>${peca}</td>
          <td>${modulo}</td>
          <td>${larg}</td>
          <td>${alt}</td>
          <td>${cor}</td>
          <td>${codigo}</td>
        </tr>`;
    });

    // Insere o conteúdo da tabela na página
    $("#xmlTable").html(tableContent);

    // Exibe a tabela
    $("#tableContainer").show();

    // Seleciona o input de código de barras após carregar o XML
    $("#codigoBarrasInput").focus();

    // Adiciona a classe "leitura-col" à coluna "Leitura" na primeira linha da tabela
    $("#xmlTable tr:first-child td:last-child").addClass("leitura-col");
  }

  // Captura o evento de seleção de arquivo
  $("#fileInput").on("change", function (e) {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
      let xmlContent = e.target.result;
      let xmlDoc = $.parseXML(xmlContent);
      xmlData = $(xmlDoc);

      // Extrair o nome do cliente do XML
      const clientName = xmlData.find("Part").eq(0).attr("ClientNest");

      // Exibir o nome do cliente na área designada
      $("#clientName").text("CLIENTE: " + clientName);

      // Extrair o nome do ambiente do XML
      const ambiente = xmlData.find("Part").eq(0).attr("StackingLayout");

      // Exibir o nome do ambiente na área designada
      $("#ambiente").text("AMBIENTE: " + ambiente);

      showTableAndHighlightRow(""); // Exibe a tabela vazia ao carregar o XML
    };

    reader.readAsText(file);
  });

  // Função para marcar a linha na tabela com base no código de barras lido
  function markTableRow(codigo) {
    console.log("Código de barras recebido:", codigo);

    // Encontra todas as células da tabela que contêm o código de barras correspondente
    let matchingCells = $("#xmlTable td").filter(function () {
      return $(this).text().trim() === codigo;
    });

    // Se houver células correspondentes, destaca toda a linha
    if (matchingCells.length > 0) {
      matchingCells.parent().addClass("highlight");
      // Armazena a referência da nova linha destacada
      highlightedRow = matchingCells.parent();
      // Limpa o conteúdo da mensagem de erro
      $("#errorMessage").text("");
      console.log("Linha destacada:", highlightedRow);

      // Verifica se a coluna de data e hora já existe na linha
      let dataHoraCell = highlightedRow.find(".data-hora");

      if (dataHoraCell.length > 0) {
        // Se a coluna já existir, verifica se o código de barras foi lido anteriormente
        let codigoLidoAnteriormente = dataHoraCell.data("codigo") === codigo;

        if (codigoLidoAnteriormente) {
          // Se o código de barras foi lido anteriormente, exibe a mensagem de erro
          $("#errorMessage").text(
            `Código de barras ${codigo} já foi lido anteriormente.`
          );
        } else {
          // Se o código de barras não foi lido anteriormente, atualiza apenas o valor da data e hora
          let now = new Date();
          let dataHora = now.toLocaleString();
          dataHoraCell.text(dataHora);
          dataHoraCell.data("codigo", codigo); // Armazena o código de barras na célula de data e hora

          // Armazena o valor da leitura para o código de barras atual
          leituraData[codigo] = dataHora;
        }
      } else {
        // Se a coluna não existir, adiciona a data e hora à nova coluna na linha destacada
        let now = new Date();
        let dataHora = now.toLocaleString();
        highlightedRow.append(
          `<td class="data-hora" data-codigo="${codigo}">${dataHora}</td>`
        );
        // Armazena o valor da leitura para o código de barras atual
        leituraData[codigo] = dataHora;
      }
    } else {
      // Caso não haja correspondência, exibe uma mensagem de erro
      $("#errorMessage").text("Código de barras não encontrado.");
      console.log("Código de barras não encontrado na tabela.");
    }

    // Zerar o campo de input após a leitura
    $("#codigoBarrasInput").val("");
  }

  // Função para ler o código de barras
  function lerCodigoDeBarras() {
    let codigo = $("#codigoBarrasInput").val(); // Obtém o valor do código de barras lido do input

    console.log("Código de barras lido:", codigo);

    // Verificar se o código de barras possui o tamanho esperado (por exemplo, 8 caracteres)
    if (codigo.length === 8) {
      // Marcar a linha correspondente na tabela
      markTableRow(codigo);

      // Exibir o código de barras lido no console para verificar se está funcionando
      console.log("Código de barras lido:", codigo);

      // Zerar o campo de input após a leitura
      $("#codigoBarrasInput").val("");
    }
  }

  // Evento para chamar a função lerCodigoDeBarras quando o valor do input mudar (quando o código de barras for lido)
  $("#codigoBarrasInput").on("input", function () {
    lerCodigoDeBarras();
  });

  // Função para baixar o PDF
  function getTableData() {
    // Obtém os dados da tabela a partir do XML
    let tableData = [];

    // Loop para percorrer os dados do XML
    xmlData.find("Part").each(function () {
      let id = $(this).attr("id");
      let peca = $(this).attr("CabDesc");
      let modulo = $(this).attr("CabCode");
      let larg = $(this).attr("L");
      let alt = $(this).attr("W");
      let cor = $(this).attr("Material");
      let codigo = $(this).attr("MatEdgeUp");

      // Constrói o array com os dados da peça
      tableData.push([id, peca, modulo, larg, alt, cor, codigo]);
    });

    return tableData;
  }

  // Função para baixar o PDF
  function downloadTableAsPDF() {
    if (!xmlData) return; // Se os dados do XML ainda não foram lidos, sair da função

    // Aguardar um pequeno intervalo (500ms) para garantir que todas as leituras tenham sido feitas
    setTimeout(function () {
      // Obter o nome do cliente e ambiente do XML
      const clientName = xmlData.find("Part").eq(0).attr("ClientNest");
      const ambiente = xmlData.find("Part").eq(0).attr("StackingLayout");

      // Obter os dados da tabela
      let tableData = getTableData();

      // Adicionar a coluna de leitura dinamicamente
      for (let i = 0; i < tableData.length; i++) {
        let codigo = tableData[i][6]; // Coluna com os códigos de barras

        // Verificar se existe um valor de leitura para o código de barras atual
        let leitura = leituraData[codigo] || "Não lido"; // Exemplo: "Não lido" caso ainda não tenha sido lido

        // Adicionar o valor de leitura na última posição do array de dados da linha
        tableData[i].push(leitura);
      }

      // Definir cabeçalho da tabela, incluindo a coluna de leitura
      let headers = [
        "ID",
        "Peça",
        "Módulo",
        "Largura",
        "Altura",
        "Cor",
        "Código",
        "Leitura",
      ];

      // Criar o conteúdo do PDF
      let pdfContent = {
        content: [
          { text: `CLIENTE: ${clientName}`, fontSize: 12 },
          {
            text: `AMBIENTE: ${ambiente}`,
            fontSize: 12,
            margin: [0, 5, 0, 15],
          },
          {
            table: {
              headerRows: 1,
              widths: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
              ],
              body: [headers, ...tableData],
            },
          },
        ],
      };

      // Gerar o PDF
      pdfMake.createPdf(pdfContent).download("tabela.pdf");
    }, 500); // Esperar 500ms antes de gerar o PDF
  }

  // Evento para chamar a função downloadTableAsPDF quando o botão for clicado
  $("#btnBaixarPDF").on("click", function () {
    downloadTableAsPDF();
  });
});
