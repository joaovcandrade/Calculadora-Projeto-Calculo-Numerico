const { range } = require("mathjs")

math.config({
    number: 'Fraction' // Default type of number: 
    // 'number' (default), 'BigNumber', or 'Fraction'
})



function fatoracao_lu(A, b) {
    memoria = []
    matriz_aumentada = A

    math.config({
        number: 'Fraction' // Default type of number: 
        // 'number' (default), 'BigNumber', or 'Fraction'
    })

    matriz_a = A
    memoria.push({"evento": 'Matriz A', 'memoria': matriz_a})

    coluna_pivo = 0
    linha_pivo = 0

    

    //Criar o L
    l = []    
    diagonal = 0
    for (i = 0; i < matriz_a.length; i++) {
        linha = []
        for (j = 0; j < matriz_a[i].length; j++) {

            if (j == diagonal) {
                linha.push(1)
            } else {
                linha.push(0)
            }
        }
        l.push(linha)
        diagonal += 1
    }

    memoria.push({"evento": 'crição a matriz L', 'memoria': l})


    for (i = 0; i < matriz_a.length - 1; i++) {

        //Verifica se o pivô é zero, se sim, realiza a inversão das linhas
        if (matriz_a[linha_pivo][coluna_pivo] == '0') {

            maior_elemento_coluna = 0
            linha_maior_elemento = 0

            //Busca a linha de maior valor na coluna
            for (k = linha_pivo + 1; k < matriz_a.length; k++) {
                elemento = matriz_a[k][coluna_pivo];
                if (elemento >= maior_elemento_coluna) {
                    maior_elemento_coluna = elemento
                    linha_maior_elemento = k
                }
            }

            //Caso seja   zero, toda esta iteração e avance
            if (maior_elemento_coluna == '0') continue

            //Caso encontre uma linha para pivotar, troque.
            linha_aux = matriz_a[linha_pivo]
            matriz_a[linha_pivo] = matriz_a[linha_maior_elemento]
            matriz_a[linha_maior_elemento] = linha_aux
            memoria.push({"evento": 'Pivotamento de linha', 'memoria': matriz_a})

        }

        //Adquiro o novo pivô (pivotado ou não)
        pivo = matriz_a[linha_pivo][coluna_pivo]
        memoria.push({"evento": 'Pivô', 'memoria': pivo})

        //Para cada linha abaixo a do pivô faça:
        for (j = linha_pivo + 1; j < matriz_a.length; j++) {

            linha = j
            //Encontro o multiplicador (elemento da linha atual na coluna do pivô / pivô)
            multiplicador_linha = math.divide(math.evaluate(matriz_a[linha][coluna_pivo]), math.evaluate(pivo))
            memoria.push({"evento": `Multiplicador da linha ${linha}`, 'memoria': multiplicador_linha})
            l[linha][coluna_pivo] = multiplicador_linha//Adiciona o multiplicador ao L

            //fazer operação com o multiplicador em todos os elementos na linha
            matriz_a[linha].forEach((elemento_linha, index_elemento) => {
                multiplicacao = math.multiply(multiplicador_linha, matriz_a[linha_pivo][index_elemento])
                resultado = math.format(math.subtract(elemento_linha, multiplicacao))
                matriz_a[linha][index_elemento] = resultado.split('/')[1] == '1' ? resultado.split('/')[0] : resultado
                memoria.push({"evento": `Operação com o elemento ${index_elemento} da linha ${linha}`, 'memoria': matriz_a})
            });


        }
        //Avança uma posicação em linha e coluna para o próximo pivô
        linha_pivo += 1
        coluna_pivo += 1
    }

    //Cria o U
    u = matriz_a
    memoria.push({"evento": `Criação da matriz U`, 'memoria': u})

    // Resolução do L
    sistema_l = sistema_de_equacoes(l,b)

    solucao_l = math.lsolve(l,b)
    solucao_l.forEach((elemento, index) => {
        formatado = math.format(elemento).slice(1, -1)
        solucao_l[index] = formatado.split('/')[1] == '1' ? formatado.split('/')[0] : formatado
    })
    memoria.push({"evento": `Sistema de L`, 'memoria': sistema_l})
    memoria.push({"evento": `Solução do sistema L`, 'memoria': solucao_l})
    //Fim resolução do L

    //Formatção do L para entrada no U
    solucao_l_formatado = []
    math.config({number: 'number'})    
    solucao_l.map(e => solucao_l_formatado.push(math.evaluate(e)))
    u_formado=[]
    u.map(e=>{u_formado.push(math.evaluate(e))})
       
    
    math.config({number: 'Fraction'})
    sistema_u = sistema_de_equacoes(u,solucao_l)
    solucao_u = math.usolve(u_formado,solucao_l_formatado)
    solucao_u.forEach((elemento, index) => {
        formatado = math.format(elemento).slice(1, -1)
        solucao_u[index] = formatado.split('/')[1] == '1' ? formatado.split('/')[0] : formatado
    })
    memoria.push({"evento": `Sistema de u`, 'memoria': sistema_u})
    memoria.push({"evento": `Solução do sistema u`, 'memoria': solucao_u})


    return{
        "sistema_l": sistema_l,
        "solucao_l": solucao_l,
        "sistema_u": sistema_u,
        "solucao_u": solucao_u,
        "memoria": memoria
    }

    


}

