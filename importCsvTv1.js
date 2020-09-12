function importCsv(options) {
  //INIT VARS*********************************************
  //******************************************************/
  options.hasOwnProperty("modalTitle")
    ? (importCsv.prototype.modalTitle = options.modalTitle)
    : (importCsv.prototype.modalTitle = "Import Csv");
  options.hasOwnProperty("buttonTitle")
    ? (importCsv.prototype.buttonTitle = options.buttonTitle)
    : (importCsv.prototype.buttonTitle = "Go");
  options.hasOwnProperty("tabelas")
    ? (importCsv.prototype.tabelas = options.tabelas)
    : alert("Você precisa definir as tabelas que deseja importar");
  options.hasOwnProperty("params")
    ? (importCsv.prototype.params = options.params)
    : (importCsv.prototype.params = {});
  options.hasOwnProperty("topExcelPosition")
    ? (importCsv.prototype.topExcelPosition = options.topExcelPosition)
    : (importCsv.prototype.topExcelPosition = "200");

  options.hasOwnProperty("routeBackEnd")
    ? (importCsv.prototype.routeBackEnd = options.routeBackEnd)
    : alert(
        "Você continuar, você precisa definir a variável routeBackEnd em options. Nela, ficará definida a rota de backend para onde será enviado o objeto de importação"
      );
  this.initTemplate();

  this.importTemplate();
}
importCsv.prototype.initTemplate = function () {
  let initT = ``;
  initT += `<div style="position:fixed;top:${importCsv.prototype.topExcelPosition}px;right:20px">
  <button class='btn btn-block btn-success' id="importcsvbtn"><i class="fas fa-file-excel"></i> IMPORT</button>
  </div>`;

  $("body").append(initT);
  $("#importcsvbtn").on("click", function () {
    importCsv.prototype.modalCsv();
  });
};

importCsv.prototype.importTemplate = function () {
  let iniTemplate = "";
  iniTemplate += `<form enctype = "multipart/form-data" id = "fupForm" >`;
  iniTemplate += `<div class="row p-2">`;
  iniTemplate += `<div class="form-group col-lg-5 col-sm-12" >`;
  iniTemplate += `<input type="hidden" name="MAX_FILE_SIZE" value="1000000" />`;
  iniTemplate += `<label>	Escolha o arquivo (csv):</label>`;
  iniTemplate += `<input class="form-control-file" name="userfile" id="arquivo" type="file" />`;
  iniTemplate += `</div>`;
  iniTemplate += `<div class="form-group col-lg-5 col-sm-12" >`;
  iniTemplate += `<label>SEPARADOR</label>`;
  iniTemplate += `<select class="form-control" id="separador" name="separador">`;
  iniTemplate += `<option value=";">; (SEPARAR POR PONTO E VIRGULA)</option>`;
  iniTemplate += `<option value=",">, (SEPARAR POR VIRGULA)</option>`;
  iniTemplate += `</select>`;
  iniTemplate += `</div>`;
  iniTemplate += `<div class="form-group col-lg-2 col-sm-12" style="margin-top:32px;">`;
  iniTemplate += `<input class="btn btn-block btn-success submitBtn" value="IR" id="submitBtn"/></form>`;
  iniTemplate += `</div>`;
  iniTemplate += `</div>`;
  return iniTemplate;
};

