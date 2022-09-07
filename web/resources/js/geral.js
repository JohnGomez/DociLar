//------------------------------------------------------------------------------------------------------------
// Função para não permitir entrada texto.
// Exemplo: <h:inputText onkeydown="return campoLeitura(event);" onkeypress="return campoLeitura(event);" />
// Colocar no atributo onkeypress e onkeypress do botão.
//------------------------------------------------------------------------------------------------------------
function campoLeitura(e) {

    var keychar;
    if (window.event) { // IE
        keychar = e.keyCode;
    } else if (e.which || e.which == 0) { // Netscape/Firefox/Opera
        keychar = e.which;
    }
    if (keychar == 0 || keychar == 9 || keychar == 13) {
        return true;
    } else {
        return false;
    }
}

function getAllElementsByName(tag, name) {
    var elems = document.getElementsByTagName(tag);
    var arr = new Array();

    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];

        if (elem.getAttribute('name') == name) {
            arr.push(elem);
        }
    }
    return arr;
}

function lovChamada(arg0) {
    var str = null;
    var lovParam = 'lovCall=true';
    if (arg0.indexOf('?') == -1)
        str = arg0 + '?' + lovParam;
    else
        str = arg0 + '&' + lovParam;

    var altura = 745; //420
    var largura = 745; //701
    var x = parseInt((screen.width - largura) / 2);
    var y = parseInt((screen.height - altura) / 2);
    var win = window.open(str, 'lov', 'width=' + largura + ',height=' + altura + 'top=0,left=0,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,copyhistory=no');
    win.moveTo(x, y);
//window.open(str,'popup','width=701,height=420,top=0,left=0,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=auto,resizable=no,copyhistory=no');
}

function SomenteNumero(e) {
    var tecla = (window.event) ? event.keyCode : e.which;
    if ((tecla > 47 && tecla < 58) || (tecla > 95 && tecla < 106))
        return true; // numeros de 0 a 9    
    else {
        if (tecla != 8) {
            alert("Você pode digitar somente números neste Campo.");
            e.value = "";
            return false; //backspace
        }
        else
            return true;
    }
}

function SomenteLetras(e) {
    var tecla = (window.event) ? event.keyCode : e.which;
    //alert(tecla);
    //return;
    if (tecla > 65 && tecla < 90) // LETRAS MAIUSCULAS
        return true;
    else
    if (tecla >= 97 && tecla <= 122) // LETRAS MINUSCULAS
        return true;
    {
        if (tecla != 32) // barra de espaço
            return false;
        else
            return true;
        if (tecla != 8) // backspace
            return false;
        else
            return true;
    }
}

function notEspecialSomLetras(campo) {
    var x = campo;
    c1 = x.value;

    var charpos = c1.search("[^A-Za-z-ç-Ç ]");
    if (c1.length > 0 && charpos >= 0)
    {
        alert("Você não pode digitar acentos, caracteres especiais e números neste Campo.");
        campo.value = c1.substring(charpos, "");
        return false;
    }
    return true;
}





//--------------------

/**  
 * Função Principal 
 * @param w - O elemento que será aplicado (normalmente this).
 * @param e - O evento para capturar a tecla e cancelar o backspace.
 * @param m - A máscara a ser aplicada.
 * @param r - Se a máscara deve ser aplicada da direita para a esquerda. Veja Exemplos.
 * @param a - 
 * @returns null
 *
 * EX.:
 * CPF: onkeyup="maskIt(this,event,'###.###.###-##')"
 * Telefone: onkeyup="maskIt(this,event,'(##)####-####')"
 * Dinheiro: onkeyup="maskIt(this,event,'###.###.###,##',true,{pre:'R$'})"
 * Graus: onkeyup="maskIt(this,event,'###,#',true,{pre:'',pos:'�'})"
 */
