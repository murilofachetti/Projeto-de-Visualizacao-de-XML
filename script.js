// Configuração do Leitor de Código de Barras
// Quagga.init({
//     inputStream : {
//       name : "Live",
//       type : "LiveStream",
//       target: document.querySelector('#camera')    // Or '#yourElement' (optional)
//     },
//     decoder : {
//       readers : ["code_128_reader"]
//     }
//   }, function(err) {
//       if (err) {
//           console.log(err);
//           return
//       }
//       console.log("Initialization finished. Ready to start");
//       Quagga.start();
//   });

//   Quagga.onDetected(function(data) {
//     console.log(data);

//     document.querySelector('#dados').innerHTML = data.codeResult.code;

//   });
// Configuração do Leitor de Código de Barras

// Configuração dos dados do Código de Barras
// document.getElementById("showCD").innerHTML =
//     "ID: " +
//     x[i].getAttribute("id") +
//     "<br>Cliente: " + 
//     x[i].getAttribute("ClientNest") +
//     "<br>Ambiente: " + 
//     x[i].getAttribute("StackingLayout") +
//     "<br>Largura: " +
//     x[i].getAttribute("L") +
//     "<br>Cor: " + 
//     x[i].getAttribute("Material") +
//     "<br>Código: " + 
//     x[i].getAttribute("MatEdgeUp") +
//     "<br>Posição: " + 
//     x[i].getAttribute("CabDesc");

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