importCsv.prototype.modalCsv = function () {
  // if ($("#modalImportCsv")) {
  //   $("#modalImportCsv").remove();
  // }

  let preTable = importCsv.prototype.importTemplate();

  modalTemplate = ``;
  modalTemplate += `<div class="modal" tabindex="-1" role="dialog" id="modalImportCsv">`;
  modalTemplate += ` <div class="modal-dialog modal-lg" role="document">`;
  modalTemplate += `<div class="modal-content ">`;
  modalTemplate += `<div class="modal-header">`;
  modalTemplate += ` <h5 class="modal-title">${importCsv.prototype.modalTitle}</h5>`;
  modalTemplate += ` <button type="button" class="close" data-dismiss="modal" aria-label="Close">`;
  modalTemplate += `<span aria-hidden="true">&times;</span>`;
  modalTemplate += `</button>`;
  modalTemplate += `</div>`;
  modalTemplate += `<div class="modal-body">`;
  modalTemplate += `<div class="row">`;
  modalTemplate += preTable;
  modalTemplate += `</div>`;
  modalTemplate += `<div id="intoDatacsv"></div>`;
  modalTemplate += `</div>`;
  modalTemplate += `<div class="modal-footer">`;
  modalTemplate += `<button type="button" class="btn btn-primary" id="goImportCsv">${importCsv.prototype.buttonTitle}</button>`;
  modalTemplate += `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
  modalTemplate += `</div>`;
  modalTemplate += `</div>`;
  modalTemplate += ` </div>`;
  modalTemplate += `</div>`;

  $("body").append(modalTemplate);
  $("#goImportCsv").prop("disabled", true);
  $("#modalImportCsv").modal();
  $("#goImportCsv").on("click", function () {
    $("#goImportCsv").html("aguarde");
    $("#goImportCsv").prop("disabled", true);
    let getOrderData = importCsv.prototype.orderData();
    importCsv.prototype.send(getOrderData);
  });
  $("#submitBtn").on("click", function () {
    importCsv.prototype.separador = $("#separador").val();
    let arquivo = $("#arquivo");
    let getFile = arquivo[0].files[0];

    if (!getFile) {
      alert("Você precisa escolher um arquivo CSV");
      return;
    }
    importCsv.prototype.readTheFile(getFile).then(
      (res) => {
        let content = importCsv.prototype.csvToObject(res);
        importCsv.prototype.dataToImport = content;
        importCsv.prototype.modalCsvContent(content[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  });
};

importCsv.prototype.modalCsvContent = function (conteudo) {
  $("#goImportCsv").prop("disabled", false);
  let tabelas = importCsv.prototype.tabelas;
  let modalTemplate = ``;
  modalTemplate += `<div class="offset-lg-2 offset-md-0 col-lg-8 col-md-12">`;
  modalTemplate += `  <div class="row">`;
  modalTemplate += `    <div class="col-6">`;
  modalTemplate += `      <div class="row" >`;
  let countConteudo = 0;
  conteudo.map((res) => {
    modalTemplate += `      <div class="col-12" id="tb_${countConteudo}" style="padding-top: 10px;min-height:60px">${res}</div>`;
    countConteudo++;
  });
  modalTemplate += `      </div>`;
  modalTemplate += `    </div>`;
  modalTemplate += `    <div class="col-6">`;
  modalTemplate += `      <div class="row" >`;
  let countTabela = 0;
  conteudo.map((res) => {
    modalTemplate += `      <div class="col-12"  style="min-height:60px">`;
    modalTemplate += `        <select class="form-control sel-fix-field" id="sel_${countTabela}">`;
    modalTemplate += `          <option value="">ESCOLHER</option>`;
    tabelas.map((res) => {
      modalTemplate += `          <option value="${res}">${res}</option>`;
    });

    modalTemplate += `        </select>`;
    modalTemplate += `      </div>`;
    countTabela++;
  });
  modalTemplate += `    </div>`;
  modalTemplate += `  </div>`;
  $("#intoDatacsv").html(modalTemplate);
};

importCsv.prototype.readTheFile = async function (file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function () {
      var text = reader.result;
      resolve(text);
    };
    reader.readAsText(file);
  });
};

importCsv.prototype.csvToObject = function (content) {
  let objectContent = content.split("\n");
  let retorno = [];
  objectContent.map((res) => {
    let returnB = [];
    let newBreak = res.split(importCsv.prototype.separador);
    newBreak.map((resB) => {
      returnB.push(resB);
    });
    retorno.push(returnB);
  });
  return retorno;
};

importCsv.prototype.orderData = function () {
  let orderField = $(".sel-fix-field");
  let returnOrder = [];
  let hasKeyCount = [];
  let returnData = [];
  orderField.map((v, i) => {
    if (i.value != "") {
      hasKeyCount.push(v);
      returnOrder.push(i.value);
    }
  });

  importCsv.prototype.dataToImport.slice(1).map((v, i) => {
    let putData = [];
    v.map((_v, _i) => {
      hasKeyCount.includes(_i) ? putData.push(_v) : null;
    });
    returnData.push(putData);
  });

  return {
    tabelas: returnOrder,
    data: returnData,
  };
};

importCsv.prototype.send = function (getOrderData) {
  let _params = Object.assign(getOrderData, importCsv.prototype.params);
  $.post(importCsv.prototype.routeBackEnd, _params).done(function (data) {
    $("#goImportCsv").html(importCsv.prototype.buttonTitle);
    $("#goImportCsv").prop("disabled", false);
  });
};
