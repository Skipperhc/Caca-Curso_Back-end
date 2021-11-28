const models = require('../models');
const Sequelize = require('sequelize');

//Pedro ==================================================================================================================================================================================================================

const Curso = require('../models/Curso')
const axios = require('axios');
const h = require('../helpers/Helper');
const dbCurso = require('../db/dbCurso');

const keyRapidAPI = 'be85f3e96dmsh0865f88454bdfcfp1f1851jsn3d9c71f1ec71';
const basicUdemyHeader = 'Basic a3I0aVcyaE9paHdRV0hDV1Q2Vnd2OWs2aElVZUhGWVFpZmJ2QTY3SjoySE1zZnhER2tMbWQzamxYYzN0V2dPQjJsQ1hBQ0hjUThJdkwzcjlnTnlPTTdyRDNaemdCR0pCNGZLSDVaUFRHS3RzOFQyMXE3R1NuMkJZekdReEh4MHhDa1RGNEJSTzZRaURXbFMxMlhod0cxWXB4eWxOdG9BNmpjZFRLS1FGQQ==';

function urlWebSearch(termo) {
    return 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=' + termo + '&pageNumber=1&pageSize=10&autoCorrect=true';
}

function urlGoogleSearch(termo) {
    return 'https://google-search3.p.rapidapi.com/api/v1/search/q=' + termo + '&num=10';
}

function urlBingSearch(termo) {
    return 'https://bing-web-search1.p.rapidapi.com/search?q=' + termo + '&mkt=pt-br&safeSearch=Off&textFormat=Raw&cc=br&setLang=pt';
}

function urlUdemySearch(termo) {
    return 'https://www.udemy.com/api-2.0/courses?search=' + termo + '&language=pt&page_size=10';
}

async function GetKeyWordsAzure(listaCursos) {

    let lstKeywords = [];

    for (let index = 0; index < listaCursos.length; index++) {
        const curso = listaCursos[index];

        lstKeywords.push({ id: curso.Link, language: "pt", text: curso.Descricao });
    }

    var config = {
        method: 'post',
        url: 'https://trabalhocacacurso.cognitiveservices.azure.com/text/analytics/v3.1/keyPhrases',
        headers: {
            'Ocp-Apim-Subscription-Key': '494981359df94d9f9bf01ed61d78d3ce',
            'Content-Type': 'application/json'
        },
        data: {
            documents: lstKeywords
        }
    };

    lstKeywords = [];

    await axios(config).then(function (response) {

        if (response.status == 200) {
            let resposta = response.data;

            let listaRespostas = resposta.documents;

            if (h.GetLength(listaRespostas) > 0) {
                for (let index = 0; index < h.GetLength(listaRespostas); index++) {
                    const retornoKeywords = listaRespostas[index];

                    let keyWords = retornoKeywords.keyPhrases;

                    let palavrasChavesCompleta = '';

                    for (let i = 0; i < keyWords.length; i++) {
                        const element = keyWords[i];


                        if (i == keyWords.length - 1) { //não adiciona traço no final
                            palavrasChavesCompleta += element
                        }
                        else {
                            palavrasChavesCompleta += element + '-';
                        }
                    }

                    lstKeywords.push({ id: retornoKeywords.id, palavras: palavrasChavesCompleta });
                }
            }
        }
    })
        .catch(function (error) {
            console.log(error);
        });

    return lstKeywords;
}

function FormatarKeywords(lstCurso, lstKeywords) {

    let lstFinal = [];

    for (let index = 0; index < lstCurso.length; index++) {
        let curso = lstCurso[index];

        const element = lstKeywords.find(x => x.id == curso.Link);

        curso.Keywords = element.palavras;

        lstFinal.push(curso);
    }

    return lstFinal;
}

