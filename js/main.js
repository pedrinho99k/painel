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

      // Verificar o resultado do SQL
      console.log(result);

      var thead = $('#dataTable thead tr').empty();
      var tbody = $('#dataTable tbody').empty();
      var setorCounts = {};
      var altaNaoCounts = {};

      if (result.length > 0) {
        // Cabeçalho
        var headers = Object.keys(result[0]);
        headers.forEach(header => thead.append(`<th>${header}</th>`)); // Exbição do cabeçalho

        result.forEach(form => {
          // Contagem de setores
          setorCounts[form.SETOR] = (setorCounts[form.SETOR] || 0) + 1;

          // Contagem de setores de alta não
          if (form['ALTA?'] === 'NÃO') {
            altaNaoCounts[form.SETOR] = (altaNaoCounts[form.SETOR] || 0) + 1;
          }

          // Condição para aplicação da função de formatar data
          var row = $('<tr>');
          headers.forEach(header => {
            var cellValue = (header === "INTERNAÇÃO" || header === "PREV. ALTA") ? formatarDataHora(form[header]) : form[header];
            row.append(`<td>${cellValue}</td>`);
          });

          // Alterar a cor das linhas
          if (form['ALTA?'] === 'SIM') {
            row.addClass('alta-sim');
          } else if (form['ALTA?'] === 'NÃO') {
            row.addClass('alta-nao');
          }

          // Exibição das linhas
          tbody.append(row);
        });

        // Pacientes por Setor
        var setorCountsDiv = $('#setorCounts').empty();
        Object.keys(setorCounts).forEach(setor => {
          var altaNaoCount = altaNaoCounts[setor] || 0;
          // setorCountsDiv.append(`<div class="setor-item">${setor} = ${setorCounts[setor]}, ALTA NÃO = ${altaNaoCount}</div>`);
          setorCountsDiv.append(`<div class="setor-item">SEM ALTA ${setor} = ${altaNaoCount}</div>`);
        });

        // Total de Pacientes
        var totalAltaNao = Object.values(altaNaoCounts).reduce((sum, count) => sum + count, 0);
        setorCountsDiv.append(`<div class="setor-item">TOTAL SEM ALTA : ${totalAltaNao}</div>`);
        setorCountsDiv.append(`<div class="setor-item">TOTAL DE INTERNADOS : ${result.length}</div>`);
        // setorCountsDiv.append(`<div class="total">TOTAL DE ALTA NÃO : ${totalAltaNao}</div>`);
      }
    },
    error: function() {
      console.log("Erro no AJAX!");
    }
  });
};

let scrollInterval;
let direction = 'down';

function rolarPaginaContinuamente() {
  scrollInterval = setInterval(function() {
    const scrolledToBottom = (window.innerHeight + window.scrollY - 35) >= document.body.scrollHeight;
    const scrolledToTop = window.scrollY === 0;

    if (direction === 'down') {
      if (scrolledToBottom) {
        clearInterval(scrollInterval); // Pausa a rolagem
        setTimeout(() => {
          direction = 'up';
          rolarPaginaContinuamente(); // Retoma a rolagem após a pausa
        }, 2000); // Pausa de 2 segundos no final
      } else {
        window.scrollBy({ top: 1, behavior: 'smooth' });
      }
    } else if (direction === 'up') {
      if (scrolledToTop) {
        clearInterval(scrollInterval); // Pausa a rolagem
        carregarDados(); // Carrega os dados
        setTimeout(() => {
          direction = 'down';
          rolarPaginaContinuamente(); // Retoma a rolagem após a pausa
        }, 2000); // Pausa de 2 segundos no topo
      } else {
        window.scrollBy({ top: -1, behavior: 'smooth' });
      }
    }
  }, 40); // Intervalo mais curto para uma rolagem mais suave
}


function pararRolagem() {
  clearInterval(scrollInterval);
}

$(document).ready(function() {
  rolarPaginaContinuamente();
});