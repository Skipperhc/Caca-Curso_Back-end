const { link } = require('fs');
const cursoService = require('../services/CursoService');

//Pedro ==================================================================================================================================================================================================================

const PesquisarCursos = async (req, res) => {
  try {
    var query = require('url').parse(req.url, true).query;

    let pesquisa = decodeURIComponent(query.p);

    const listaRetorno = await cursoService.PesquisarCursos(pesquisa)

    let resposta =
    {
      codigo: 1,
      objeto: listaRetorno,
      mensagem: 'Pesquisas realizada com sucesso!'
    }

    res.status(200).send(resposta);
  } catch (err) {
    res.send(err);
  }
}

//Pedro ==================================================================================================================================================================================================================


const getById = async (req, res) => {
  try {
    const curso = await cursoService.getById(req.params.Id);
    const resposta = {
      codigo: 200,
      objeto: curso
    }
    res.status(200).json(resposta);
  } catch (err) {
    res.status(404).json({
      message: `Não foi encontrado um curso com este id: ${req.params.Id}`,
      error: err.toString(),
    });
  }
};

const getByLink = async (req, res) => {
  try {
    console.log('Link do curso: ', req.headers.link)
    const curso = await cursoService.getByLink(req.headers.link);
    const resposta = {
      codigo: 200,
      objeto: curso
    }
    res.status(200).json(resposta);
  } catch (err) {
    console.log(err)
    res.status(404).json({
      message: `Não foi encontrado um curso com este id: ${req.params.Id}`,
      error: err.toString(),
    });
  }
};

const getAll = async (req, res) => {
  try {
    const cursos = await cursoService.getAll();
    res.status(200).json(cursos);
  } catch (err) {
    res.status(404).json({
      message: `Erro ao buscar cursos`,
      error: err.toString(),
    });
  }
};

const create = async ({ body }, res) => {
  try {
    
    console.log("Iniciando o create do curso: ", body)
    
    const linkExistente = await cursoService.getByLink(body.curso.link);
    
    if (linkExistente) {
      console.log("curso encontrado: ", linkExistente)
      res.status(200).json(linkExistente);
    } else {
      const curso = {
        Nome: body.curso.nome,
        Link: body.curso.link,
        TemaPrincipal: body.curso.temaPrincipal,
        UrlImagem: body.curso.urlImagem ? body.curso.urlImagem : "",
        Keywords: body.curso.keywords ? body.curso.keywords : "",
      };

      console.log('Ele não encontrou o curso pelo link, então vai criar', curso)

      const newCurso = await cursoService.create(curso);
      const resposta = {
        codigo: 201,
        objeto: newCurso
      }
      res.status(200).json(resposta);
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Não foi possível criar um novo curso!',
      error: err.toString(),
    });
  }
};

const update = async (req, res) => {
  try {
    const updated = await cursoService.update(req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({
      message: 'Não foi possível alterar este curso!',
      error: err.toString(),
    });
  }
};

// TODO: planejar como será feito a exclusão de um curso, se iremos remover somente ele, ou tudo relacionado a ele
// const remove = async (req, res) => {
//     try {
//         console.log('chegou aqui com o id', req)
//         const removed = await cursoService.remove(req.params.id);
//         res.status(200).json(removed);
//     } catch (err) {
//         res.status(500).json({
//             message: 'Não foi possível remover este curso!',
//             error: err.toString(),
//         });
//     }
// };

module.exports = {
  getById,
  getAll,
  getByLink,
  create,
  update,
  PesquisarCursos,
  // remove,
};