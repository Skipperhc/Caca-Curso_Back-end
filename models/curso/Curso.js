class Curso
{
    constructor(nome, link, temaPrincipal, urlImagem, keywords)
    {
        this.nome = nome;
        this.link = link;
        this.temaPrincipal = decodeURIComponent(temaPrincipal.replace('curso','').replace('course',''));
        this.urlImagem = urlImagem;
        this.keywords = keywords;
    };
}

module.exports = Curso;