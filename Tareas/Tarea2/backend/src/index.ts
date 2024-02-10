import express, { Request, Response } from 'express';
import { MongoClient, Binary } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 4000;

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'so1_t2_db';

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.post('/insertar', async (req: Request, res: Response) => {
  try {
    // Se Conecta a la base de datos
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const collection = db.collection('imagen');

    // Convertir la imagen base64 a buffer
    const { imagen } = req.body;
    const imageBuffer = Buffer.from(imagen.split(',')[1], 'base64');
    //insertar la imagen en la collection
    await collection.insertOne({
      nombre: '3.png',
      datos: new Binary(imageBuffer),
      tipo: 'image/png'
    });
    console.log('Imagen insertada correctamente en la base de datos');
    // Cerrar la conexión
    client.close();
    
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

app.get('/obtener/:nombreImagen', async (req: Request, res: Response) => {
  try {
    // Conectar a la base de datos
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const collection = db.collection('imagen');
    
    // Obtener la imagen por nombre
    const imagen = await collection.findOne({ nombre: req.params.nombreImagen });
    if (!imagen) {
      res.status(404).send('Imagen no encontrada');
      return;
    }

    // Devolver la imagen 
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imagen.datos.buffer);

    // Cerrar la conexión
    client.close();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
