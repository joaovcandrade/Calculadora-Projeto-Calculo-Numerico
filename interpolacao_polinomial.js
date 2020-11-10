function lagrange(x, y, p_x){
    memoria = []
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

    memoria.push(`⚙ Criado o polinômio: <b>${polinomio}{br}`)
    polinomio_antigo = polinomio
    for(i = 0; i<y.length; i++){
        polinomio = polinomio.replace(`y${i}`, y[i])
   }

   memoria.push(`⚙ Substituição das variáveis ys de <i>${polinomio_antigo}</i>. <br> Resultado: <b>${polinomio}</b>`)

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
        memoria.push(`⚠ Gerado o L<sub>${i}</sub>: <b>${l}</b>`)
        ls.push(l)

   }

   ls_antigo = ls
   for(i = 0; i< ls.length; i++){
        for(j = 0; j<x.length; j++){
            ls[i] = ls[i].replaceAll(`x${j}`, `(${x[j]})`)
        }
   }

   memoria.push(`⚙ Substituído a variáveis dos Ls <i>${ls_antigo}</i>.</br> Resultado: <b>${ls}</b>`)

   polinomio_antigo = polinomio
   for(i = 0; i< ls.length; i++){
        polinomio = polinomio.replace(`L${i}`, `(${math.simplify(ls[i])})`);
    }

    memoria.push(`⚙ Substituído os Ls (simplificado) no polinômio <i>${polinomio_antigo}</i>. <br> Resultado: <b>${polinomio}</b>`)
    
    memoria.push(`🥳 Polinômio encontrado: ${polinomio}`)

    return {'resultado': polinomio, memoria}





}

function newton(x, y, p_x){
    memoria = []
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

    memoria.push(`⚙ Criado o polinômio: ${polinomio}`)

    diferencas = []

    d = [] //Ds
    d.push(y[0]) //O primeiro d é o y0
    memoria.push(`⚠ Encontrado o d0: ${y[0]}`)

    for(i = 0; i< y.length-1; i++){

        r = {'valor':(y[i+1] - y[i]) / (x[i+1] - x[i]), 'maximo': x[i+1], 'minimo': x[i]}
        memoria.push(`⚙ Diferença dividida realizado de: x=${x[i]} e y=${y[i]} com x=${x[i+1]} e y=${y[i+1]}. Resultado ${r['valor']}`)
        if(i == 0){
            memoria.push(`🎉 Encontrado o d<sub>${d.length}<sub>: <b>${r['valor']}</b>`)
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
        memoria.push(`⚙ Diferença dividida realizado de: x=${minimo} e y=${diferencas[i]['valor']} com x=${maximo} e y=${diferencas[i+1]['valor']}. Resultado ${r['valor']}`)
        if(i == 0){
            memoria.push(`⚠ Encontrado o d<sub>${d.length}</sub>: <b>${r['valor']}</b>`)
            d.push(r['valor'])
        }
        novas_diferencas.push(r)
    }
    diferencas = novas_diferencas

    polinomio_antigo = polinomio
    for (i=0; i<y.length; i++){
        polinomio = polinomio.replaceAll(`d${i}`, `(${d[i]})`)
    }

    memoria.push(`⚙ Atualizado os ds no polinômio <i>${polinomio_antigo}</i>.<br> Resultado: <b>${polinomio}</b>.`)

    polinomio_antigo = polinomio
    for (i=0; i<x.length-1; i++){
        polinomio = polinomio.replaceAll(`x${i}`, `(${x[i]})`)
    }

    memoria.push(`⚙ Atualizado os xs no polinômio <i>${polinomio_antigo}</i>.<br> Resultado: <b>${polinomio}</b>`)

    memoria.push(`🥳 Polinômio encontrado: <b>${polinomio}</b>`)

    return {'resultado': polinomio, memoria}


}

