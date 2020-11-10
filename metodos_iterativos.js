function jacobi(epsilon, a, b){
    memoria = []

    //Para manter a precisão vamos manter os valores fracionados
    math.config({
        number: 'Fraction' // Default type of number: 
        // 'number' (default), 'BigNumber', or 'Fraction'
    })

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

    memoria.push(`⚙ Construído a função de iteração baseado na matriz A e vetor b:<br> <b>${funcoes_de_iteração}</b>`)

    //Produz a solução inicial sendo ela b_i/a_ii
    solucoes_antigas = []
    for(i = 0; i<b.length; i++){
        solucoes_antigas.push(b[i]/a[i][i])
    }

    memoria.push(`⚙ Construído a solução inicial X(0): <b>${solucoes_antigas}</b>`)

    //Aqui começa a iteração!!
    //Enquanto parar for False (não bater o épsilon) ele vai rodar.
    parar = false
    while(!parar){
        
        //Gera novas soluções sobistituindo os Xs correspondente na solução inicial
        novas_solucoes = []
        funcoes_de_iteração.forEach((f, index) =>{
            novo_f = f
            for(i = 0; i<b.length; i++){
                novo_f = novo_f.replaceAll('X'+i, '('+solucoes_antigas[i]+')')  
            }
            memoria.push(`⚙ Substituindo os xs da função de iteração x<sub>${index+1}</sub> de <i>${f}</i>. <br> Resultado: <b>${novo_f} =  <i>${math.evaluate(novo_f)}<i> </b>`)
            novas_solucoes.push(math.evaluate(novo_f))
        });

        memoria.push(`⚠ Novo vetor X, resultado dos cálculos anteriores: ${novas_solucoes}`)

        //Com as novas soluções, verifica o critério de parada.
        //Aqui existem 3 critérios, um deles será ativado e verficado se é menor que o Épsilon.
    
                diferenca = math.subtract(novas_solucoes,solucoes_antigas);
                diferenca_modulo = diferenca.map((e)=>{return Math.abs(e)});
                novas_solucoes_modulo = novas_solucoes.map((e)=>{return Math.abs(e)});
                parar = ((math.max(diferenca_modulo)/math.max(novas_solucoes_modulo)) < epsilon)? true : false;
                solucoes_antigas = novas_solucoes
                memoria.push(`⚙ Checado critério de parada: <i>${(math.max(diferenca_modulo)/math.max(novas_solucoes_modulo))} é menor que ${epsilon} ?</i>. 
                <br> Resultado <b>${(parar)? 'Verdadeiro, pare 🛑': 'Falso, continue ✔'}</b>`)
              

       
            
        
    }

    memoria.push(`🥳 Solução encontrada: <b>${solucoes_antigas}</b>` )  
    return{'resultado':solucoes_antigas, memoria}          

}


function seidel(epsilon, a, b){
    memoria = []

    //Para manter a precisão vamos manter os valores fracionados
    math.config({
        number: 'Fraction' // Default type of number: 
        // 'number' (default), 'BigNumber', or 'Fraction'
    })


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

    memoria.push(`⚙ Construído a função de iteração baseado na matriz A e vetor b:<br> <b>${funcoes_de_iteração}</b>`)

    //Produz a solução inicial sendo ela b_i/a_ii
    solucoes_antigas = []
    for(i = 0; i<b.length; i++){
        solucoes_antigas.push(b[i]/a[i][i])
    }

    memoria.push(`⚙ Construído a solução inicial X(0): <b>${solucoes_antigas}</b>`)

    //Aqui começa a iteração!!
    //Enquanto parar for False (não bater o épsilon) ele vai rodar.
    parar = false
    while(!parar){
        
        //Gera novas soluções sobistituindo os Xs correspondente na solução inicial
        novas_solucoes = []
        funcoes_de_iteração.forEach((f,index) =>{
            novo_f = f
            for(i = 0; i<b.length; i++){
                //Aqui existe uma diferença para o Gauss-Jacobi, pois é verificado se tem uma valor mais atualizado no novo vetorde soluções.
                novo_f = novo_f = novo_f.replaceAll(`X${i}`, `(${(novas_solucoes.length > i) ? novas_solucoes[i] : solucoes_antigas[i]})`);
            }
            memoria.push(`⚙ Substituindo os xs da função de iteração x<sub>${index+1}</sub> de <i>${f}</i>. <br> Resultado: <b>${novo_f} =  <i>${math.evaluate(novo_f)}<i> </b>`)
            memoria.push(`⚠ Novo x<sub>${index+1}</sub>: <b>${math.evaluate(novo_f)}<b>`)
            novas_solucoes.push(math.evaluate(novo_f))
        });

        memoria.push(`⚠ Novo vetor X, resultado dos cálculos anteriores: ${novas_solucoes}`)

        //Com as novas soluções, verifica o critério de parada.
        //Aqui existem 3 critérios, um deles será ativado e verficado se é menor que o Épsilon.

                diferenca = math.subtract(novas_solucoes,solucoes_antigas);
                diferenca_modulo = diferenca.map((e)=>{return Math.abs(e)});
                novas_solucoes_modulo = novas_solucoes.map((e)=>{return Math.abs(e)});
                parar = ((math.max(diferenca_modulo)/math.max(novas_solucoes_modulo)) < epsilon)? true : false;
                solucoes_antigas = novas_solucoes
                memoria.push(`⚙ Checado critério de parada: <i>${(math.max(diferenca_modulo)/math.max(novas_solucoes_modulo))} é menor que ${epsilon} ?</i>. 
                <br> Resultado <b>${(parar)? 'Verdadeiro, pare 🛑': 'Falso, continue ✔'}</b>`)
  
            
        
    }

    memoria.push(`🥳 Solução encontrada: <b>${solucoes_antigas}</b>` )  
    return{'resultado':solucoes_antigas, memoria}     

}



