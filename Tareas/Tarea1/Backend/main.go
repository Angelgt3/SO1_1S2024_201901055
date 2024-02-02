package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Configura las rutas
	http.HandleFunc("/data", Data)

	// Crea el servidor
	fmt.Println("Run server: http://0.0.0.0:3000")
	http.ListenAndServe("0.0.0.0:3000", nil)
}

func Data(w http.ResponseWriter, r *http.Request) {
	enableCors(&w) // Permisos de cors

	// Escribir el JSON para enviar
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	resp := make(map[string]string)
	resp["nombres"] = "Angel Geovany Aragón Pérez"
	resp["carnet"] = "201901055"
	resp["github"] = "https://github.com/Angelgt3"
	resp["correo"] = "angelaragon130@gmail.com"

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Headers", "*")
	(*w).Header().Set("Access-Control-Allow-Method", "*")
	(*w).Header().Set("Access-Control-Expose-Headers", "*")
	(*w).Header().Set("Access-Control-Max-Age", "*")
	(*w).Header().Set("Access-Control-Allow-Credentials", "*")
}
