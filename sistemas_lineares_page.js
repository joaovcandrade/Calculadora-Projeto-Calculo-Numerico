document.querySelector("#aplicar-dimensao").addEventListener('click', ()=>{
    create_table(document.getElementById('dimensao').value)
})

document.getElementById("calcular").addEventListener('click', ()=>{
    areatable = document.querySelector('#table-area');
    trs = areatable.querySelectorAll('tbody > tr');
    a = []
    b = []
    trs.forEach(element => {
        inputs = element.querySelectorAll('input')
        line = []
        inputs.forEach(el =>{
            line.push(el.value)
        })

        b.push(line.pop())
        a.push(line)

    });
    console.log(a,b)
    opt = document.querySelector('input[name="exampleRadios"]:checked').value
    switch(opt){
        case 'gauss':
            metodo = eliminacao_de_gauss(a, b)
            break;
        case 'lu':
            metodo = fatoracao_lu(a, b)
            break;
        case 'jacobi':
            metodo = jacobi('0.05', a, b, '1')
            break;
        case 'seidel':
            metodo = seidel('0.05', a, b, '1')
            break;
        default:
            alert('erro');
    }
 
    
    resolucaoarea = document.querySelector('#resolucao-area')

    metodo['memoria'].forEach(elemento =>{
        span = document.createElement('span')

                
            span.innerHTML += elemento + '<br>'
                
            

        resolucaoarea.appendChild(span)
        resolucaoarea.appendChild(document.createElement('hr'))
    })
})

function create_table(dimension){
    table = document.createElement('table');
    table.className = "table";
    table.innerHTML =  
    `
        <thead>
            <tr>
                ${(()=>{
                    ths = ''
                    for(i=0; i< dimension; i++){
                        ths += `<th>X${i}</th>`
                    }
                    ths += `<th>b</th>`
                    return ths
                })()}
            </tr>
        </thead>

        <tbody>
            ${(()=>{
                trs = ''
                for(i=0; i< dimension; i++){
                    trs += `
                    <tr>
                        ${(()=>{
                            tds= ''
                            for(j=0; j< dimension; j++){
                                tds += '<td><input type="text" class="input-number form-control" value=0></td>'
                            }
                            tds += '<td><input type="text" class="input-number form-control" value=0></td>'
                            return tds
                        })()}
                    </tr>`
                } 
                return trs
            })()}
        </tbody>
    `
    document.querySelector('#table-area').appendChild(table)
    
}