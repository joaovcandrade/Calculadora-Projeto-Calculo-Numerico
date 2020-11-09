document.querySelector("#aplicar-dimensao").addEventListener('click', ()=>{
    create_table(document.getElementById('dimensao').value)
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

    switch(opt){
        case 'lagrange':
            metodo = lagrange(x, y, 1)
            break;
        case 'newton':
            metodo = newton(x, y, 1)
             break;
        default:
            alert('erro');
    }
 
    
    resolucaoarea = document.querySelector('#resolucao-area')

    metodo['memoria'].forEach(elemento =>{
        span = document.createElement('span')

                Object.keys(elemento).forEach(el =>{
                    span.innerHTML += elemento[el] + '<br>'
                })
            

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