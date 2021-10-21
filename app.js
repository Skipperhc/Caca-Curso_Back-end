const express = require('express')
require('dotenv/config');
const port = process.env.port | 3000

const cursoRoutes = require('./routes/CursoRoutes');
const usuarioRoutes = require('./routes/UsuarioRoutes');
const avaliacaoRoutes = require('./routes/AvaliacaoRoutes');
// const avaliacaoGeralRoutes = require('./routes/AvaliacaoGeralRoutes');
// const usuarioFavoritosRoutes = require('./routes/UsuarioFavoritosRoutes');


const app = express()

app.use(express.json())

//Routes
app.use('/curso', cursoRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/avaliacao', avaliacaoRoutes);
// app.use('/avaliacaogeral', avaliacaoGeralRoutes);
// app.use('/favoritousuario', usuarioFavoritosRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
      message: 'API em funcionamento!',
    });
  });

app.listen(process.env.port, () => {
  console.log(`Executando em: http://localhost:${port}`)
})

// Author.sync({ force: true })
//         .then(function() {
//             return Book.sync({ force: true });
//         })
//         .then(function() {
//             return Author.create({firstName: 'Test', lastName: 'Testerson'});
//         })
//         .then(function(author1) {
//             firstAuthor=author1;
//             return Author.create({firstName: 'The Invisible', lastName: 'Hand'});
//         })
//         .then(function(author2) {
//             secondAuthor=author2
//             return Book.create({AuthorId: firstAuthor.id, title: 'A simple book'});
//         })
//         .then(function() {
//             return Book.create({AuthorId: firstAuthor.id, title: 'Another book'});
//         })
//         .then(function() {
//             return Book.create({AuthorId: secondAuthor.id, title: 'Some other book'});
//         })
//         .then(function() {
//             // This is the part you're after.
//             return Book.findAll({
//                 where: {
//                    'Authors.lastName': 'Testerson'
//                 },
//                 include: [
//                     {model: Author, as: Author.tableName}
//                 ]
//             });
//         })
//         .then(function(books) { 
//             console.log('There are ' + books.length + ' books by Test Testerson')
//         });

