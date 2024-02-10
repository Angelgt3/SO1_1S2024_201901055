import React, { useEffect, useRef } from 'react';
import { Container, Card, Icon, Button } from 'semantic-ui-react';
import './App.css';

function App() {
  const videoDiv = useRef();
  const fotoDiv = useRef();

 
  const verCamara = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 }
      })
      .then(stream => {
        let miVideo = videoDiv.current;
        miVideo.srcObject = stream;
        miVideo.play();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const tomarFoto = () => {
    let video = videoDiv.current;
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    enviarFoto(dataURL);
  };

  const enviarFoto = (dataURL) => {
    fetch('http://localhost:4000/insertar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imagen: dataURL })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error al enviar la imagen al servidor:', error);
    });
  };
  
  useEffect(() => {
    verCamara();
  }, [videoDiv]);

  return (
    <>
      <Container className='miApp' fluid textAlign='center'>
        <Card.Group centered>
          <Card>
            <video ref={videoDiv}></video>
            <Card.Content>
              <Button color='teal' onClick={tomarFoto}>
                <Icon name='camera' /> Tomar foto
              </Button>
            </Card.Content>
          </Card>
          <Card>
            <canvas ref={fotoDiv}></canvas>
          </Card>
        </Card.Group>
      </Container>
    </>
  );
}

export default App;
