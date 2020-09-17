function restringir(funcao){
    
    //Lista de resultados
    intervalos = []

   //Calular o primeiro valor de x =-1000 só para salvar o primeiro sinal
   x_substituido = funcao.replaceAll('x', '('+'-1000'+')')
   resultado = math.evaluate(x_substituido)
   sinal = (resultado > 0)

   //Calcular os -1000 a 1000 f(x) e salvar o intervalo onde há diferenças de sinais
   for (i=-1000; i<1000; i++){
       //substituir o x na função para o valor i da iteração
       x_substituido = funcao.replaceAll('x', '('+i+')')
       //calular a função
       resultado = math.evaluate(x_substituido)
       //salva somente o sinal do resultado (True se > 0 e False se < 0)
       novo_sinal = (resultado > 0)

       //comparar o novo sinal do resultado com o antigo, se for diferente, 
       //salva o intervalo na lista de intervalos
       if(novo_sinal != (sinal)){
           intervalos.push([i-1,i])
       }
       sinal = novo_sinal
   }

   //retorna os intervalos
   return intervalos

}

//A bissecção recebe como parâmetros a função, intervalo, erro, máximo de iterações (padrão é 999)
function bisseccao(funcao, intervalo, erro=0.01, it_max = 999, casas_decimais){
    
    erro = parseFloat(erro)

    memoria = []

    //valores de intervalos iniciais
    a = parseFloat(intervalo[0])
    a = parseFloat(a.toFixed(casas_decimais)) //arredondamento casas decimais

    b = parseFloat(intervalo[1])
    b = parseFloat(b.toFixed(casas_decimais)) //arredondamento casas decimais

   
    //--beep 👨‍🏭 beep, hora de executar.--//    
    contador = 0
    while(contador <= it_max){
        //Incrementar o contador, não queremos que fique num loop infinito.
        contador +=1
        
        //calcula o x linha
        x_linha = (a+b)/2
        x_linha = parseFloat(x_linha.toFixed(casas_decimais)) //arredondamento casas decimais
        

        //substituir o x na função para o valor x linha
       x_substituido = funcao.replaceAll('x', '('+x_linha+')')

       //calcula o f de x linha
       resultado = math.evaluate(x_substituido)
       resultado = parseFloat(resultado.toFixed(casas_decimais)) //arredondamento casas decimais

       //======Hora de salvar tudo na memória do computador 🤯======//       
       //a lembrança da iteração atual, onde salvo a, b, x_linha e o fx_linha
       mini_memoria = {a, b, x_linha, fx_linha: resultado }

       //Coloco esta iteração na memória principal
       memoria.push(mini_memoria)
       //======Pronto, salvo======//
       

       //verifica se o resultado (em módulo) é menor que o erro, se sim pare 🤚🛑🙅‍♀️🙅‍♂️.
        //console.log(Math.abs(resultado))
        console.log(Math.abs(resultado), erro)
       if(Math.abs(resultado) <= erro) break;

       //Vamos analisar o sinal do resultado e substituir o 'a' ou 'b'
       if(resultado <= 0){ //Se maior ou igual a zero, substitua o 'a'.
        console.log("maior")
        a = x_linha
       }else{//Se menor que zero, substitua o 'b'.
       console.log("menor")
        b = x_linha 
       }

    }

    //Retorna o resultado e a memória
    return [x_linha, memoria]

}


//A bissecção recebe como parâmetros a função, X_o, erro, máximo de iterações (padrão é 999)
function newton(funcao, pos_inicial, erro, it_max = 999, casas_decimais){
    erro = parseFloat(erro)
    memoria = []

    //valores de intervalos iniciais
    iter = 0
    x_linha = parseFloat(pos_inicial)   
    x_linha = parseFloat(x_linha.toFixed(casas_decimais)) //arredondamento casas decimais

    derivada = math.string(math.derivative(funcao, 'x')) //função e minha variável


    //--beep 👨‍🏭 beep, hora de executar.--//    
    contador = 0
    while(contador <= it_max){
        //Incrementar o contador, não queremos que fique num loop infinito.
        contador +=1
        console.log(funcao)
        //substituir o x na função para o valor x linha
       x_substituido = funcao.replaceAll('x', '('+x_linha+')')

       //calcula o f de x linha
       resultado = math.evaluate(x_substituido)
       resultado = parseFloat(resultado.toFixed(casas_decimais)) //arredondamento casas decimais

       //======Hora de salvar tudo na memória do computador 🤯======//       
       //a lembrança da iteração atual, onde salvo a, b, x_linha e o fx_linha
       mini_memoria = { x_linha, fx_linha: resultado }

       //Coloco esta iteração na memória principal
       memoria.push(mini_memoria)
       //======Pronto, salvo======//
       

       //verifica se o resultado (em módulo) é menor que o erro, se sim pare 🤚🛑🙅‍♀️🙅‍♂️.
        //console.log(Math.abs(resultado))
       if(Math.abs(resultado) <= erro) break;

      //**Calcular o próximo x_linha**//

      //sustituir o x na derivada
      x_substituido_derivada = derivada.replaceAll('x', '('+x_linha+')')
      //calcula a derivada de f de x linha
      resultado_derivada = math.evaluate(x_substituido_derivada)
      resultado_derivada = parseFloat(resultado_derivada.toFixed(casas_decimais)) //arredondamento casas decimais

      x_linha = (x_linha) - ((resultado)/(resultado_derivada))
      x_linha = parseFloat(x_linha.toFixed(casas_decimais)) //arredondamento casas decimais

    }
    console.log(memoria)
    //Retorna o resultado e a memória
    return [x_linha, memoria]

}