document.querySelector("#resetar").addEventListener('click', ()=>{
    document.querySelector("#resetar").style="display: none"
    document.querySelector("#resultado").style =  "display:none";
    document.querySelector("#fase1-bisseccao").style= "display:none"
    document.querySelector("#fase1-newton").style= "display:none"
    document.querySelector("#accordion").style= "display:none"
    document.querySelector("#resultado").style="display:none"
    document.querySelector("#calcular").style="display: block"
})

document.querySelector("#calcular").addEventListener('click', (e)=>{
    e.preventDefault();
    document.querySelector("#resetar").style="display: block"
    document.querySelector("#calcular").style="display: none"

    funcao = document.querySelector("#funcao-input").value;
    epsilon = document.querySelector("#epsilon").value;
    max_it = document.querySelector("#iteracoes").value;
    metodo = document.querySelector("input[name='metodos']:checked").value;
    
    intervalos = restringir(funcao)
    console.log(intervalos)
    if(metodo ===  'bisseccao'){
        document.querySelector("#fase1-bisseccao").style= "display:block"
        document.querySelector("#intervalo").innerHTML = ''
        intervalos.forEach(element => {
            opt_el = document.createElement('OPTION')
            opt_el.value = element
            opt_el.innerText = element
            document.querySelector("#intervalo").appendChild(opt_el)
        });

        document.querySelector("#refinar").addEventListener("click", (e)=>{
            document.querySelector("#fase1-bisseccao").style= "display:none"
            document.querySelector("#accordion").style= "display:block"
            e.preventDefault();
            intervalo = document.querySelector("#intervalo").value.split(',');
            
            executarBisseccao(funcao, intervalo, epsilon, max_it)
        })
        
    }else{
        document.querySelector("#fase1-newton").style= "display:block"
        document.querySelector("#intervalo-newton").innerHTML = ''
        intervalos.forEach(element => {
            opt_el = document.createElement('OPTION')
            opt_el.value = element
            opt_el.innerText = element
            document.querySelector("#intervalo-newton").appendChild(opt_el)
        });

        intrv = document.querySelector("#intervalo-newton").value.split(',')
        chute = document.querySelector("#chute")
        chute.min = intrv[0]
        chute.max =  intrv[1]
        chute.value = (parseFloat(intrv[0])+parseFloat(intrv[1]))/2

        document.querySelector("#intervalo-newton").addEventListener('change', (e)=>{
            intrv = e.target.value.split(',')
            chute.value = (parseFloat(intrv[0])+parseFloat(intrv[1]))/2
        })

        document.querySelector("#refinar-newton").addEventListener('click', (e)=>{
            document.querySelector("#fase1-newton").style= "display:none"
            document.querySelector("#accordion").style= "display:block"
            e.preventDefault();
            chute_inicial = chute.value
            executarNewton(funcao, chute_inicial, epsilon, max_it)
        })

    }
})

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