function sistema_de_equacoes(a, b){
    //Cria o sistema de equacoes
    expressoes = []
    a.forEach((el, index) => {
        expr = ''
        for (i = index; i < el.length - 1; i++) {
            expr += `+(${el[i]}) X${i + 1} `
        }
        expr += ` = (${b[index]})`
        expressoes.push(expr)
    })
    return expressoes
}

function eliminacao_de_gauss(a, b) {
    
    console.log(a,b)
    //Pega a Matriz A e o vetor b, junta em uma matriz aumentada

    matriz_aumentada = []
    a.map((el, index) => {
        matriz_aumentada.push(el);
    })
    for(i=0; i< matriz_aumentada.length;i++){
        matriz_aumentada[i].push(b[i])
    }
    
    return eliminacao_de_gauss_(matriz_aumentada)
}

function eliminacao_de_gauss_(a) {
    memoria = []
    matriz_aumentada = a
    

    memoria.push({"evento": 'Inicio da matriz A', 'matriz': matriz_aumentada.toString()})

    

    coluna_pivo = 0
    linha_pivo = 0

    for (i = 0; i < matriz_aumentada.length - 1; i++) {


        //Verifica se o pivô é zero, se sim, realiza a inversão das linhas
        if (matriz_aumentada[linha_pivo][coluna_pivo] == '0') {

            maior_elemento_coluna = 0
            linha_maior_elemento = 0

            //Busca a linha de maior valor na coluna
            for (k = linha_pivo + 1; k < matriz_aumentada.length; k++) {
                elemento = matriz_aumentada[k][coluna_pivo];
                if (elemento >= maior_elemento_coluna) {
                    maior_elemento_coluna = elemento
                    linha_maior_elemento = k
                }
            }

            //Caso seja tudo zero, toda esta iteração e avance
            if (maior_elemento_coluna == '0') continue

            //Caso encontre uma linha para pivotar, troque.
            linha_aux = matriz_aumentada[linha_pivo]
            matriz_aumentada[linha_pivo] = matriz_aumentada[linha_maior_elemento]
            matriz_aumentada[linha_maior_elemento] = linha_aux
            memoria.push({"evento": 'Pivotamento de linha', 'matrix': matriz_aumentada.toString()})
        }

        //Adquiro o novo pivô (pivotado ou não)
        pivo = matriz_aumentada[linha_pivo][coluna_pivo]
        memoria.push({"evento": 'Pivô', 'pivo': pivo})

        //Para cada linha abaixo a do pivô faça:
        for (j = linha_pivo + 1; j < matriz_aumentada.length; j++) {
            linha = j
            //Encontro o multiplicador (elemento da linha atual na coluna do pivô / pivô)
            multiplicador_linha = math.divide(math.evaluate(matriz_aumentada[linha][coluna_pivo]), math.evaluate(pivo))
            memoria.push({"evento": `Multiplicador da linha ${linha}`, 'matriz': multiplicador_linha.toString()})

            //fazer operação com o multiplicador em todos os elementos na linha
            matriz_aumentada[linha].forEach((elemento_linha, index_elemento) => {
                multiplicacao = math.multiply(multiplicador_linha, matriz_aumentada[linha_pivo][index_elemento])
                resultado = math.format(math.subtract(elemento_linha, multiplicacao))
                matriz_aumentada[linha][index_elemento] = resultado.split('/')[1] == '1' ? resultado.split('/')[0] : resultado
                memoria.push({"evento": `Operação com o elemento ${index_elemento} da linha ${linha}`, 'matriz': matriz_aumentada.toString()})
            });
        }

        //Avança uma posicação em linha e coluna para o próximo pivô
        linha_pivo += 1
        coluna_pivo += 1
    }

    

    //Transforma a matriz aumentada no formato U * x = b. 
    a = matriz_aumentada
    b = [] //vetor de valores b
    for (i = 0; i < a.length; i++) {
        b.push(math.fraction(a[i].pop()))
        for (j = 0; j < a[i].length; j++) {
            a[i][j] = math.fraction(a[i][j])
        }
    }

    //Cria o sistema de equacoes
    expressoes = sistema_de_equacoes(a, b)

    //Realiza a substituição e encontra os valores das icógnitas
    solucao = math.usolve(a, b)

    //Formata a solução para o formato inteiro ou fracionado, se possível.
    solucao.forEach((elemento, index) => {
        formatado = math.format(elemento).slice(1, -1)
        solucao[index] = formatado.split('/')[1] == '1' ? formatado.split('/')[0] : formatado
    })
    memoria.push({"evento": `Matriz A`, 'matriz': a.toString()})
    memoria.push({"evento": `Vetor b`, 'matriz': b.toString()})
    memoria.push({"evento": `Sistema de equações`, 'memoria': expressoes})
    memoria.push({"evento": `Solução do sistema`, 'memoria': solucao})

    //Retorna a solução e as expressões
    return {
        'solucao':solucao,
        'expressoes': expressoes,
        'memoria': memoria
    }

}

