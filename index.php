<?php 
require_once("./config/config.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo NOMESITE ?></title>
  <link rel="shortcut icon" href="<?php echo LOGO ?>"> <!--LOGO-->
  <script src="<?php echo DIRJQUERY ?>"></script> <!--JQUERY-->

  <link href="<?php echo MAINCSS ?>" rel="stylesheet"> <!--CSS-->
</head>
<body>
  <form id="myForm">
    <button type="submit" id="loadData">TESTE CONEXAO</button>
  </form>
  <div id="setorCounts">

  </div>
  <table id="dataTable">
    <thead>
      <tr>
        <!-- <th>ATENDIMENTO</th>
        <th>PACIENTE</th>
        <th>SETOR</th>
        <th>LEITO</th>
        <th>INTERNAÇÃO</th>
        <th>PREV. ALTA</th> -->
      </tr>
    </thead>
    <tbody>
      <!-- Dados serão inseridos aqui -->
    </tbody>
  </table>
</body>
<script src="<?php echo DIRJS . 'main.js' ?>"></script>
</html>