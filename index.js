help_funcao = document.querySelector('#help-funcao')
help_epsilon = document.querySelector('#help-epsilon')
help_iteracoes = document.querySelector('#help-iteracoes')

document.querySelector("#resetar").addEventListener('click', ()=>{
    document.querySelector("#resetar").style="display: none"
    document.querySelector("#resultado").style =  "display:none";
    document.querySelector("#fase1-bisseccao").style= "display:none"
    document.querySelector("#fase1-newton").style= "display:none"
    document.querySelector("#accordion").style= "display:none"
    document.querySelector("#resultado").style="display:none"
    document.querySelector("#calcular").style="display: block"
    document.querySelector("#form-entrada").style="display: block"
    document.querySelector("#card-parametros").style="display: none"
})

document.querySelector('#calcular').addEventListener('click', (e)=>{
    
    e.preventDefault()
    form_entrada =document.querySelector("#form-entrada")
    if(form_entrada.checkValidity()){
     aplicar()
    }else{
        form_entrada.reportValidity()
    }
})

//Refinar raiz bisseccao
document.querySelector('#refinar').addEventListener('click', (e)=>{
    
    e.preventDefault()
    form_entrada =document.querySelector("#form-f1-bisseccao")
    if(form_entrada.checkValidity()){
        refinarBisseccao()
    }else{
        form_entrada.reportValidity()
    }
})

//Refinar raiz newton
document.querySelector('#refinar-newton').addEventListener('click', (e)=>{
    
    e.preventDefault()
    form_entrada =document.querySelector("#form-f1-newton")
    if(form_entrada.checkValidity()){
        refinarNeewton()
    }else{
        form_entrada.reportValidity()
    }
})

document.querySelector("#intervalo-newton").addEventListener('change', (e)=>{
    intrv = document.querySelector("#intervalo-newton").value.split(',')
    chute = document.querySelector("#chute")
    chute.min = intrv[0]
    chute.max =  intrv[1]
    chute.value = (parseFloat(intrv[0])+parseFloat(intrv[1]))/2
})

function refinarNeewton(){
    document.querySelector("#fase1-newton").style= "display:none"
    document.querySelector("#accordion").style= "display:block"
    chute_inicial = chute.value
    executarNewton(funcao, chute_inicial, epsilon, max_it)
}

function refinarBisseccao(){
    document.querySelector("#fase1-bisseccao").style= "display:none"
    document.querySelector("#accordion").style= "display:block"
    intervalo = document.querySelector("#intervalo").value.split(',');
    
    executarBisseccao(funcao, intervalo, epsilon, max_it)
}

document.querySelector('#funcao-input').addEventListener('focusin', ()=>{help_funcao.style="display:block"})
document.querySelector('#funcao-input').addEventListener('focusout', ()=>{help_funcao.style="display:none"})

document.querySelector('#epsilon').addEventListener('focusin', ()=>{help_epsilon.style="display:block"})
document.querySelector('#epsilon').addEventListener('focusout', ()=>{help_epsilon.style="display:none"})

document.querySelector('#iteracoes').addEventListener('focusin', ()=>{help_iteracoes.style="display:block"})
document.querySelector('#iteracoes').addEventListener('focusout', ()=>{help_iteracoes.style="display:none"})

function aplicar(){
    
    document.querySelector("#form-entrada").style="display: none"
    document.querySelector("#resetar").style="display: block"
    document.querySelector("#calcular").style="display: none"

    funcao = document.querySelector("#funcao-input").value;
    epsilon = document.querySelector("#epsilon").value;
    max_it = document.querySelector("#iteracoes").value;
    metodo = document.querySelector("input[name='metodos']:checked").value;
    
    preencher_card_parametros(funcao, epsilon, max_it, metodo)
    document.querySelector("#card-parametros").style="display: block"

    intervalos = restringir(funcao)
    console.log(intervalos)
    if(metodo ===  'bisseccao'){
        document.querySelector("#fase1-bisseccao").style= "display:block"
        document.querySelector("#intervalo").innerHTML = ''
        intervalos.forEach(element => {
            opt_el = document.createElement('OPTION')
            opt_el.value = element
            opt_el.innerText = '[ ' +element + ' ]'
            document.querySelector("#intervalo").appendChild(opt_el)
        });

        
        
    }else{
        document.querySelector("#chute").value = ''
        document.querySelector("#fase1-newton").style= "display:block"
        document.querySelector("#intervalo-newton").innerHTML = ''
        intervalos.forEach(element => {
            opt_el = document.createElement('OPTION')
            opt_el.value = element
            opt_el.innerText = '[ ' +element + ' ]'
            document.querySelector("#intervalo-newton").appendChild(opt_el)
        });

        

    }
}

function executarBisseccao(funcao, intervalo, epsilon, max_it){

    retorno = bisseccao(funcao, intervalo, epsilon, max_it)
    console.log(retorno[1])

    tableHead = document.querySelector("#table-head")
    tableHead.innerHTML = ''
    el =  document.createElement("tr")
    el.innerHTML=
    `
    <th>a</th>
    <th>b</th>
    <th>x_</th>
    <th>f(x_)</th>
    `
    tableHead.appendChild(el)

    tableBody = document.querySelector("#table-body")
    tableBody.innerHTML = ''
    
    retorno[1].forEach(element => {
        el = document.createElement('tr')
        el.innerHTML= 
        `<td scope="row">${element.a}</td>
        <td>${element.b}</td>
        <td>${element.x_linha}</td>
        <td>${element.fx_linha}</td>
        `
        tableBody.appendChild(el)
    });
    document.querySelector("#resultado").style =  "display:block";
    document.querySelector("#resultado").innerHTML = 'x_ = ' + retorno [0]

}

function executarNewton(funcao, pos_inicial, erro, it_max){

    retorno = newton(funcao, pos_inicial, erro, it_max)
    console.log(retorno[1])

    tableHead = document.querySelector("#table-head")
    tableHead.innerHTML= ''
    el =  document.createElement("tr")
    el.innerHTML=
    `
    <th>k</th>
    <th>x_</th>
    <th>f(x_)</th>
    `
    tableHead.appendChild(el)

    tableBody = document.querySelector("#table-body")
    tableBody.innerHTML = ''
    retorno[1].forEach((element, index) => {
        el = document.createElement('tr')
        el.innerHTML= 
        `<td scope="row">${index}</td>
        <td>${element.x_linha}</td>
        <td>${element.fx_linha}</td>
        `
        tableBody.appendChild(el)
    });
    document.querySelector("#resultado").style =  "display:block";
    document.querySelector("#resultado").innerHTML = 'x_ = ' + retorno [0]

}

function preencher_card_parametros(funcao, epsilon, max_it, metodo){

    card_body =  document.querySelector("#card-body-parametros")
    card_body.innerHTML = ''
    
    p = document.createElement('p');
    p.innerHTML = "Função: f(x)=" + funcao
    card_body.appendChild(p)

    p = document.createElement('p');
    p.innerHTML = "Épsilon: " + epsilon
    card_body.appendChild(p)

    p = document.createElement('p');
    p.innerHTML = "Máximo de iterações: " + max_it
    card_body.appendChild(p)

    p = document.createElement('p');
    p.innerHTML = "Método: " + metodo
    card_body.appendChild(p)

}