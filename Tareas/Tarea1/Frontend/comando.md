**crear imagen**
sudo docker build -t 201901055/so1_t1_frontend .
sudo docker build -t 201901055/so1_t1_backend .
**ejecutar**
sudo docker run --rm -it -p 5173:5173 201901055/so1_t1_frontend
sudo docker run --rm -it -p 3000:3000 201901055/so1_t1_backend
**ver**
sudo docker ps
**imagenes**
sudo docker images
**borrar**
sudo docker rmi image id
sudo docker rmi