function lagrange(x, y, p_x){

    x = [["-1"], ["0"], ["2"]]
    y=["4", "1", "-1"]

    //Para manter a precisão vamos manter os valores fracionados
    math.config({
        number: 'Fraction' // Default type of number: 
        // 'number' (default), 'BigNumber', or 'Fraction'
    })
    console.log(x,y)
    polinomio = '0'

    for(i = 0; i<y.length; i++){
         polinomio += `+(y${i}*L${i})`
    }

    console.log(polinomio)

    for(i = 0; i<y.length; i++){
        polinomio = polinomio.replace(`y${i}`, y[i])
   }

    console.log(polinomio)
    ls = []
    //Construindo os Ls
    for(i = 0; i<y.length; i++){
        l = '/'
        for(j = 0; j<y.length; j++){
            if(j == i){ //Se o J == I pule!
                continue;
            }else{
                l = (`(x-x${j})`) + l
                l += (`(x${i}-x${j})`)
            }
            
        }
        ls.push(l)

   }

   console.log(ls)

   for(i = 0; i< ls.length; i++){
        for(j = 0; j<x.length; j++){
            ls[i] = ls[i].replaceAll(`x${j}`, `(${x[j]})`)
        }
   }

   console.log(ls)

   for(i = 0; i< ls.length; i++){
        polinomio = polinomio.replace(`L${i}`, `(${math.simplify(ls[i])})`);
    }
    
    console.log(polinomio)

    scope ={x: p_x}

    console.log(math.evaluate(polinomio, scope))





}

function newton(x, y, p_x){
    console.log(x, y)

    x = [["-1"], ["0"], ["2"]]
    y=["4", "1", "-1"]


    //Para manter a precisão vamos manter os valores fracionados
    math.config({
        number: 'Fraction' // Default type of number: 
        // 'number' (default), 'BigNumber', or 'Fraction'
    })  

    polinomio = 'd0'

    for(i = 1; i<y.length; i++){
        v = ''
        for (j=0; j< i; j++){
            v+= `(x-x${j})`
        }
         polinomio += `+d${i}${v}`
    }

    console.log(polinomio)

    diferencas = []
    d = [] //Ds
    d.push(y[0]) //O primeiro d é o y0

    for(i = 0; i< y.length-1; i++){

        r = {'valor':(y[i+1] - y[i]) / (x[i+1] - x[i]), 'maximo': x[i+1], 'minimo': x[i]}
        if(i == 0){
            d.push(r['valor'])
        }
        diferencas.push(r)
    }
    console.log(diferencas)

    novas_diferencas = []
    for(i = 0; i< diferencas.length-1; i++){
        
        maximo = (diferencas[i+1]['maximo'] > diferencas[i]['maximo'])? diferencas[i+1]['maximo'] : diferencas[i]['maximo']
        minimo = (diferencas[i+1]['minimo'] < diferencas[i]['minimo'])? diferencas[i+1]['minimo'] : diferencas[i]['minimo'] 
        r = {'valor':(diferencas[i+1]['valor'] - diferencas[i]['valor']) / (maximo - minimo), 'maximo': maximo, 'minimo': minimo}
        if(i == 0){
            d.push(r['valor'])
        }
        novas_diferencas.push(r)
    }
    diferencas = novas_diferencas

    console.log(diferencas)
    console.log(d)

    for (i=0; i<y.length; i++){
        polinomio = polinomio.replaceAll(`d${i}`, `(${d[i]})`)
    }

    console.log(polinomio)

    for (i=0; i<x.length-1; i++){
        polinomio = polinomio.replaceAll(`x${i}`, `(${x[i]})`)
    }

    console.log(polinomio)

    scope ={x: p_x}

    console.log(math.evaluate(polinomio, scope))


}

