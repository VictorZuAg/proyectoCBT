export class Usuario{
    constructor(
        public _id: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public usuario: string,
        public password: string,
        public role: string,
        public imagen: string
    ){}
}
/*
    nombre: String,
    paterno: String,
    materno: String,
    usuario: String,
    password: String,
    role : String,
    imagen: String
*/