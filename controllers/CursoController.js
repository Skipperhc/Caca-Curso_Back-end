const cursoService = require('../services/CursoService');

//Pedro ==================================================================================================================================================================================================================

const WebSearch = async (pesquisa) => {
  try {
    const respostaCursos = cursoService.WebSearch(pesquisa);
    return respostaCursos
  } catch (err) {
    //todo: tratar o erro
  }
}

const GoogleSearch = (pesquisa) => {
  try {
    const retornoCursos = cursoService.GoogleSearch(pesquisa);
    return retornoCursos;
  } catch (err) {
    //todo: tratar o erro
  }
}

const BingSearch = (pesquisa) => {
  try {
    const respostaCurso = cursoService.BingSearch(pesquisa)
    return respostaCurso;
  } catch (error) {
    //todo: tratar erro    
  }
}

const UdemySearch = (pesquisa) => {
  try {
    const retornoCursos = cursoService.UdemySearch(pesquisa);
    return retornoCursos;
  } catch (error) {
    //todo: tratar erro    
  }
}

const PesquisarCursos = (pesquisa) => {
  try {
    const listaRetorno = cursoService
    return listaRetorno;
  } catch (error) {
    //todo: tratar erros
  }
}

const JuntarResultados = () => {
  try {
    const cursos = cursoService.JuntarResultados();
    return cursos;
  } catch (error) {
    //todo: tratar erros
  }
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


//Pedro ==================================================================================================================================================================================================================


const getById = async (req, res) => {
  try {
    const curso = await cursoService.getById(req.params.Id);
    res.status(200).json(curso);
  } catch (err) {
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
    const curso = {
      Nome: body.nome,
      Link: body.link,
      TemaPrincipal: body.temaPrincipal,
      UrlImagem: body.urlImagem ? body.urlImagem : "",
      Keywords: body.keywords ? body.keywords : "",
    };

    console.log(curso)

    const newCurso = await cursoService.create(curso);
    res.status(200).json(newCurso);
  } catch (err) {
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
  create,
  update,
  PesquisarCursos,
  WebSearch,
  GoogleSearch,
  BingSearch,
  UdemySearch,
  JuntarResultados,
  // remove,
};