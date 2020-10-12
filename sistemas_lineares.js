math.config({
    number: 'Fraction' // Default type of number: 
                     // 'number' (default), 'BigNumber', or 'Fraction'
})

function eliminacao_de_gauss(matriz_aumentada){

    coluna_pivo = 0
    linha_pivo = 0

    for(i=0; i<matriz_aumentada.length-1; i++){


        //Verifica se o pivô é zero, se sim, realiza a inversão das linhas
        if(matriz_aumentada[linha_pivo][coluna_pivo] == '0'){

            maior_elemento_coluna = 0
            linha_maior_elemento = 0

            //Busca a linha de maior valor na coluna
            for(k=linha_pivo+1; k<matriz_aumentada.length; k++){
                elemento = matriz_aumentada[k][coluna_pivo];
                if (elemento >= maior_elemento_coluna){
                    maior_elemento_coluna = elemento
                    linha_maior_elemento = k
                }
            }

            //Caso seja tudo zero, toda esta iteração e avance
            if(maior_elemento_coluna == '0') continue

            //Caso encontre uma linha para pivotar, troque.
            linha_aux = matriz_aumentada[linha_pivo]
            matriz_aumentada[linha_pivo] = matriz_aumentada[linha_maior_elemento]
            matriz_aumentada[linha_maior_elemento] = linha_aux
        }

        //Adquiro o novo pivô (pivotado ou não)
        pivo = matriz_aumentada[linha_pivo][coluna_pivo]

        //Para cada linha abaixo a do pivô faça:
        for(j = linha_pivo+1; j<matriz_aumentada.length; j++){
            linha = j
            //Encontro o multiplicador (elemento da linha atual na coluna do pivô / pivô)
            multiplicador_linha = math.divide(math.evaluate(matriz_aumentada[linha][coluna_pivo]),math.evaluate(pivo))
 
            //fazer operação com o multiplicador em todos os elementos na linha
            matriz_aumentada[linha].forEach((elemento_linha,index_elemento) => {
                multiplicacao = math.multiply(multiplicador_linha, matriz_aumentada[linha_pivo][index_elemento])
                resultado = math.format(math.subtract(elemento_linha, multiplicacao))
                matriz_aumentada[linha][index_elemento] = resultado.split('/')[1] == '1'? resultado.split('/')[0] : resultado
            });
        }
        //Avança uma posicação em linha e coluna para o próximo pivô
        linha_pivo += 1
        coluna_pivo += 1
    }
    
    //Cria o sistema de equacoes
    expressoes = []
    matriz_aumentada.forEach((el, index)=>{
        expr = ''
        for(i=index; i< el.length-1; i++){
            expr += `+(${el[i]}) X${i+1} `
        }
        expr +=` = (${el[el.length-1]})`
        expressoes.push(expr)
    })

    //Transforma a matriz aumentada no formato U * x = b. 
    a = matriz_aumentada
    b = [] //vetor de valores b
    for (i=0; i< a.length; i++){
       b.push(math.fraction(a[i].pop()))
       for(j=0; j< a[i].length; j++){
           a[i][j] = math.fraction(a[i][j])
       }
    }

    //Realiza a substituição e encontra os valores das icógnitas
    solucao = math.usolve(a,b)
    console.log(solucao)

    //Formata a solução para o formato inteiro ou fracionado, se possível.
    solucao.forEach((elemento,index)=>{
        formatado = math.format(elemento).slice(1,-1)
        solucao[index] =  formatado.split('/')[1] == '1'? formatado.split('/')[0] : formatado
    })
    
    //Retorna a solução e as expressões
    return [solucao, expressoes]
    
}

matriz_aumentada = [['3','2','4','1'], ['1','1','2','2'],['4','3','-2','3']]

console.log(eliminacao_de_gauss(matriz_aumentada))