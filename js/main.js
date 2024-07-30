var url = '/painel/';

// Formatar data para Formato BR
function formatarDataHora(dateTimeString) {
  if (!dateTimeString) return '';

  var data = new Date(dateTimeString);
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  var hora = String(data.getHours()).padStart(2, '0');
  var minuto = String(data.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${ano} - ${hora}:${minuto}`;
}

$(document).ready(function() {
  function carregarDados() {
    $.ajax({
      method: "GET",
      url: url + "funcoes/buscar-dados.php",
      dataType: "json",
      success: function(result) {
        if (result.error) {
          console.error(result.error);
          return;
        }

        console.log(result);
        var thead = $('#dataTable thead tr').empty();
        var tbody = $('#dataTable tbody').empty();
        var setorCounts = {};

        if (result.length > 0) {
          // Cabeçalho
          var headers = Object.keys(result[0]);
          headers.forEach(header => thead.append(`<th>${header}</th>`)); // Exbição do cabeçalho

          result.forEach(form => {
            // Contagem de setores
            setorCounts[form.SETOR] = (setorCounts[form.SETOR] || 0) + 1;

            // Condição para aplicação da função de formatar data
            var row = $('<tr>');
            headers.forEach(header => {
              var cellValue = (header === "INTERNAÇÃO" || header === "PREV. ALTA") ? formatarDataHora(form[header]) : form[header];
              row.append(`<td>${cellValue}</td>`);
            });

            // Exibição das linhas
            tbody.append(row);
          });

          // Pacientes por Setor
          var setorCountsDiv = $('#setorCounts').empty();
          Object.keys(setorCounts).forEach(setor => {
            setorCountsDiv.append(`<span>${setor} : ${setorCounts[setor]} - </span>`);
          });

          // Total de Pacientes
          setorCountsDiv.append(`<span>TOTAL DE PACIENTES : ${result.length}</span>`);
        }
      },
      error: function() {
        console.log("Erro no AJAX!");
      }
    });
  };

  carregarDados();
});