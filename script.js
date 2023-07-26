$(document).ready(function () {
  let xmlData; // Variável para armazenar os dados do XML após a leitura

  // Função para marcar a linha na tabela com base no código de barras lido
  function markTableRow(codigo) {
    // Remove a classe "highlight" de todas as linhas da tabela
    $("#xmlTable tbody tr").removeClass("highlight");

    // Verifica se o código de barras lido corresponde a algum dos códigos no XML
    let matchingRow = $("tr[data-codigo='" + codigo + "']");

    if (matchingRow.length > 0) {
      // Se houver correspondência, adiciona a classe "highlight" à linha correspondente
      matchingRow.addClass("highlight");
    } else {
      // Caso não haja correspondência, exibe uma mensagem de erro
      $("#errorMessage").text("Código de barras não encontrado.");
    }
  }
  // Função para exibir a tabela e marcar a linha correspondente ao código de barras lido
  function showTableAndHighlightRow(codigoLido) {
    if (!xmlData) return; // Se os dados do XML ainda não foram lidos, sair da função
    $("#xmlTable").empty(); // Limpa a tabela para inserir novos dados

    let tableContent =
      "<tr><th>ID</th><th>Peça</th><th>Modulo</th><th>Largura</th><th>Altura</th><th>Cor</th><th>Código</th></tr>";

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

  $(document).on("keyup", function (e) {
    if (e.which === 13) {
      // Quando o Enter for pressionado (código de barras lido)
      let codigo = $("#codigoBarras").text();

      // Marcar a linha correspondente na tabela
      markTableRow(codigo);
    }
  });
});
