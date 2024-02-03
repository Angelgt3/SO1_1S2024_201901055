import React, { useState, useEffect } from 'react';

const DatosComponent = () => {
  const [datos, setDatos] = useState(null);
  const [mostrarDatos, setMostrarDatos] = useState(false);

  useEffect(() => {
    // Simulando una solicitud GET (reemplázalo con tu lógica de solicitud real)
    fetch('http://0.0.0.0:3000/data')
      .then(response => response.json())
      .then(data => setDatos(data))
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

  const handleMostrarDatos = () => {
    setMostrarDatos(true);
  };

  return (
    <div>
      <h2>Datos</h2>
      <button onClick={handleMostrarDatos}>Mostrar Datos</button>
      {mostrarDatos && datos ? (
        <ul>
          <li>
            <strong>Nombres:</strong> {datos.nombres}
          </li>
          <li>
            <strong>Carnet:</strong> {datos.carnet}
          </li>
          <li>
            <strong>Correo:</strong> {datos.correo}
          </li>
          <li>
            <strong>GitHub:</strong> {datos.github}
          </li>
        </ul>
      ) : (
        <p>{mostrarDatos ? 'Cargando datos...' : ''}</p>
      )}
    </div>
  );
};

export default DatosComponent;
