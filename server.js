const express = require('express');
const sqlite3 = require('sqlite3') ;

const app = express();
const port = 3000;

const db = new sqlite3.Database('DS.db', (err) => {
    if (err) {
        console.error('Error al abrir la base de datos', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});

// Configurar la carpeta para servir archivos estáticos
//app.use(express.static('public'));
app.use(express.static(__dirname));

app.get('/tecnico/:id', (req, res) => {
    const userId = req.params.id;
    db.get('SELECT * FROM TECNICOS WHERE ID = ?', userId, (err, row) => {
        if (err) {
            console.error('Error al obtener los datos del usuario', err);
            res.status(500).send('Error al obtener los datos del usuario');
        } else {
            res.json(row);
        }
        const tecnico = {
            NOMBRE: 'Nombre del Técnico',
            APELLIDO: 'Apellido del Técnico'
        };
        res.json(tecnico);
    });
});

app.put('/tecnico/:id', express.json(), (req, res) => {
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

app.get('/cursos/:area', (req, res) => {
    const area = req.params.area;

    // Realiza una consulta a la base de datos para obtener los cursos en función del área
    db.all('SELECT ID_CURSO FROM CURSOS_TÉCNICOS WHERE ID_TÉCNICO IN (SELECT ID FROM TECNICOS WHERE AREA = ?)', area, (err, rows) => {
        if (err) {
            console.error('Error al obtener los cursos', err);
            res.status(500).send('Error al obtener los cursos');
        } else {
            const cursos = rows.map(row => row.ID_CURSO);
            res.json({ cursos });
        }
    });
});



