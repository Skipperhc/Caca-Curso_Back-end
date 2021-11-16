const models = require('../models');

//Pedro ==================================================================================================================================================================================================================

const Curso = require('../models/curso/Curso')
const axios = require('axios');
const h = require('../helpers/Helper');

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

                    let curso = new Curso(cursoWS.title, cursoWS.url, pesquisa, cursoWS.image.url, keywords);

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

                    let curso = new Curso(cursoGoogle.title, cursoGoogle.link, pesquisa, null, keyWords);

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

                    let curso = new Curso(cursoBing.name, cursoBing.url, pesquisa, cursoBing.thumbnailUrl, keyWords);

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

                    let curso = new Curso(cursoUdemy.title, urlCursoUdemy, pesquisa, cursoUdemy.image_480x270, keywords);

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

    if (pesquisa.includes('curso') == false || pesquisa.includes('course') == false) {
        pesquisa = 'curso ' + pesquisa;
    }

    pesquisa = encodeURIComponent(pesquisa);

    const listaUdemy = await UdemySearch(pesquisa);

    const listaGoogle = await GoogleSearch(pesquisa);

    const listaBing = await BingSearch(pesquisa);

    const listaWS = await WebSearch(pesquisa);

    //let listaBanco = await dbCurso.selectCursos();

    let listaRetorno = JuntarResultados(listaWS, listaGoogle, listaBing, listaUdemy);

    return listaRetorno;
}

function JuntarResultados() {
    let cursos = [];

    let palavrasDefinemCurso = ["curso", "course", "aprenda", "learn"];

    for (let index = 0; index < arguments.length; index++) { //percorre os multiplos argumentos
        const listaCurso = arguments[index];

        if (listaCurso.length > 0) {
            for (let indice = 0; indice < listaCurso.length; indice++) { //percorre todas as listas que foram passadas por parametros
                const curso = listaCurso[indice];

                if (cursos.some(c => c.link === curso.link) == false) { //não contém um curso de mesmo link,
                    // if (((curso.keywords.includes('curso') || curso.keywords.includes('course'))) || 
                    //     ((curso.nome.includes('curso') || curso.nome.includes('course')))) { //se contém curso ou course no nome
                    //     if (curso.keyWords.includes(curso.temaPrincipal)) {
                    //         cursos.push(curso);    
                    //     }
                    // }

                    if (curso.link.toLowerCase().includes('udemy')) {
                        if (curso.keywords.toLowerCase().includes(curso.temaPrincipal.toLowerCase())) {
                            cursos.push(curso);
                        }
                    }
                    else if (((curso.keywords.toLowerCase().includes('curso') || curso.keywords.toLowerCase().includes('course'))) ||
                        ((curso.nome.toLowerCase().includes('curso') || curso.nome.toLowerCase().includes('course')))) { //se contém curso ou course no nome
                        if (curso.keywords.toLowerCase().includes(curso.temaPrincipal.toLowerCase())) {
                            cursos.push(curso);
                        }
                    }
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

    const Like = 0
    const Dislike = 0
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
