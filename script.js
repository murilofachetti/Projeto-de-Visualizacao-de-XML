// Configuração do Leitor de Código de Barras

// document.addEventListener('keydown', function(event) {

//     let campoCodigoBarras = document.getElementById("campoCodigoBarras");
//     let resultadoCodigoBarras = document.getElementById("resultadoCodigoBarras");

//     if (event.target === campoCodigoBarras) {
//       let codigoDeBarrasLido = event.target.value;
//       // Faça algo com o código de barras lido
//       resultadoCodigoBarras.textContent = "Código de barras lido: " + codigoDeBarrasLido;
//     };
// });

let xmls = {
    'codigo1': '<xml>...</xml>', // Substitua 'codigo1' pelo código de barras e '<xml>...</xml>' pelo conteúdo XML correspondente
    'codigo2': '<xml>...</xml>',
    // Adicione mais mapeamentos conforme necessário
  };

document.addEventListener('keydown', function(event) {
    let campoCodigoBarras = document.getElementById("campoCodigoBarras");
    let resultadoCodigoBarras = document.getElementById("resultadoCodigoBarras");
  
    if (event.target === campoCodigoBarras) {
        let codigoDeBarrasLido = event.target.value;
  
        let xmlCorrespondente = codigoDeBarrasLido;
  
      if (xmlCorrespondente) {
        // Exibe o conteúdo do XML no elemento HTML
        resultadoCodigoBarras.innerHTML = xmlCorrespondente;
      } else {
        // Caso não exista um XML correspondente ao código de barras
        resultadoCodigoBarras.textContent = "XML não encontrado";
      }
  
      // Limpa o campo de código de barras para a próxima leitura
      event.target.value = "";
    }
  });

// Configuração do Leitor de Código de Barras

// Configuração dos dados do Código de Barras

displayCD(0);

function displayCD(i) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this, i);
        }
    };
    xmlhttp.open("GET", "./Arquivos/belakasa.xml", true);
    xmlhttp.send();
}

function myFunction(xml, i) {
    let xmlDoc = xml.responseXML; 
    const elements = xmlDoc.querySelectorAll("Part");
    let showCDContent = document.getElementById("showCD2")
    let showCDcont = ""

    elements.forEach((element) => {
        const attributes = element.attributes;

        // Iterar sobre os atributos
        for (let i = 0; i < attributes.length; i++) {
            let attribute = attributes[i];
            let attributeName = attribute.name;
            let attributeValue = attribute.value;

            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                element.removeAttribute("qMin", "");
                element.removeAttribute("MatNo", "");
                element.removeAttribute("W", "");
                element.removeAttribute("IDesc", "");
                element.removeAttribute("InfoDraw_1", "");
                element.removeAttribute("Draw_1", "");
                element.removeAttribute("JobNest", "");
                element.removeAttribute("DrillInfo", "");
                element.removeAttribute("EdgingInfo", "");
                element.removeAttribute("CabCode", "");
                element.removeAttribute("CabInfo", "");
                element.removeAttribute("InsLam", "");
                element.removeAttribute("MatEdgeLo", "");
                element.removeAttribute("MatEdgeL", "");
                element.removeAttribute("MatEdgeR", "");
            }
            showCDcont += (attributeName + ": " + attributeValue) + "<br>";
        }
    });

    showCDContent.innerHTML = showCDcont;
}
    
// Configuração dos dados do Código de Barras

// Download dos Arquivos em forma de Planilha.

const downloadXLSX = () => {
    const wb = XLSX.utils.book_new();

    wb.Props = {
        Title: 'Relatório',
        Assunto: '...',
    };

    wb.SheetNames.push('Relatório 01');

    const dados = [
        ['Nome', 'Usuário'],
        ['teste', 'teste']
    ];

    const ws = XLSX.utils.aoa_to_sheet(dados);

    wb.Sheets['Relatório 01'] = ws;

    XLSX.writeFile(wb, 'Relatório do Projeto.xlsx', { bookType: 'xlsx', type: 'bynary'})};

document.getElementById('download').addEventListener('click', () => {
    downloadXLSX();
});

// Download dos Arquivos em forma de Planilha.