async function WebSearch(pesquisa) {
    var config = {
        method: 'get',
        url: urlWebSearch(pesquisa),
        headers: {
            'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
            'x-rapidapi-key': keyRapidAPI
        }
    };

    let respostaCursos = [];

    await axios(config).then(function (response) {
        if (response.status == 200) {
            let respostaWS = response.data;

            let listaCursosWS = [];

            listaCursosWS = respostaWS.value;

            if (h.GetLength(listaCursosWS) > 0) {
                for (let index = 0; index < h.GetLength(listaCursosWS); index++) {
                    const cursoWS = listaCursosWS[index];

                    let keywords = h.ToKeyWords(cursoWS.description);

                    let curso = FormatarCurso(cursoWS.title, cursoWS.url, pesquisa, cursoWS.image.url, keywords, cursoWS.description, 'WebSearch');

                    respostaCursos.push(curso);
                }
            }
        }
    })
        .catch(function (error) {
            console.log(error);
        });

    return respostaCursos;
}

function FormatarCurso(nome, link, temaPrincipal, urlImagem, keywords, descricao, provider) {

    let tema = decodeURIComponent(temaPrincipal.replace('curso', '').replace('course', '')).trim();

    return { Nome: nome, Link: link, TemaPrincipal: tema, UrlImagem: urlImagem, Keywords: keywords, Descricao: descricao, Provider: provider }
}

async function GoogleSearch(pesquisa) {
    var config = {
        method: 'get',
        url: urlGoogleSearch(pesquisa),
        headers: {
            'x-user-agent': 'server',
            'x-rapidapi-host': 'google-search3.p.rapidapi.com',
            'x-rapidapi-key': keyRapidAPI
        }
    };

    let retornoCursos = [];

    await axios(config).then(function (response) {

        if (response.status == 200) {
            let respostaGoogle = response.data;

            let listaCursoGoogle = respostaGoogle.results;

            if (h.GetLength(listaCursoGoogle) > 0) {
                for (let index = 0; index < h.GetLength(listaCursoGoogle); index++) {
                    const cursoGoogle = listaCursoGoogle[index];

                    let keyWords = h.ToKeyWords(cursoGoogle.description);

                    let curso = FormatarCurso(cursoGoogle.title, cursoGoogle.link, pesquisa, null, keyWords, cursoGoogle.description, 'Google');

                    retornoCursos.push(curso);
                }
            }
        }
    })
        .catch(function (error) {
            console.log(error);
        });

    return retornoCursos;
}

async function BingSearch(pesquisa) {
    var config = {
        method: 'get',
        url: urlBingSearch(pesquisa),
        headers: {
            'x-bingapis-sdk': 'true',
            'x-rapidapi-host': 'bing-web-search1.p.rapidapi.com',
            'x-rapidapi-key': keyRapidAPI
        }
    };

    let respostaCurso = [];

    await axios(config).then(function (response) {

        if (response.status == 200) {
            let respostaBing = response.data;

            let cursosBing = respostaBing.webPages.value;

            if (h.GetLength(cursosBing) > 0) {
                for (let index = 0; index < h.GetLength(cursosBing); index++) {

                    const cursoBing = cursosBing[index];

                    let keyWords = h.ToKeyWords(cursoBing.snippet);

                    let curso = FormatarCurso(cursoBing.name, cursoBing.url, pesquisa, cursoBing.thumbnailUrl, keyWords, cursoBing.snippet, 'Bing');

                    respostaCurso.push(curso);
                }
            }
        }
    }).catch(function (error) {
        console.log(error);
    });

    return respostaCurso;
}

