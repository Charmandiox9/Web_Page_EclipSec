package main

import (
	"log"
	"net/http"
)

func main() {
	db, err := conectarDB()
	if err != nil {
		log.Fatal("Error al conectar a DB:", err)
	}
	defer db.Close()

	http.Handle("/registro", cors(http.HandlerFunc(registrarUsuario(db))))
	http.Handle("/login", cors(http.HandlerFunc(loginUsuario(db))))
	http.Handle("/servicios", cors(http.HandlerFunc(listarServicios(db))))
	http.Handle("/contratar", cors(http.HandlerFunc(verificarJWT(contratarServicio(db)))))

	log.Println("Servidor backend en http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
