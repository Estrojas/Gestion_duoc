export interface Prospecto {
    rut: number | null;
    dv: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: number | null;
    estado: 'pendiente' | 'Matriculado' | 'No matriculado'/*string;*/
    matriculador: number;
    aut_corr: boolean;
    aut_tel: boolean;
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