function jacobi(epsilon, a, b, criterio_de_parada){
    a = [["10", "2", "1"], ["1", "5", "1"],["2", "3", "10"]]
    b = ["7", "-8", "6"]
    ///Problema com a entrada A
    //solução inicial
    
    //Vamos verificar se atende o critério de convergência
    resultados_por_linha = []
    pos_diagonal = 0  

    /* for (i=0; i<a.length; i++){ 

        //elemento das linhas menos o elem. diagonal
        elementos_da_linha = []
        for(j=0; j<a[i].length; j++){
            if(j != i){
                elementos_da_linha.push(a[i][j])
            }
        }
        //elemento diagonal
        elemento_diag = a[i][pos_diagonal]

        //verifica se elem_diag > soma_linha
        if(elemento_diag > elementos_da_linha.reduce((a, b) => a + b)){
            resultados_por_linha.push(true)
        }else{
            resultados_por_linha.push(false)
        }
        pos_diagonal += 1;
    } */
    //verificar se atende!
    //fazer a convergência da coluna

    funcoes_de_iteração = []
    pos_diagonal = 0
    console.log(a)
    for(i = 0; i<a.length; i++){
        funcao = ''
        console.log(a[i][pos_diagonal])
        funcao += ('1/'+a[i][pos_diagonal])
        funcao += ('*')
        funcao += ('(')
        funcao += (b[i])
        for(j=0; j<a[i].length; j++){
            
            if(j != i){
                funcao += ('-')
                funcao += ('('+a[i][j]+'*')                
                funcao += ('X'+j)
                funcao += (')')
            }
        }
        funcao += (')')
        funcoes_de_iteração.push(funcao)
        pos_diagonal += 1
    }
    console.log("funcoes_de_iteração")
    console.log(funcoes_de_iteração)

    solucoes_antigas = []
    for(i = 0; i<b.length; i++){
        solucoes_antigas.push(b[i]/a[i][i])
    }

    console.log("Solucao inicial")
    console.log(solucoes_antigas)
    parar = false
    while(!parar){
        novas_solucoes = []
        funcoes_de_iteração.forEach(f =>{
            novo_f = f
            for(i = 0; i<b.length; i++){
                novo_f = novo_f.replace('X'+i, '('+solucoes_antigas[i]+')')
            }
            novas_solucoes.push(math.evaluate(novo_f))
        });

        switch(criterio_de_parada){
            case '1':
                diferenca = math.subtract(novas_solucoes,solucoes_antigas);
                diferenca_modulo = diferenca.map((e)=>{return Math.abs(e)});
                novas_solucoes_modulo = novas_solucoes.map((e)=>{return Math.abs(e)});
                parar = ((math.max(diferenca_modulo)/math.max(novas_solucoes_modulo)) < epsilon)? true : false;
                solucoes_antigas = novas_solucoes
                break;
            case '2':
        }
            
        
    }
    console.log('solucao', solucoes_antigas)
        

}





