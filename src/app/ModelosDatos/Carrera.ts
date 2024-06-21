export interface Carrera {
    id_carr: string | null;
    nombre_carr: string;
    cupos_di: number | null;
    cupos_vesp: number | null;
    tipo: 'Tecnica' | 'Profesional' | '';
    precio_mat: number | null;
    mat_di: number | null;
    mat_vesp: number | null;
}