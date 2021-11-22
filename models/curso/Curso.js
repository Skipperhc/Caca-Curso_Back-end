class Curso
{
    constructor(nome, link, temaPrincipal, urlImagem, keywords, descricao, provider)
    {
        this.Nome = nome;
        this.Link = link;
        this.TemaPrincipal = decodeURIComponent(temaPrincipal.replace('curso','').replace('course','')).trim();
        this.UrlImagem = urlImagem;
        this.Keywords = keywords;
        this.Descricao = descricao;
        this.Provider = provider;
    };
}

module.exports = Curso;