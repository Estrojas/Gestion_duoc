'use client';
import styles from './Chart.module.css';
import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ChartProps {
    nameMatriculados: string;
    num_mat: number;
    namePendientes: string;
    num_pen: number;
    nameNoMatriculados: string;
    num_not_mat: number;
}
/*
const data01 = [
    { name: 'No Matriculados', value: 700 },
    { name: 'Matriculados', value: 300 },
    { name: 'Pendientes', value: 500 },
  ];*/
  
  const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 },
  ];
  const COLORS = ['#f7737375', '#afd6ee75', '#f7cb7375'];


const Chart: React.FC<ChartProps> = ({num_mat,num_not_mat,num_pen,nameMatriculados,nameNoMatriculados,namePendientes}) => {

    const data01 = [
        { name: nameNoMatriculados, value: num_not_mat },
        { name: nameMatriculados, value: num_mat },
        { name: namePendientes, value: num_pen },
      ];

    return (
        <div className={styles.container}>
            <h2>Reportes</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {data01.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>

                    {/*}<Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />{*/}
                    <Tooltip />

                    </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;