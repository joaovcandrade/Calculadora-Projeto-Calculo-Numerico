document.querySelector("#aplicar-dimensao").addEventListener('click', ()=>{
    document.querySelector('#definicao').style.display="none";
    document.querySelector('#x').style.display="block";
    document.querySelector('#calcular').style.display="inline";
    document.querySelector('#resetar').style.display="inline";
    create_table(document.getElementById('dimensao').value)
})

document.getElementById("resetar").addEventListener('click', ()=>{
    document.location.reload()
})

document.getElementById("calcular").addEventListener('click', ()=>{
    areatable = document.querySelector('#table-area');
    trs = areatable.querySelectorAll('tbody > tr');
    x = []
    y = []
    trs.forEach(element => {
        inputs = element.querySelectorAll('input')
        line = []
        inputs.forEach(el =>{
            line.push(el.value)
        })
        
        y.push(line.pop())
        x.push(line.pop())

    });

    opt = document.querySelector('input[name="exampleRadios"]:checked').value
    x_val = document.querySelector('#x-valor').value
    switch(opt){
        case 'lagrange':
            metodo = lagrange(x, y, x_val)
            break;
        case 'newton':
            metodo = newton(x, y, x_val)
             break;
        default:
            alert('erro');
    }
 
    
    resolucaoarea = document.querySelector('#resolucao-area')
    resolucaoarea.innerHTML =''
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
                <th scope="col" class="text-center">X</th>
                <th scope="col" class="text-center">y</th>
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
                            for(j=0; j<1; j++){
                                tds += `<td><input type="text" class="input-number form-control" id='td-${i}-${j}' value=0></td>`
                            }
                            tds += `<td><input type="text" class="input-number form-control" id='td-${i}' value=0></td>`
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