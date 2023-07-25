  $(document).ready(function() {
    // Captura o evento de seleção de arquivo
    $('#fileInput').on('change', function(e) {
      let file = e.target.files[0];
      let reader = new FileReader();

      reader.onload = function(e) {
        let xmlContent = e.target.result;
        let xmlDoc = $.parseXML(xmlContent);
        let $xml = $(xmlDoc);

        // Extraia as informações desejadas do XML e crie a tabela
        let clientName = $xml.find('CutList').find('ClientNest').text();
        $('#clientName').text('Cliente: ' + clientName);
        let ambiente = $xml.find('CutList').find('StackingLayout').text();
        $('#ambiente').text('Ambiente:' + ambiente)

        let tableContent = '';
        $xml.find('Part').each(function() {
          let id = $(this).attr('id');
          let peca = $(this).attr('CabDesc');
          let larg = $(this).attr('L');
          let alt = $(this).attr('W');
          let cor = $(this).attr('Material');
          let codigo = $(this).attr('MatEdgeUp');
          tableContent += '<tr><td>' + id + '</td><td>' + peca + '</td><td>' + larg + '</td><td>' + alt + '</td><td>' + cor + '</td><td>' + codigo + '</td></tr>';
        });

        $('#xmlTable').html('<tr><th>ID</th><th>Peça</th><th>Largura</th><th>Altura</th><th>Cor</th><th>Código</th></tr>' + tableContent);

        // Exibe a tabela
        $('#tableContainer').addClass('show');
      };

      reader.readAsText(file);
    });
  });

// Download dos Arquivos em forma de Planilha.

// const downloadXLSX = () => {
//     const wb = XLSX.utils.book_new();

//     wb.Props = {
//         Title: 'Relatório',
//         Assunto: '...',
//     };

//     wb.SheetNames.push('Relatório 01');

//     const dados = [
//         ['Nome', 'Usuário'],
//         ['teste', 'teste']
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(dados);

//     wb.Sheets['Relatório 01'] = ws;

//     XLSX.writeFile(wb, 'Relatório do Projeto.xlsx', { bookType: 'xlsx', type: 'bynary'})};

// document.getElementById('download').addEventListener('click', () => {
//     downloadXLSX();
// });

// Download dos Arquivos em forma de Planilha.