async function UdemySearch(pesquisa) {
    let urlUdemy = 'https://www.udemy.com';

    var config = {
        method: 'get',
        url: urlUdemySearch(pesquisa),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': basicUdemyHeader
        }
    };

    var retornoCursos = [];

    await axios(config).then(function (response) {

        if (response.status == 200) {
            var retornoUdemy = response.data;

            let cursosUdemy = retornoUdemy.results;

            if (h.GetLength(cursosUdemy) > 0) {
                for (let index = 0; index < h.GetLength(cursosUdemy); index++) {

                    const cursoUdemy = cursosUdemy[index];

                    let urlCursoUdemy = urlUdemy + cursoUdemy.url;

                    let keywords = h.ToKeyWords(cursoUdemy.published_title);

                    let curso = FormatarCurso(cursoUdemy.title, urlCursoUdemy, pesquisa, cursoUdemy.image_480x270, keywords, cursoUdemy.headline, 'Udemy');

                    retornoCursos.push(curso);
                }
            }
        }
    })
        .catch(function (error) {
            console.log(error);
        });

    return retornoCursos;
}

async function PesquisarCursos(pesquisa) {

    if (pesquisa == undefined || pesquisa == '') {
        throw new Error('Informe um termo para a pesquisa dos cursos.');
    }

    let pesquisaOriginal = pesquisa;

    if (pesquisa.includes('curso') == false || pesquisa.includes('course') == false) {
        pesquisa = 'curso ' + pesquisa;
    }

    pesquisa = encodeURIComponent(pesquisa);

    const listaUdemy = await UdemySearch(pesquisa);

    const listaGoogle = await GoogleSearch(pesquisa);

    const listaBing = await BingSearch(pesquisa);

    const listaWS = await WebSearch(pesquisa);

    const listaBanco = await dbCurso.selectCursosByTemaOrKeywords(pesquisaOriginal);

    let lstUnificada = JuntarResultados(listaWS, listaGoogle, listaBing, listaUdemy, listaBanco);

    var cont = lstUnificada.length;
    var atual = 0;


    let listaFim = [];

    while (cont > 0) {
        var atualAux = 0;
        let listaAux = [];

        var paradaFor = cont < 9 ? atual + cont : atual + 9;

        for (var i = atual; i < paradaFor; i++) {
            const curso = lstUnificada[i];
            listaAux.push(curso);
            atualAux++;
        }

        let listaRetornoKeywords = await GetKeyWordsAzure(listaAux);

        let listaRetorno = FormatarKeywords(listaAux, listaRetornoKeywords);

        for (var j = 0; j < listaRetorno.length; j++) {
            listaFim.push(listaRetorno[j]);
        }

        atual += atualAux;

        cont -= listaAux.length;
    }

    //let listaKeywords = await GetKeyWordsAzure(listaRetorno);

    //let listaFinal = FormatarKeywords(listaRetorno,listaKeywords);

    console.log("lista com keywords", listaFim)

    return listaFim;
}

