$(document).ready(function () {
  let xmlData; // Variável para armazenar os dados do XML após a leitura
  let highlightedRow = null; // Variável para armazenar a referência da linha destacada

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
        }
      } else {
        // Se a coluna não existir, adiciona a data e hora à nova coluna na linha destacada
        let now = new Date();
        let dataHora = now.toLocaleString();
        highlightedRow.append(
          `<td class="data-hora" data-codigo="${codigo}">${dataHora}</td>`
        );
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
});
