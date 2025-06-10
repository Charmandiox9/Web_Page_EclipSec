package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
)

func registrarUsuario(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var u Usuario
		_ = json.NewDecoder(r.Body).Decode(&u)
		_, err := db.Exec("INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES ($1, $2, $3, 'cliente')",
			u.Nombre, u.Correo, u.Password)
		if err != nil {
			http.Error(w, "Error al registrar", 500)
			return
		}
		w.WriteHeader(http.StatusCreated)
	}
}

func loginUsuario(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var u Usuario
		_ = json.NewDecoder(r.Body).Decode(&u)

		row := db.QueryRow("SELECT id, rol FROM usuarios WHERE correo=$1 AND contraseña=$2", u.Correo, u.Password)
		err := row.Scan(&u.ID, &u.Rol)
		if err != nil {
			http.Error(w, "Credenciales inválidas", http.StatusUnauthorized)
			return
		}

		// Generar token JWT
		claims := jwt.MapClaims{
			"id":  u.ID,
			"rol": u.Rol,
		}
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenStr, err := token.SignedString(jwtSecret)
		if err != nil {
			http.Error(w, "Error al generar token", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(map[string]string{
			"token": tokenStr,
		})
	}
}

func listarServicios(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT id, nombre, descripcion, precio FROM servicios")
		if err != nil {
			http.Error(w, "Error al listar", 500)
			return
		}
		defer rows.Close()

		var servicios []Servicio
		for rows.Next() {
			var s Servicio
			rows.Scan(&s.ID, &s.Nombre, &s.Descripcion, &s.Precio)
			servicios = append(servicios, s)
		}
		json.NewEncoder(w).Encode(servicios)
	}
}

func contratarServicio(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		usuarioID := r.Context().Value("usuario_id").(int)

		var c Contratacion
		_ = json.NewDecoder(r.Body).Decode(&c)

		_, err := db.Exec(`
			INSERT INTO contrataciones (usuario_id, servicio_id, fecha_solicitud, comentario) 
			VALUES ($1, $2, $3, $4)`,
			usuarioID, c.ServicioID, time.Now().Format("2006-01-02"), c.Comentario)

		if err != nil {
			http.Error(w, "Error al contratar", 500)
			return
		}
		w.WriteHeader(http.StatusCreated)
	}
}
