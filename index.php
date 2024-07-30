<?php 
require_once("./config/config.php");
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo NOMESITE ?></title>
  <link rel="shortcut icon" href="<?php echo LOGO ?>"> <!--LOGO-->
  <script src="<?php echo DIRJQUERY ?>"></script> <!--JQUERY-->
  <link href="<?php echo MAINCSS ?>" rel="stylesheet"> <!--CSS-->
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body>
  <!-- <form id="myForm"><button type="submit" id="loadData">TESTE CONEXAO</button></form> -->
  <button onclick="pararRolagem()">Parar Rolagem</button>

  <div id="setorCounts">
    <!-- Contagem dos setores -->
  </div>
  <table id="dataTable">
    <thead>
      <tr>
        <!-- cabeçalho serão inseridos aqui -->
      </tr>
    </thead>
    <tbody>
      <!-- Dados serão inseridos aqui -->
    </tbody>
  </table>
</body>
<script src="<?php echo DIRJS . 'main.js' ?>"></script>
</html>