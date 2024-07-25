<?php

include_once(__DIR__ . '/../config/conexao.php');

try {
    // Definindo o SQL
    // $sql = 'SELECT AI.NUMATEND AS "ATENDIMENTO",
    //     P.nomepac AS "PACIENTE",
    //     cc.nomecc AS "SETOR",
    //     AI.codlei AS "LEITO",
    //     a.datatend AS "INTERNAÇÃO",
    //     ai.dataprev AS "PREV. ALTA"
    //     from arqatend a 
    // JOIN cadpac p ON a.codpac = p.codpac
    // JOIN arqint ai ON a.numatend = ai.numatend
    // JOIN cadlei cl ON ai.codlei = cl.codlei
    // JOIN cadaco ca ON cl.codaco = ca.codaco
    // JOIN cadcc cc ON ca.codcc = cc.codcc
    // WHERE ai.posicao = \'I\' AND cc.nomecc != \'HOSPITAL DIA\'
    // ORDER BY cc.nomecc,ai.codlei';

    // $sql = 'select ai.numatend AS "ATENDIMENTO",
    //     a.datatend AS "INTERNAÇÃO",
    //     P.nomepac AS "PACIENTE",
    //     cs.nomeserv AS "SERVIÇO",
    //     cc.nomecc AS "SETOR",
    //     ai.codlei AS "LEITO",
    //     ai.dataprev AS "PREV. ALTA" 
    // from arqatend a 
    // JOIN cadpac p ON a.codpac = p.codpac
    // JOIN arqint ai ON a.numatend = ai.numatend
    // JOIN cadlei cl ON ai.codlei = cl.codlei
    // JOIN cadaco ca ON cl.codaco = ca.codaco
    // JOIN cadcc cc ON ca.codcc = cc.codcc
    // JOIN cadserv cs ON a.codserv = cs.codserv where posicao = \'I\' and cc.codcc <> \'000137\' order by cc.nomecc,ai.codlei';

    $sql = 'select ai.numatend AS "ATENDIMENTO",
        a.datatend AS "INTERNAÇÃO",
        P.nomepac AS "PACIENTE",
        cs.nomeserv AS "TIPO",
        cc.nomecc AS "SETOR",
        ai.codlei AS "LEITO",
        ai.dataprev AS "PREV. ALTA" 
        from arqatend a 
        JOIN cadpac p ON a.codpac = p.codpac
        JOIN arqint ai ON a.numatend = ai.numatend
        JOIN cadlei cl ON ai.codlei = cl.codlei
        JOIN cadaco ca ON cl.codaco = ca.codaco
        JOIN cadcc cc ON ca.codcc = cc.codcc
        JOIN cadserv cs ON a.codserv = cs.codserv where posicao = \'I\' and cc.codcc <> \'000137\' order by cc.nomecc,ai.codlei';

    // Conectando ao banco de dados
    $conecta = Conectar();

    function limparCaracteresEspeciais($string) {
        // Remove caracteres especiais, mantendo apenas letras, números e espaços
        return preg_replace('/[^a-zA-Z0-9\s:\/]/', '', $string);
    }

    if($conecta) {
        // Preparando a consulta
        $stm = $conecta->prepare($sql);
        
        // Executando a consulta
        $stm->execute();

        // Verifica se há erros no SQL
        if ($stm->errorCode() !== '00000') {
            $error = $stm->errorInfo();
            echo json_encode(['error' => 'Erro: ' . $error[2]]);
            exit;
        }
        
        // Obtendo os resultados
        $retorno = $stm->fetchAll(PDO::FETCH_ASSOC);

        foreach($retorno as &$linha) {
            foreach($linha as &$valor) {
                $valor = limparCaracteresEspeciais($valor);
            }
        }

        if (empty($retorno)) {
            echo json_encode(['error' => 'Nenhum dado encontrado']);
            exit;
        }
        
        // Convertendo os resultados para JSON
        $retornoJson = json_encode($retorno);
        
        // Exibindo o JSON
        echo $retornoJson;
    } else {
        echo json_encode(['error' => 'Erro na conexao com o banco de dados']);
    }
} catch (PDOException $e) {
    // Capturando e exibindo qualquer erro
    echo 'Erro: ' . $e->getMessage();
}
