# IMPORT CSV PLUGIN

O plugin é de uso fácil e baixa implementação de código.
A teoria que o envolve é simples.

- Insira o acesso a lib em sua view.
- O plugin criará no body um botão ao lado direto que poderá ser configurado através de _options_ para ganhar uma nova posição vertical.
- Ao clicar neste botão o evento insere na pagina uma modal de bootstrap com um form para importação do CSV.
- CNeste momento é possível escolher o arquivo CSV assim como definir o separador definido em sua exportação.
- Ao clicar no submit o arquivo é lido pelo JS e mostra sua primeira linha para que então seja possível relacionar as tabelas(denfinidas em _options_).
- Após a relação das tabelas, ao clicar no botão de envio o request envia ao backend (denfinido em _options_) os parametros a serem tratados e posteriormente inseridos no BD.

## Dependências

O Plugin requer algumas livravias que devem sem importadas antes do mesmo. São elas:

- JQuery
- Bootstrap
- FontAwesome

## Instalação

Para usar o plugin é necessário importá-lo de forma que a pagina desejada tenha acesso aos script.

```javascript
<script src="../importCsvTv1.js"></script>
```

## Uso

Para iniciar o plugin é preciso apenas iniciar o código em um bloco de script

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

- modalTitle: "Importar Whitelist", //Titulo da modal
- buttonTitle: "Importar", // Titulo do botão que leva a ação de finalizar a importação
- topExcelPosition: "200", // distancia em pixel do topo ao botão de inicio
- routeBackEnd: "/processlogin", // rota para enviar os dados de importação (backend)
- tabelas: ["nome", "email", "diretoria", "unidade", "empresa"], //tabelas liberadas para importação
- params: { q: "importarCsv" }, // parametros adicionais a serem enviados ao backend

## Exemplo BackEnd PHP

ON CONTROLLER

```php
if($q == "importarCsv"){
       $Loader->Class('usuario');
       $c = new Usuario;
       $res=$c->importCsv($_REQUEST);
      $Loader->JSON($res);
  }
```

ON MODEL

```php
 function importCsv($dados){

        $tabelas=$dados['tabelas'];
        $data=$dados['data'];
        $query="INSERT IGNORE INTO usuarios (";
        $countTrHead=1;
        foreach($tabelas as $tabela){
            count($tabelas) > $countTrHead ?  $query.=$tabela."," :  $query.=$tabela.")";
            $countTrHead++;
        }
        $query.="VALUES";
        $countData=1;
        foreach ($data as $trs){
            $countTrBody=1;
             $query.="(";
            foreach($trs as $tr){
                if(count($data) > $countData){
                    count($trs) > $countTrBody ?  $query.="'".$newPhrase = str_replace("'", " ", $tr)."'"."," :  $query.="'".str_replace("'", " '", $tr)."'"."),";
                }else{
                    count($trs) > $countTrBody ?  $query.="'".str_replace("'", " '", $tr)."'"."," :  $query.="'".str_replace("'", " '", $tr)."'".");";
                }


                $countTrBody++;
            }
            $countData++;
        }
       //return $query;
        try{
            $r = $this->selectDB($query);
            return $r ;
        }catch (Exception $e) {
            return false;
       }

        return $r;
     }


```
