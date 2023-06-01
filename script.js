let rows = document.getElementById("rows-input")
let cols = document.getElementById("cols-input")
let okBtn = document.getElementById("ok-btn")
let mazeDiv = document.getElementById("maze-div")
let copyBtn = document.getElementById("copy-btn")
let dnBtn = document.getElementById("dn-btn")
let nameInput = document.getElementById("name-input")
let body = document.getElementById("body")
let active = false;
var mazeRows = []
body.addEventListener("mousedown",()=>{
    active = true;
})
body.addEventListener("mouseup",()=>{
    active = false;
})
okBtn.addEventListener("click",()=>{

    while (mazeDiv.firstChild) {
        mazeDiv.removeChild(mazeDiv.lastChild);
      }
    
    for (let i = 0;i<parseInt(rows.value);i++){
        let arr = []
        for(let j = 0;j<parseInt(cols.value);j++){
            let cel = document.createElement('input')
            cel.type = "text"
            cel.classList.add('maze-cell')
            cel.style.width = "100%"
            cel.style.height = "100%"
            cel.style.background = "red"
            cel.style.boxSizing: "border-box"
            cel.addEventListener("mouseover",()=>{
                if(active){
                    if(cel.style.backgroundColor == "red"){
                        cel.style.backgroundColor = "grey"
                        cel.style.border = "black 1px solid"
                    }
                    // else{
                    //     cel.style.backgroundColor = "grey"
                    // }
                    // if(cel.value == "G"){
                    //     cel.style.backgroundColor = "yellow"
                    // }
                    // else if(cel.value == "S"){
                    //     cel.style.backgroundColor = "green"
                    // }
                }
                    
            })
            cel.addEventListener("mousedown",()=>{
                if(cel.style.backgroundColor == "red"){
                    cel.style.backgroundColor = "grey"
                    cel.style.border = "black 1px solid"
                }
                else if(cel.style.backgroundColor == "grey"){
                    cel.style.backgroundColor = "red"
                    cel.style.border = "none"
                }
            })
            // cel.addEventListener("click",()=>{
            //     if(cel.style.backgroundColor == "red"){
            //         cel.style.backgroundColor = "grey"
            //     }
            //     else if(cel.style.backgroundColor == "grey"){
            //         cel.style.backgroundColor = "red"
            //     }
                
            // })
            cel.addEventListener("change",()=>{
                if(cel.value == "G"){
                    cel.style.backgroundColor = "yellow"
                }
                else if(cel.value == "S"){
                    cel.style.backgroundColor = "green"
                }
                else{
                    cel.style.backgroundColor = "red"
                }   
            })
            arr.push(cel)
        }
        mazeRows.push(arr)
    }
    
    
    mazeRows.forEach(row => {
        let rowDiv = document.createElement('div')
        rowDiv.classList.add('row-div')
        rowDiv.style.width = "100%"
        rowDiv.style.height = (100.0/(parseInt(rows.value)))+"%"
        
        row.forEach(cel => {
            rowDiv.appendChild(cel)
            
        })
        mazeDiv.appendChild(rowDiv)    
    });
    
    
    
})

var s = ""
dnBtn.addEventListener("click",()=>{
    parseMaze()
    dwn(nameInput.value+".mz",s)
    console.log(s)
})

copyBtn.addEventListener("click",()=>{
    parseMaze()
    navigator.clipboard.writeText(s)
})

function parseMaze(){
    s = rows.value+"x"+cols.value 
    mazeRows.forEach(row => {
        s += "\n"
        row.forEach(cel =>{
            if(cel.style.backgroundColor == "red"){
                s+="#"
            }
            else if(cel.style.backgroundColor == "grey"){
                s+=" "
            }
            else if(cel.value == "G"){
                s+="G"
            }
            else if(cel.value == "S"){
                s+="S"
            }
        })
        
    }) 
}

function dwn(fn, t) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(t));
    element.setAttribute('download', fn);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);}
