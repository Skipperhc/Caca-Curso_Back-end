const dbCurso = require('../db/dbCurso')
const Curso = require('../models/curso/Curso')
const axios = require('axios');

const keyRapidAPI = 'be85f3e96dmsh0865f88454bdfcfp1f1851jsn3d9c71f1ec71';
const basicUdemyHeader = 'Basic a3I0aVcyaE9paHdRV0hDV1Q2Vnd2OWs2aElVZUhGWVFpZmJ2QTY3SjoySE1zZnhER2tMbWQzamxYYzN0V2dPQjJsQ1hBQ0hjUThJdkwzcjlnTnlPTTdyRDNaemdCR0pCNGZLSDVaUFRHS3RzOFQyMXE3R1NuMkJZekdReEh4MHhDa1RGNEJSTzZRaURXbFMxMlhod0cxWXB4eWxOdG9BNmpjZFRLS1FGQQ==';

function urlWebSearch (termo){
    return 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q='+ termo +'&pageNumber=1&pageSize=10&autoCorrect=true';
}

function urlGoogleSearch (termo){
    return 'https://google-search3.p.rapidapi.com/api/v1/search/q='+termo+'&num=10';
}

function urlBingSearch (termo){
    return 'https://bing-web-search1.p.rapidapi.com/search?q='+ termo +'&mkt=pt-br&safeSearch=Off&textFormat=Raw&cc=br&setLang=pt';
}

function urlUdemySearch (termo){
    return 'https://www.udemy.com/api-2.0/courses?search='+ termo +'&language=pt&page_size=10';
}

async function WebSearch(pesquisa){    
    var config = {
        method: 'get',
        url: urlWebSearch(pesquisa),
        headers: { 
          'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com', 
          'x-rapidapi-key': keyRapidAPI
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

async function GoogleSearch(pesquisa){    
    var config = {
        method: 'get',
        url: urlGoogleSearch(pesquisa),
        headers: { 
            'x-user-agent': 'server', 
            'x-rapidapi-host': 'google-search3.p.rapidapi.com', 
            'x-rapidapi-key': keyRapidAPI
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

async function BingSearch(pesquisa){    
    var config = {
        method: 'get',
        url: urlBingSearch(pesquisa),
        headers: { 
            'x-bingapis-sdk': 'true', 
            'x-rapidapi-host': 'bing-web-search1.p.rapidapi.com', 
            'x-rapidapi-key': keyRapidAPI
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

async function UdemySearch(pesquisa){   
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
      
    axios(config).then(function (response) {

      if(response.status == 200){
        var cursosUdemy = response.data;

        var retornoCursos = [];
  
        for (var curso in cursosUdemy) {
          let urlCursoUdemy = urlUdemy + curso.url;
  
          let keywords = curso.published_title.replace('-',' ');
  
          let curso = new Curso(curso.title,urlCursoUdemy,pesquisa,curso.image_480x270, keywords);
  
          retornoCursos.push(curso);
        }
  
        return retornoCursos;
      }
      else{
        // tratar objeto resposta não OK
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getCursos() {
    return await dbCurso.selectCursos();
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
    getCursos,
    gravarCurso
}