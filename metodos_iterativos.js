

function jacobi(epsilon, a, b, criterio_de_parada){
    //Para manter a precisão vamos manter os valores fracionados
    math.config({
        number: 'Fraction' // Default type of number: 
        // 'number' (default), 'BigNumber', or 'Fraction'
    })

    a = [["10", "2", "1"], ["1", "5", "1"],["2", "3", "10"]]
    b = ["7", "-8", "6"]
    ///Problema com a entrada A
    //solução inicial
 

    //Variável que vai salvar as funções
    funcoes_de_iteração = []
    pos_diagonal = 0

    //Constrói a função de iteração
    //Exemplo
    //0: "1/10*(7-(2*X1)-(1*X2))"
    //1: "1/5*(-8-(1*X0)-(1*X2))"
    //2: "1/10*(6-(2*X0)-(3*X1))"
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

    //Produz a solução inicial sendo ela b_i/a_ii
    solucoes_antigas = []
    for(i = 0; i<b.length; i++){
        solucoes_antigas.push(b[i]/a[i][i])
    }

    //Aqui começa a iteração!!
    //Enquanto parar for False (não bater o épsilon) ele vai rodar.
    parar = false
    while(!parar){
        
        //Gera novas soluções sobistituindo os Xs correspondente na solução inicial
        novas_solucoes = []
        funcoes_de_iteração.forEach(f =>{
            novo_f = f
            for(i = 0; i<b.length; i++){
                novo_f = novo_f.replaceAll('X'+i, '('+solucoes_antigas[i]+')')
            }
            novas_solucoes.push(math.evaluate(novo_f))
        });

        //Com as novas soluções, verifica o critério de parada.
        //Aqui existem 3 critérios, um deles será ativado e verficado se é menor que o Épsilon.
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


function seidel(epsilon, a, b, criterio_de_parada){

    //Para manter a precisão vamos manter os valores fracionados
    math.config({
        number: 'Fraction' // Default type of number: 
        // 'number' (default), 'BigNumber', or 'Fraction'
    })

    a = [["10", "2", "1"], ["1", "5", "1"],["2", "3", "10"]]
    b = ["7", "-8", "6"]
    ///Problema com a entrada A
    //solução inicial
 

    //Variável que vai salvar as funções
    funcoes_de_iteração = []
    pos_diagonal = 0

    //Constrói a função de iteração
    //Exemplo
    //0: "1/10*(7-(2*X1)-(1*X2))"
    //1: "1/5*(-8-(1*X0)-(1*X2))"
    //2: "1/10*(6-(2*X0)-(3*X1))"
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

    //Produz a solução inicial sendo ela b_i/a_ii
    solucoes_antigas = []
    for(i = 0; i<b.length; i++){
        solucoes_antigas.push(b[i]/a[i][i])
    }

    //Aqui começa a iteração!!
    //Enquanto parar for False (não bater o épsilon) ele vai rodar.
    parar = false
    while(!parar){
        
        //Gera novas soluções sobistituindo os Xs correspondente na solução inicial
        novas_solucoes = []
        funcoes_de_iteração.forEach(f =>{
            novo_f = f
            for(i = 0; i<b.length; i++){

                //Aqui existe uma diferença para o Gauss-Jacobi, pois é verificado se tem uma valor mais atualizado no novo vetorde soluções.
                novo_f = novo_f = novo_f.replaceAll(`X${i}`, `(${(novas_solucoes.length > i) ? novas_solucoes[i] : solucoes_antigas[i]})`);
            }
            novas_solucoes.push(math.evaluate(novo_f))
        });

        //Com as novas soluções, verifica o critério de parada.
        //Aqui existem 3 critérios, um deles será ativado e verficado se é menor que o Épsilon.
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