//FUNCION PARA ENCRIPTAR TEXTO
function encriptar(texto){
    texto = unescape(encodeURIComponent(texto));
    var newTexto = '', char, nextChar, combinedCharCode;
    
    for (var i = 0; i < texto.length; i += 2){
        char = texto.charCodeAt(i);

        if ((i + 1) < texto.length){
            nextChar = texto.charCodeAt(i + 1) - 31;

            combinedCharCode = char + "" + nextChar.toLocaleString('en',{minimumFractionDigits: 2});
        
            newTexto += String.fromCharCode(parseInt(combinedCharCode, 10));
        } else {
            newTexto += texto.charAt(i);
        }
    }
    return newTexto.split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(4,"0"),"");
}

//FUNCION PARA DESENCRIPTAR TEXTO

function desencriptar(texto){
    var newTexto = '', char, codeStr, firstCharCode, lastCharCode;
    texto = texto.match(/.{1,4}/g).reduce((acc,char)=>acc+String.fromCharCode(parseInt(char, 16)),"");
    
    for(var i = 0; i < texto.length; i++){
        char = texto.charCodeAt(i);

        if (char > 132) {
            codeStr = char.toString(10);

            firstCharCode = parseInt(codeStr.substring(0, codeStr.length - 2),10);
            lastCharCode = parseInt(codeStr.substring(codeStr.length - 2, codeStr.length),10) + 31;
            newTexto += String.fromCharCode(firstCharCode) + String.fromCharCode(lastCharCode);
        } else {
            newTexto += texto.charAt(i);
        }
    }
    return newTexto;
}

//asignar nuevo mensaje de encriptado
function asignarTextoElementos(elemento,texto) {
    let elementoHTML = document.getElementById(elemento,);
    elementoHTML.innerHTML = texto;
    return;
}

// FUNCIONES PARA RELACIONAR HTML CON LAS FUNCIONES DE ENCRIPTAR Y DESENCRIPTAR 
function encriptarTexto(){
    const texto = document.getElementById('ingresarTexto').value;

    if (texto.trim() === ""){
        alert("Por favor, introduce un texto en el campo")
    } else {
        var textoEncriptado = encriptar(texto);
        document.getElementById("mostrarTexto").value = textoEncriptado;
        asignarTextoElementos('mensaje','Texto Encriptado');
    }
    
    return
}

function desencriptarTexto(){
    const texto = document.getElementById('ingresarTexto').value;

    if (texto.trim() === ""){
        alert("Por favor, introduce un texto en el campo")
    }
    var textoDesencriptado = desencriptar(texto);
    document.getElementById('mostrarTexto').value = textoDesencriptado;
    asignarTextoElementos('mensaje','Texto Desencriptado');
    return
}

// FUNCION COPIAR TEXTO
function copiarTexto(){
    var texto = document.getElementById('mostrarTexto').value;
    
    if (texto.trim() !== ""){
        document.getElementById("mostrarTexto").select();
        document.execCommand('copy');
        alert("Texto copiado en portapapeles");
    }
    return
}
// LIMPIAR TEXTAREA
function limpiar(){
    document.querySelector('#mostrarTexto').value = '';
    document.querySelector('#ingresarTexto').value = '';
    asignarTextoElementos('mensaje','...');
}

