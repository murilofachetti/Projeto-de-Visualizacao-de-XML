# Projeto de Visualização de XML

Este projeto é uma aplicação web simples que permite visualizar dados contidos em um arquivo XML e realizar leituras de códigos de barras em tempo real.

## Conteúdo
- Pré-requisitos
- Instruções de Uso
- Estrutura do Projeto
- Tecnologias Utilizadas
  
## Pré-requisitos

Antes de usar este projeto, certifique-se de ter os seguintes pré-requisitos instalados:

	Navegador da Web moderno (como Google Chrome, Mozilla Firefox, ou Microsoft Edge)

## Instruções de Uso

1. Clonando o Repositório

	Clone este repositório em sua máquina local:
```
git clone https://github.com/seuusuario/seuprojeto.git
```

2. Abrindo o Site

	Abra o arquivo index.html no seu navegador da web.

3. Carregando um Arquivo XML

	Clique no botão *"Carregar XML"* para selecionar um arquivo XML que você deseja visualizar. O XML deve estar no formato adequado.

	Após selecionar o arquivo XML, os dados serão exibidos na tabela.

5. Lendo Códigos de Barras

	Utilizando uma máquina de leitura de código de barras, leia um código correspondente à tabela carregada. A linha correspondente na tabela será destacada.

	Se o código já foi lido anteriormente, a coluna *"Leitura"* na tabela será atualizada com a data e hora da leitura anterior.

	Se o código não for encontrado na tabela, uma mensagem de erro será exibida.

7. Baixando um PDF da Tabela

	Após ter carregado o arquivo XML e feito as leituras de códigos de barras, você pode baixar a tabela completa em formato PDF.

	Clique no botão *"Baixar PDF"* para gerar e baixar o arquivo PDF com os dados da tabela.

## Estrutura do Projeto

A estrutura de diretórios deste projeto é a seguinte:
```
- index.html 			# Página inicial do site
- style.css 			# Estilos CSS para a página
- script.js 			# Script JavaScript para a funcionalidade
```

## Tecnologias Utilizadas

Este projeto faz uso das seguintes tecnologias e bibliotecas:

- HTML
- CSS
- JavaScript
- jQuery
- pdfMake (para geração de PDF)
