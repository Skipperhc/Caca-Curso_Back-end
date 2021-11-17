class Curso
{
    constructor(nome, link, temaPrincipal, urlImagem, keywords, descricao, provider)
    {
        this.nome = nome;
        this.link = link;
        this.temaPrincipal = decodeURIComponent(temaPrincipal.replace('curso','').replace('course','')).trim();
        this.urlImagem = urlImagem;
        this.keywords = keywords;
        this.descricao = descricao;
        this.provider = provider;
    };
}

module.exports = Curso;