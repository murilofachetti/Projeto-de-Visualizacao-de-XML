// Configuração do Leitor de Código de Barras

function readBarcode() {
    const barcodeInput = document.getElementById("barcodeInput");
    const resultDiv = document.getElementById("result");
    const sheetContainer = document.getElementById("sheetContainer");
  
    // Simulando a leitura do código de barras após 1 segundo (1000ms)
    setTimeout(function() {
      const barcodeData = barcodeInput.value;
  
      // Editar os dados
      const editedData = editBarcodeData(barcodeData);
  
      // Criação da planilha
      const worksheet = XLSX.utils.aoa_to_sheet([[editedData]]); // Inserir os dados na planilha
  
      // Transformar a planilha em HTML
      const htmlTable = XLSX.utils.sheet_to_html(worksheet);
  
      // Exibir a planilha na página
      sheetContainer.innerHTML = htmlTable;
  
      // Exibir mensagem de sucesso
      resultDiv.textContent = "Dados do código de barras editados exibidos na planilha abaixo.";
  
      barcodeInput.value = ''; // Limpar o campo de entrada de texto
    }, 1000); // 1 segundo (1000ms)
  }
  
  function editBarcodeData(data) {
    // Implemente sua lógica de edição aqui
    // Por exemplo, substituir os primeiros 3 dígitos por "ABC"
    return "ABC" + data.substring(3);
  }
  
// Configuração do Leitor de Código de Barras

// Configuração dos dados do Código de Barras

// displayCD(0);

// function displayCD(i) {
//     let xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             myFunction(this, i);
//         }
//     };
//     xmlhttp.open("GET", "./Arquivos/belakasa.xml", true);
//     xmlhttp.send();
// }

// function myFunction(xml, i) {
//     let xmlDoc = xml.responseXML; 
//     const elements = xmlDoc.querySelectorAll("Part");
//     let showCDContent = document.getElementById("showCD2")
//     let showCDcont = ""

//     elements.forEach((element) => {
//         const attributes = element.attributes;

//         // Iterar sobre os atributos
//         for (let i = 0; i < attributes.length; i++) {
//             let attribute = attributes[i];
//             let attributeName = attribute.name;
//             let attributeValue = attribute.value;

//             for (let i = 0; i < elements.length; i++) {
//                 let element = elements[i];
//                 element.removeAttribute("qMin", "");
//                 element.removeAttribute("MatNo", "");
//                 element.removeAttribute("W", "");
//                 element.removeAttribute("IDesc", "");
//                 element.removeAttribute("InfoDraw_1", "");
//                 element.removeAttribute("Draw_1", "");
//                 element.removeAttribute("JobNest", "");
//                 element.removeAttribute("DrillInfo", "");
//                 element.removeAttribute("EdgingInfo", "");
//                 element.removeAttribute("CabCode", "");
//                 element.removeAttribute("CabInfo", "");
//                 element.removeAttribute("InsLam", "");
//                 element.removeAttribute("MatEdgeLo", "");
//                 element.removeAttribute("MatEdgeL", "");
//                 element.removeAttribute("MatEdgeR", "");
//             }
//             showCDcont += (attributeName + ": " + attributeValue) + "<br>";
//         }
//     });

//     showCDContent.innerHTML = showCDcont;
// }
    
// Configuração dos dados do Código de Barras

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