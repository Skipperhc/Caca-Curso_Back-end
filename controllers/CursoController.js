const dbCurso = require('../db/dbCurso')
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

          let keywords = cursoWS.description.replace(/\s/g, '-');

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

          let keyWords = cursoGoogle.description.replace(/\s/g, '-');

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

          let keyWords = cursoBing.snippet.replace(/\s/g, '-');

          let curso = new Curso(cursoBing.name, cursoBing.url, pesquisa, cursoBing.thumbnailUrl, keyWords);

          respostaCurso.push(curso);
        }
      }
    }
  })
    .catch(function (error) {
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

          let keywords = cursoUdemy.published_title.replace(/\s/g, '-');

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

async function getCursos() {
  return await dbCurso.selectCursos();
}

async function PesquisarCursos(pesquisa) {

  if (pesquisa == undefined || pesquisa == '') {
    throw new Error('Informe um termo para a pesquisa dos cursos.');
  }

  if(pesquisa.includes('curso') == false || pesquisa.includes('course') == false) {
    pesquisa = 'curso ' + pesquisa;
  }

  const listaWS = await WebSearch(pesquisa);

  const listaGoogle = await GoogleSearch(pesquisa);

  const listaBing = await BingSearch(pesquisa);

  const listaUdemy = await UdemySearch(pesquisa);

  //let listaBanco = await dbCurso.selectCursos();

  let listaRetorno = JuntarResultados(listaWS, listaGoogle, listaBing, listaUdemy);

  return listaRetorno;
}

function JuntarResultados() {
  let cursos = [];

  for (let index = 0; index < arguments.length; index++) { //percorre os multiplos argumentos
    const listaCurso = arguments[index];

    if (listaCurso.length > 0) {
      for (let indice = 0; indice < listaCurso.length; indice++) { //percorre todas as listas que foram passadas por parametros
        const curso = listaCurso[indice];

        if (cursos.some(c => c.link === curso.link) == false) { //não contém um curso de mesmo link,
          if ((curso.keywords.includes('curso') || curso.keywords.includes('course')) || (curso.nome.includes('curso') || curso.nome.includes('course'))){
            cursos.push(curso);            
          }
        }
      }
    }
  }

  return cursos;
}

async function gravarCurso(Curso) {
  if (Curso.nome == undefined) {
    throw new Error('Informe o nome do curso');
  }

  if (Curso.link == undefined) {
    throw new Error('Informe o link do curso');
  }

  return await dbCurso.insertCurso(Curso);
}

module.exports =
{
  PesquisarCursos,
  getCursos,
  gravarCurso
}