function maskIt(w, e, m, r, a) {

    // Cancela se o evento for Backspace
    if (!e)
        var e = window.event
    if (e.keyCode)
        code = e.keyCode;
    else if (e.which)
        code = e.which;

    // Variáveis da função
    var txt = (!r) ? w.value.replace(/[^\d]+/gi, '') : w.value.replace(/[^\d]+/gi, '').reverse();
    var mask = (!r) ? m : m.reverse();
    var pre = (a) ? a.pre : "";
    var pos = (a) ? a.pos : "";
    var ret = "";

    if (code == 9 || code == 8 || txt.length == mask.replace(/[^#]+/g, '').length)
        return false;

    // Loop na máscara para aplicar os caracteres
    for (var x = 0, y = 0, z = mask.length; x < z && y < txt.length; ) {
        if (mask.charAt(x) != '#') {
            ret += mask.charAt(x);
            x++;
        } else {
            ret += txt.charAt(y);
            y++;
            x++;
        }
    }

    // Retorno da função
    ret = (!r) ? ret : ret.reverse()
    w.value = pre + ret + pos;
}

// Novo método para o objeto 'String'
String.prototype.reverse = function() {
    return this.split('').reverse().join('');
}
//--------------------


//valida o CPF digitado
function ValidarCPF(Objcpf) {
    var CPF = Objcpf.value; // Recebe o valor digitado no campo
    exp = /\.|\-/g
    CPF = CPF.toString().replace(exp, "");

    // Aqui começa a checagem do CPF
    var POSICAO, I, SOMA, DV, DV_INFORMADO;
    var DIGITO = new Array(10);
    DV_INFORMADO = CPF.substr(9, 2); // Retira os dois últimos dígitos do número informado

    // Desemembra o número do CPF na array DIGITO
    for (I = 0; I <= 8; I++) {
        DIGITO[I] = CPF.substr(I, 1);
    }

    // Calcula o valor do décimo dígito da verificação
    POSICAO = 10;
    SOMA = 0;
    for (I = 0; I <= 8; I++) {
        SOMA = SOMA + DIGITO[I] * POSICAO;
        POSICAO = POSICAO - 1;
    }
    DIGITO[9] = SOMA % 11;
    if (DIGITO[9] < 2) {
        DIGITO[9] = 0;
    }
    else {
        DIGITO[9] = 11 - DIGITO[9];
    }

    // Calcula o valor do décimo primeiro dígito da verificação
    POSICAO = 11;
    SOMA = 0;
    for (I = 0; I <= 9; I++) {
        SOMA = SOMA + DIGITO[I] * POSICAO;
        POSICAO = POSICAO - 1;
    }
    DIGITO[10] = SOMA % 11;
    if (DIGITO[10] < 2) {
        DIGITO[10] = 0;
    }
    else {
        DIGITO[10] = 11 - DIGITO[10];
    }

    // Verifica se os valores dos dígitos verificadores conferem
    DV = DIGITO[9] * 10 + DIGITO[10];
    if (DV != DV_INFORMADO && CPF != "___________") {
        alert('CPF invalido - ' + CPF);
        Objcpf.value = '';
        Objcpf.focus();
        return false;
    }
}

//valida telefone
function ValidaTelefone(ObjTel) {
    tel = ObjTel.value;
    exp = /\(\d{2}\)\d{4}\-\d{4}/
    if (!exp.test(tel) && tel != "________") {
        alert("Informar o DDD! \n\nFavor inserir o telefone no formato: (XX)XXXX-XXXX");
        ObjTel.value = '';
        ObjTel.focus();
    }
}

//valida CEP
function ValidaCep(cep) {
    exp = /\d{2}\.\d{3}\-\d{3}/
    if (!exp.test(cep.value))
        alert('Numero de Cep Inválido!');
}

//transforma string para maiúscula
function Maiuscula(Object) {
    var palavra = Object.value;
    Object.value = palavra.toUpperCase();
}

//transforma string para minúscula
function Minuscula(Object) {
    var palavra = Object.value;
    Object.value = palavra.toLowerCase();
}

//Valida data
function validaData(campo, valor) {
    var date = valor;
    var ardt = new Array;
    var ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
    ardt = date.split("/");
    erro = false;
    if (date.search(ExpReg) == -1) {
        erro = true;
    }
    else if (((ardt[1] == 4) || (ardt[1] == 6) || (ardt[1] == 9) || (ardt[1] == 11)) && (ardt[0] > 30))
        erro = true;
    else if (ardt[1] == 2) {
        if ((ardt[0] > 28) && ((ardt[2] % 4) != 0))
            erro = true;
        if ((ardt[0] > 29) && ((ardt[2] % 4) == 0))
            erro = true;
    }
    if (erro && valor != "________") {
        alert("\"" + valor + "\" não é uma data válida! \n\nFavor inserir a data no formato: dd/mm/aaaa");
        campo.focus();
        campo.value = "";
        return false;
    }
    return true;
}

//------------------------------------------------------
//Fun��es para verificar o email
function checkMail(Object) {
    var email = Object.value;
    if (!is_email(email) && email != "") {
        alert("Email inválido");
        Object.value = "";
        Object.focus();
    }
}

function is_email(email) {
    er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;

    if (er.exec(email) && email != "") {
        return true;
    } else {
        return false;
    }

    function retirarAcento(objResp) {
        var varString = new String(objResp.value);
        var stringAcentos = new String('àâêôûãõáéíóúçüÀÂÊÔÛÃÕÁÉÍÓÚÇÜ');
        var stringSemAcento = new String('aaeouaoaeioucuAAEOUAOAEIOUCU');

        var i = new Number();
        var j = new Number();
        var cString = new String();
        var varRes = '';

        for (i = 0; i < varString.length; i++) {
            cString = varString.substring(i, i + 1);
            for (j = 0; j < stringAcentos.length; j++) {
                if (stringAcentos.substring(j, j + 1) == cString) {
                    cString = stringSemAcento.substring(j, j + 1);
                }
            }
            varRes += cString;
        }
        objResp.value = varRes;
    }
}
//----------------------------------------------------------
function notEspPont(campo)
{
    var x = campo;
    c1 = x.value;

    var charpos = c1.search("[^A-Za-z-0-9- ]");
    if (c1.length > 0 && charpos >= 0)
    {
        alert("Você não pode digitar [Caracteres especiais] e [Pontos] neste Campo.");
        campo.value = c1.substring(charpos, "");
        return false;
    }
}

function retirarAcento(objResp) {  
    var varString = new String(objResp.value);  
    var stringAcentos = new String('áàâãäéèêëíìïóòôõöúùûüÁÀÂÃÄÉÈÊËÍÌÏÓÒÔÕÖÚÙÛÜ');  
  var stringSemAcento = new String('aaaaaeeeeiiiooooouuuuAAAAAEEEEIIIOOOOOUUUU');  
  
    var i = new Number();  
    var j = new Number();  
    var cString = new String();  
    var varRes = '';  
  
    for (i = 0; i < varString.length; i++) {  
        cString = varString.substring(i, i + 1);  
        for (j = 0; j < stringAcentos.length; j++) {  
            if (stringAcentos.substring(j, j + 1) == cString){  
                cString = stringSemAcento.substring(j, j + 1);  
            }  
        }  
        varRes += cString;  
    }  
    objResp.value = varRes;  
} 

function notEspecial(campo){
    var x = campo;
    c1 = x.value;

    var charpos = c1.search("!@#$%¨&*()-_+=§¬¢£³²¹/\|?;:.,><]}~^ºª[{´`");
    if(c1.length > 0 &&  charpos >= 0)
    {
        alert("Você não pode digitar [Carácteres especiais] e [Números] neste Campo.");
        campo.value =  c1.substring(charpos, "");
        return false;
    }
    return true;
}

function money(campo)
{
    var x = campo;
    c1 = x.value;

    var charpos = c1.search("[^0-9-.-, ]");
    if (c1.length > 0 && charpos >= 0)
    {
        alert("Você não pode digitar Letras e virgulas neste Campo.");
        campo.value = c1.substring(charpos, "");
        return false;
    }
}

function retirarAcento(objResp) {
    var varString = new String(objResp.value);
    var stringAcentos = new String('áàâãäéèêëíìïóòôõöúùûüÁÀÂÃÄÉÈÊËÍÌÏÓÒÔÕÖÚÙÛÜ');
    var stringSemAcento = new String('aaaaaeeeeiiiooooouuuuAAAAAEEEEIIIOOOOOUUUU');

    var i = new Number();
    var j = new Number();
    var cString = new String();
    var varRes = '';

    for (i = 0; i < varString.length; i++) {
        cString = varString.substring(i, i + 1);
        for (j = 0; j < stringAcentos.length; j++) {
            if (stringAcentos.substring(j, j + 1) == cString) {
                cString = stringSemAcento.substring(j, j + 1);
            }
        }
        varRes += cString;
    }
    objResp.value = varRes;
}

function notEspecial(campo) {
    var x = campo;
    c1 = x.value;

    var charpos = c1.search("!@#$%¨&*()-_+=§¬¢£³²¹/\|?;:.,><]}~^ºª[{´`");
    if (c1.length > 0 && charpos >= 0)
    {
        alert("Você não pode digitar [Carácteres especiais] e [Números] neste Campo.");
        campo.value = c1.substring(charpos, "");
        return false;
    }
    return true;
}

function moeda(z) {
    v = z.value;
    v = v.replace(/\D/g, ""); // permite digitar apenas numero 
    v = v.replace(/(\d{1})(\d{17})$/, "$1.$2"); // coloca ponto antes dos ultimos digitos 
    v = v.replace(/(\d{1})(\d{13})$/, "$1.$2"); // coloca ponto antes dos ultimos 13 digitos 
    v = v.replace(/(\d{1})(\d{10})$/, "$1.$2"); // coloca ponto antes dos ultimos 10 digitos 
    v = v.replace(/(\d{1})(\d{7})$/, "$1.$2"); // coloca ponto antes dos ultimos 7 digitos 
    v = v.replace(/(\d{1})(\d{1,4})$/, "$1.$2"); // coloca virgula antes dos ultimos 4 digitos 
    z.value = v;
}

function formatamoney(c) {
    var t = this;
    if (c == undefined)
        c = 2;
    var p, d = (t = t.split("."))[1].substr(0, c);
    for (p = (t = t[0]).length; (p -= 3) >= 1; ) {
        t = t.substr(0, p) + "." + t.substr(p);
    }
    return t + "," + d + Array(c + 1 - d.length).join(0);
}

function soNumeros(v) {
    return v.replace(/\D/g, "");
}

function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1);
}

function execmascara() {
    v_obj.value = v_fun(v_obj.value);
}


String.prototype.formatCurrency = formatamoney

function demaskvalue(valor, currency) {
    /* 
     * Se currency é false, retorna o valor sem apenas com os números. Se é true, os dois últimos caracteres são considerados as 
     * casas decimais 
     */
    var val2 = '';
    var strCheck = '0123456789';
    var len = valor.length;
    if (len == 0) {
        return 0.00;
    }

    if (currency == true) {
        /* Elimina os zeros à esquerda
         * a variável <i> passa a ser a localização do primeiro caractere após os zeros e 
         * val2 contém os caracteres (descontando os zeros à esquerda) 
         */

        for (var i = 0; i < len; i++)
            if ((valor.charAt(i) != '0') && (valor.charAt(i) != ','))
                break;

        for (; i < len; i++) {
            if (strCheck.indexOf(valor.charAt(i)) != -1)
                val2 += valor.charAt(i);
        }

        if (val2.length == 0)
            return "0.00";
        if (val2.length == 1)
            return "0.0" + val2;
        if (val2.length == 2)
            return "0." + val2;

        var parte1 = val2.substring(0, val2.length - 2);
        var parte2 = val2.substring(val2.length - 2);
        var returnvalue = parte1 + "." + parte2;
        return returnvalue;

    }
    else {
        /* currency é false: retornamos os valores COM os zeros à esquerda, 
         * sem considerar os últimos 2 algarismos como casas decimais 
         */
        val3 = "";
        for (var k = 0; k < len; k++) {
            if (strCheck.indexOf(valor.charAt(k)) != -1)
                val3 += valor.charAt(k);
        }
        return val3;
    }
}

function reais(obj, event) {

    var whichCode = (window.Event) ? event.which : event.keyCode;
    /* 
     Executa a formatação após o backspace nos navegadores !document.all 
     */
    if (whichCode == 8 && !documentall) {
        /* 
         Previne a ação padrão nos navegadores 
         */
        if (event.preventDefault) { //standart browsers 
            event.preventDefault();
        } else { // internet explorer 
            event.returnValue = false;
        }
        var valor = obj.value;
        var x = valor.substring(0, valor.length - 1);
        obj.value = demaskvalue(x, true).formatCurrency();
        return false;
    }
    /* 
     Executa o Formata Reais e faz o format currency novamente após o backspace 
     */
    FormataReais(obj, '.', ',', event);
}