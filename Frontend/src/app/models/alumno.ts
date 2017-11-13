export class Alumno{
    constructor(
        public matricula: number,
        public _id: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public curp: string,
        public grado: number,
        public grupo: number,
        public imagen: string
    ){}
}