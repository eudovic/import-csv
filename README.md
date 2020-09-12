# IMPORT CSV PLUGIN
O plugin é de uso fácil e baixa implementação de código.
A teoria que o envolve é simples.

* Inserir o acesso a lib em sua view.
* O plugin cria no body um botão ao lado direto que pode ser configurado através de *options* para ganhar uma nova posição vertical.
* Ao clicar neste botão o evento inseri a pagina uma modal de bootstrap com um form de importação o CSv.
* Com o form importado é possível escolhar o arquivo CSV assim como definir o separador definido em sua exportação.
* Ao clicar no submit o arquivo é lido pelo JS e mostra sua primeira linha para que então você possa relacionar as tabelas(denfinidas em *options*).
* Após a relação das tabelas, ao clicar no botão de envio o request envia ao backend (denfinido em *options*) os parametros a serem tratados e posteriormente inseridos no BD.

## Dependências
O Plugin requer algumas livravias que devem sem importadas antes do mesmo. São elas:
* JQuery
* Bootstrap
* FontAwesome


## Instalação
Para usar o plugin é necessário importá-lo de forma que a pagina desejada tenha acesso aos script.
```javascript
  <script src="../importCsvTv1.js"></script>
 ```


## Uso
Para iniciar o plugin é preciso apenas inciar o código em um bloco de script

```js
let csv = new importCsv({
        modalTitle: "Importar Whitelist",
        buttonTitle: "Importar",
        topExcelPosition: "200",
        routeBackEnd: "/processlogin",
        tabelas: ["nome", "email", "diretoria", "unidade", "empresa"],
        params: { q: "importarCsv" },
      });
```

## Options

  modalTitle: "Importar Whitelist", //Titulo da modal
  buttonTitle: "Importar", // Titulo do botão que leva a ação de finalizar a importação
  topExcelPosition: "200", // distancia em pixel do topo ao botão de inicio
  routeBackEnd: "/processlogin", // rota para enviar os dados de importação (backend)
  tabelas: ["nome", "email", "diretoria", "unidade", "empresa"], //tabelas liberadas para importação
  params: { q: "importarCsv" }, // parametros adicionais a serem enviados ao backend
