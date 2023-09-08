const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3000; // Puerto en el que se ejecutará el servidor

// Crear conexión a la base de datos SQLite
const db = new sqlite3.Database('DS.db', (err) => {
    if (err) {
        console.error('Error al abrir la base de datos', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});

// Configurar la carpeta para servir archivos estáticos
app.use(express.static('public'));

// Ruta para obtener los datos de un usuario por su ID
app.get('/tecnico/:id', (req, res) => {
    const userId = req.params.id;
    db.get('SELECT * FROM TECNICOS WHERE ID = ?', userId, (err, row) => {
        if (err) {
            console.error('Error al obtener los datos del usuario', err);
            res.status(500).send('Error al obtener los datos del usuario');
        } else {
            res.json(row);
        }
    });
});

// Ruta para actualizar los datos de un usuario
app.put('/usuario/:id', express.json(), (req, res) => {
    const userId = req.params.id;
    const { nombre, apellido } = req.body; // Obtén los datos del cuerpo de la solicitud

    db.run('UPDATE TECNICOS SET NOMBRE = ?, APELLIDO = ? WHERE ID = ?', [nombre, apellido, userId], (err) => {
        if (err) {
            console.error('Error al actualizar los datos del usuario', err);
            res.status(500).send('Error al actualizar los datos del usuario');
        } else {
            res.send('Datos del usuario actualizados');
        }
    });
    db.get('SELECT * FROM TECNICOS WHERE ID = ?', userId, (err, row) => {
        if (err) {
            console.error('Error al obtener los datos del usuario', err);
            res.status(500).send('Error al obtener los datos del usuario');
        } else {
            res.json(row);
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
