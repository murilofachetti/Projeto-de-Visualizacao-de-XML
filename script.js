Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#camera')    // Or '#yourElement' (optional)
    },
    decoder : {
      readers : ["code_128_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });

  Quagga.onDetected(function(data) {
    console.log(data);

    document.querySelector('#dados').innerHTML = data.codeResult.code;

  });


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
    var xmlDoc = xml.responseXML; 
    x = xmlDoc.getElementsByTagName("Part");
    document.getElementById("showCD").innerHTML =
    "ID: " +
    x[i].getAttribute("id") +
    "<br>Cliente: " + 
    x[i].getAttribute("ClientNest") +
    "<br>Ambiente: " + 
    x[i].getAttribute("StackingLayout") +
    "<br>Largura: " +
    x[i].getAttribute("L") +
    "<br>Cor: " + 
    x[i].getAttribute("Material") +
    "<br>Código: " + 
    x[i].getAttribute("MatEdgeUp") +
    "<br>Posição: " + 
    x[i].getAttribute("CabDesc");
}