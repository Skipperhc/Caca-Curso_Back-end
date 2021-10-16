const express = require('express')
const cursoController = require('./controllers/CursoController')
const usuarioController = require('./controllers/UsuarioController');

const app = express()
const port = 3000

app.use(express.json())

// app.get('/curso', async (req, res) => {
//     try{
//         let resposta = 
//         {
//             codigo : 1,
//             objeto : await cursoController.getCursos(),
//             mensagem : 'Sucesso editado'
//         }

//         res.status(200).send(resposta);
//     } catch(err) {
//         res.send(err);
//     }
// })

// app.post('/curso', async (req,res) => 
// {
//     try {
//         console.log(req.body);

//         let curso = req.body;

//         const retornoGravacao = await cursoController.gravarCurso(curso);

//         if(retornoGravacao <= 0)
//         {
//             throw new Error('Erro ao gravar o curso.');
//         }

//         res.status(200).send(`Curso ${curso.nome} gravado com sucesso`);

//     } catch (error) {
//         res.status(400).send(error.message);
//     }
//     finally
//     {
//         res.end();
//     }
// })

app.post('/usuario', async (req,res) =>
{
    try{
        console.log(req.body);

        let usuario = req.body;

        const retornoGravacao = await usuarioController.gravarUsuario(usuario);

        if(retornoGravacao <= 0)
        {
            throw new Error('Erro ao gravar o usuario.');
        }

        res.status(200).send(`Usuario: ${usuario.nome}, gravado com sucesso`);
    } catch (error) {
        res.status(400).send(error.message);
    }
    finally
    {
        res.end();
    }
})
app.listen(port, () => {
  console.log(`Executando em: http://localhost:${port}`)
})

