'use client'
import React, { useState } from "react";
import { Prospecto } from "../ModelosDatos/Prospecto";
import { ingresarProspecto } from "../Connection/SupabaseClient";
import styles from "./formulario.module.css";
import Notiflix from 'notiflix';


const FormularioProspectos = () => {
    const [prospecto, setProspecto] = useState<Prospecto>({
        rut: null,
        dv: "",
        correo: "",
        nombre: "",
        apellido: "",
        telefono: null,
        estado: 'Pendiente',
        Matriculador: null,
        aut_corr: false,
        aut_tel: false,
    });

    Notiflix.Report.init({
      backgroundColor : '#182237',
      success: {
        titleColor : 'white',
        messageColor : 'white'
      },
      failure: {
        titleColor : 'white',
        messageColor : 'white'
      }
    })

    const [errors, setErrors] = useState({
        rut: "",
        dv: "",
        correo: "",
        nombre: "",
        apellido: "",
        telefono: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setProspecto({ ...prospecto, [e.target.name]: e.target.value });
    };

    const validateFields = () => {
        let newErrors = { rut: "", dv: "", correo: "", nombre: "", apellido: "", telefono: "" };
        let isValid = true;

        if (!prospecto.rut) {
            newErrors.rut = "El RUT es obligatorio.";
            isValid = false;
        }
        if (!prospecto.dv) {
            newErrors.dv = "El DV es obligatorio.";
            isValid = false;
        }
        if (!prospecto.correo) {
            newErrors.correo = "El correo electrónico es obligatorio.";
            isValid = false;
        }
        if (!prospecto.nombre) {
            newErrors.nombre = "El nombre es obligatorio.";
            isValid = false;
        }
        if (!prospecto.apellido) {
            newErrors.apellido = "El apellido es obligatorio.";
            isValid = false;
        }
        if (!prospecto.telefono) {
            newErrors.telefono = "El teléfono es obligatorio.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateFields()) {
            try {
                const { data, error } = await ingresarProspecto(prospecto);
                setProspecto({
                    rut: null,
                    dv: "",
                    correo: "",
                    nombre: "",
                    apellido: "",
                    telefono: null,
                    estado: 'Pendiente',
                    Matriculador: null,
                    aut_corr: false,
                    aut_tel: false,
                });

                Notiflix.Report.success("Exito", "Se ha registrado un prospecto", "OK")

            } catch (error) {
                console.error("Error creating user:", error);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-orange-500 py-4 px-6 flex items-center">
                <h1 className="text-white font-bold text-xl">Gestión Prospectos</h1>
                <div className="ml-auto">
                    <img src="/img/logo-duoc-sin-bg.png" alt="Logo" className="w-25 h-10" />
                </div>
            </div>
            <div className="flex-1 p-6">
                <img
                    src="/img/Fondo-home.jpg"
                    alt="Imagen de bienvenida"
                    className="w-full h-64 object-cover mb-6"
                />
                <div className={styles.contenedorForm}>
                    <h2 className="text-xl font-bold mb-4">Nuevo Prospecto</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="rut" className="block font-medium mb-2">
                                RUT*
                            </label>
                            <input
                                type="number"
                                id="rut"
                                name="rut"
                                value={prospecto.rut || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
                                required
                            />
                            {errors.rut && <span className="text-red-500">{errors.rut}</span>}
                        </div>
                        <div>
                            <label htmlFor="dv" className="block font-medium mb-2">
                                DV*
                            </label>
                            <input
                                type="text"
                                id="dv"
                                name="dv"
                                value={prospecto.dv}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
                                required
                            />
                            {errors.dv && <span className="text-red-500">{errors.dv}</span>}
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="correo" className="block font-medium mb-2">
                                Correo Electrónico*
                            </label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={prospecto.correo}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
                                required
                            />
                            {errors.correo && <span className="text-red-500">{errors.correo}</span>}
                        </div>
                        <div>
                            <label htmlFor="nombre" className="block font-medium mb-2">
                                Nombre*
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={prospecto.nombre}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
                                required
                            />
                            {errors.nombre && <span className="text-red-500">{errors.nombre}</span>}
                        </div>
                        <div>
                            <label htmlFor="apellido" className="block font-medium mb-2">
                                Apellido*
                            </label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={prospecto.apellido}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
                                required
                            />
                            {errors.apellido && <span className="text-red-500">{errors.apellido}</span>}
                        </div>
                        <div>
                            <label htmlFor="telefono" className="block font-medium mb-2">
                                Teléfono*
                            </label>
                            <input
                                type="number"
                                id="telefono"
                                name="telefono"
                                value={prospecto.telefono || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
                                required
                            />
                            {errors.telefono && <span className="text-red-500">{errors.telefono}</span>}
                        </div>
                        <div>
                            <label htmlFor="aut_tel" className="block font-medium mb-2">
                                Autorizar contacto por teléfono
                            </label>
                            <input
                                type="checkbox"
                                id="aut_tel"
                                name="aut_tel"
                                checked={prospecto.aut_tel}
                                onChange={e => setProspecto({ ...prospecto, aut_tel: e.target.checked })}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
                            />
                            <label htmlFor="aut_corr" className="block font-medium mb-2">
                                Autorizar contacto por correo
                            </label>
                            <input
                                type="checkbox"
                                id="aut_corr"
                                name="aut_corr"
                                checked={prospecto.aut_corr}
                                onChange={e => setProspecto({ ...prospecto, aut_corr: e.target.checked })}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
                            />
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className={styles.button}
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
};

export default FormularioProspectos;
