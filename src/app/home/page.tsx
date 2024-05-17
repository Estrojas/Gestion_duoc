"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <h1>Hola</h1>
      <Link href="/" className="text-decoration-none mt-3 text-primary fw-bold">
                                        ¿Haz olvidado tu contraseña? Click aqui!
      </Link>
    </>
  );
}
