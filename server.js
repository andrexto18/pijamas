const express = require ('express');
const mysql = require ('mysql2');
const app = express();
const PORT = 3000;

//servir arhivos estaticos
app.use(express.json()); 
app.use(express.static('public'));

//configurar la conexion de la base de datos
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'pijamas',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('¡Conectado exitosamente a la base de datos "pijamas"!');
});

// Crear la ruta de la API (El Endpoint)
app.get('/api/pijamas', (req, res) => {
    const query = 'SELECT * FROM inventario';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            return res.status(500).json({ error: 'Hubo un error en el servidor' });
        }
        // Enviar los datos en formato JSON al frontend
        res.json(results);
    });
});

//iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});