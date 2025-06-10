package main

type Usuario struct {
	ID       int    `json:"id"`
	Nombre   string `json:"nombre"`
	Correo   string `json:"correo"`
	Password string `json:"password,omitempty"`
	Rol      string `json:"rol"`
}

type Servicio struct {
	ID          int     `json:"id"`
	Nombre      string  `json:"nombre"`
	Descripcion string  `json:"descripcion"`
	Precio      float64 `json:"precio"`
}

type Contratacion struct {
	ID             int    `json:"id"`
	UsuarioID      int    `json:"usuario_id"`
	ServicioID     int    `json:"servicio_id"`
	FechaSolicitud string `json:"fecha_solicitud"`
	Comentario     string `json:"comentario"`
	Estado         string `json:"estado"`
}
