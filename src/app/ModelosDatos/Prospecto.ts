export interface Prospecto {
    rut: number | null;
    dv: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: number | null;
    tipoAdmision: string;
    carreraInteres: Array<string>;
    estado: 'pendiente' | 'Matriculado' | 'No matriculado'/*string;*/
    atendidoPor: number;
    observacion: string;
}
/*rut
digito verificador
nombre
apellido
correo
telefono
tipo de admision
estado
atendido por
Observacion*/