function JuntarResultados() {
    let cursos = [];

    for (let index = 0; index < arguments.length; index++) { //percorre os multiplos argumentos
        const listaCurso = arguments[index];

        if (listaCurso.length > 0) {
            for (let indice = 0; indice < listaCurso.length; indice++) { //percorre todas as listas que foram passadas por parametros

                try {
                    const curso = listaCurso[indice];

                    if (cursos.some(c => c.Link === curso.Link) == false) { //não contém um curso de mesmo Link,

                        if (curso.Link.toLowerCase().includes('udemy')) {
                            if (curso.Keywords.toLowerCase().includes(curso.TemaPrincipal.toLowerCase())) {
                                cursos.push(curso);
                            }
                        }
                        else if (((curso.Keywords.toLowerCase().includes('curso') || curso.Keywords.toLowerCase().includes('course'))) ||
                            ((curso.Nome.toLowerCase().includes('curso') || curso.Nome.toLowerCase().includes('course')))) { //se contém curso ou course no nome
                            if (curso.Keywords.toLowerCase().includes(curso.TemaPrincipal.toLowerCase())) {
                                cursos.push(curso);
                            }
                        }
                    }

                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    }

    return cursos;
}

//Pedro ==================================================================================================================================================================================================================

const getById = async (curso_Id) => {
    const curso = await models.Curso.findOne({
        where: {
            Id: parseInt(curso_Id),
        },
    });

    if (!curso) {
        throw new Error('Curso não encontrado!');
    }

    const cursoMap = {
        nome: curso.nome,
        link: curso.link,
        temaPrincipal: curso.temaPrincipal,
        UrlImagem: curso.UrlImagem ? curso.UrlImagem : "Sem imagem",
        keywords: curso.keywords ? curso.keywords : "Sem palavras chaves",
    };

    return cursoMap;
};

const getByTema = async (temas) => {

    console.log("temas no service ", temas)

    if (!temas) {
        throw new Error('Temas não informados!');
    }

    const Op = Sequelize.Op;

    const listaTemas = temas.split(",")

    let listaCursos = []

    for (i = 0; i < listaTemas.length; i++) {
        const cursosEncontrados = await models.Curso.findAll({
            where: {
                TemaPrincipal: {
                    [Op.like]: '%' + listaTemas[i] + '%',
                }
            },
        })

        cursosEncontrados.forEach(x => {
            const cursoExiste = listaCursos.find(curso => curso.Link === x.Link)
            if(!cursoExiste) {
                listaCursos = [...listaCursos, ...cursosEncontrados]
            }
        })
    }

    if (!listaCursos) {
        throw new Error('Nenhum curso encontrado!');
    }

    listaCursos.forEach(x => {
        console.log("lista dos cursos: ", x.Link)
    })

    return listaCursos;
};

const getByLink = async (curso_Link) => {
    console.log('procurando com o link:', curso_Link)
    const curso = await models.Curso.findOne({
        include: [
            {
                model: models.Avaliacao,
                as: 'avaliacoes',
                include: {
                    as: 'Usuario',
                    model: models.Usuario
                }
            }
        ],
        include: [
            {
                model: models.AvaliacaoGeral,
                as: 'avaliacoesGerais'
            }
        ],
        where: {
            Link: curso_Link,
        },
    });

    console.log('Ele procurou pelo link')

    if (!curso) {
        console.log('E não encontrou no banco')

        return null;
    }

    let linkExistente = curso.dataValues

    let Like = 0
    let Dislike = 0
    linkExistente.avaliacoesGerais.forEach(item => {
        item.AvaliacaoGeral ? Like = Like + 1 : Dislike = Dislike + 1
    });

    linkExistente = { ...linkExistente, Like, Dislike }

    console.log('encontrou e vai retornar o curso existente', linkExistente)

    return linkExistente;
};

const getAll = async () => {
    const cursos = await models.Curso.findAll({
        include: [
            {
                model: models.Avaliacao,
                as: 'avaliacoes',
                include: {
                    as: 'Usuario',
                    model: models.Usuario
                }
            }
        ]
    });

    if (!cursos) {
        throw new Error('Curso não encontrado!');
    }

    console.log(cursos)

    return cursos;
};

const create = async (curso) => {
    const newCurso = models.Curso.create(curso);
    return newCurso;
};

const update = async (curso) => {
    const updatedCurso = await models.Curso.update(curso, {
        where: {
            Id: curso.Id,
        },
    });

    if (updatedCurso[0] > 0) {
        return {
            ...curso,
            message: 'Curso atualizado com sucesso!',
        };
    } else {
        throw new Error('Não encontrado ou atualizado!');
    }
};

const remove = async (curso_Id) => {
    const removedCurso = await models.Curso.destroy({
        where: {
            Id: parseInt(curso_Id),
        },
    });

    if (removedCurso > 0) {
        return {
            curso_Id,
            message: 'Curso deletado com sucesso!',
        };
    } else {
        throw new Error('Não encontrado ou deletado!');
    }
};

module.exports = {
    getById,
    getByLink,
    getAll,
    getByTema,
    create,
    update,
    remove,
    WebSearch,
    GoogleSearch,
    BingSearch,
    UdemySearch,
    PesquisarCursos,
    JuntarResultados,
};
