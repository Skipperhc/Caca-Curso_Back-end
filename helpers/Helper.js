class Helper
{
    static GetLength(array)
    {
        return Object.keys(array).length;
    }

    static RemoveSpecialChars(txt)
    {
        return txt.replace(/[`~!@$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') //remove qualquer caracter que não seja letra ou numero        
        .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2'); //remove espaços no começo e no fim
    }

    static ToKeyWords(txt)
    {
        txt = this.RemoveSpecialChars(txt);

        txt = txt.replace(/\s/g, '-'); //remove espaços em branco e adiciona -

        return txt;
    }
}

module.exports =  Helper;