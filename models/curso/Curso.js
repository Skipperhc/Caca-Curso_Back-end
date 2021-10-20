class Curso
{
    constructor(nome, link, temaPrincipal, urlImagem, keywords)
    {
        this.nome = nome;
        this.link = link;
        this.temaPrincipal = temaPrincipal;
        this.urlImagem = urlImagem;
        this.keywords = keywords;
        this.likes = likes;
        this.dislikes = dislikes;
    };
}

module.exports = Curso;