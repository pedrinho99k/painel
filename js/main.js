var url = '/painel/';

function formatarDataHora(dateTimeString) {
  if(!dateTimeString) return '';

  var data = new Date(dateTimeString);
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  var hora = String(data.getHours()).padStart(2, '0');
  var minuto = String(data.getMinutes()).padStart(2, '0');

   return `${dia}/${mes}/${ano} - ${hora}:${minuto}`;
}

$(document).ready(function() {
  $('#loadData').click(function(event) {
    event.preventDefault();

    $.ajax({
        method: "POST",
        url: url + "funcoes/buscar-dados.php",
        success: function(result) {
          console.log(result);
          var data = JSON.parse(result);

          console.log(result);

          console.log(data);

          var thead = $('#dataTable thead tr');
          var tbody = $('#dataTable tbody');
          tbody.empty();

          if(data.length > 0) {
            thead.empty();

            var headers = Object.keys(data[0]);
            headers.forEach(function(header) {
              thead.append('<th>' + header + '</th>');
            });

            var setorCounts = {};

            data.forEach(function(form) {
              if(!setorCounts[form.SETOR]) {
                setorCounts[form.SETOR] = 0;
              }
              setorCounts[form.SETOR]++;

              var row = '<tr>';
              headers.forEach(function(header) {
                var cellValue = form[header];

                if (header === "INTERNAÇÃO" || header === "PREV. ALTA") {
                  cellValue = formatarDataHora(cellValue);
                }

                row += '<td>' + cellValue + '</td>';
              });
              row += '</tr>';
              tbody.append(row);
            });

            // Exibindo as contagens de SETOR
            var setorCountsDiv = $('#setorCounts');
            setorCountsDiv.empty();
            for (var setor in setorCounts) {
                // Criando o span dinamicamente
                var pacientesSetor = $('<span>').text(`${setor} : ${setorCounts[setor]} - `);
                // Adicionando o span ao div de contagem de setores
                setorCountsDiv.append(pacientesSetor);
                console.log(pacientesSetor);
            }

            var totalPacientes = $('<span>').text(`TOTAL DE PACIENTES : ${data.length}`);

            $('#setorCounts').append(totalPacientes);
          } 
        },
        error: function () {
            console.log("Erro no AJAX!");
        }
    });
  });
});