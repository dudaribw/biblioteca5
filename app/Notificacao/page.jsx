"use client";

import { useState, useEffect } from "react";
import Styles from '@/app/Notificacao/page.module.css';

function Notificacao() {
    const [livros, setLivros] = useState([]);
    const [exemplaresAtrasados, setExemplaresAtrasados] = useState([]);

    // Função para buscar empréstimos do servidor
    const buscarEmprestimos = async () => {
        try {
            const response = await fetch(`http://localhost:3001/todosemprestimos`, { method: 'GET' });

            if (response.ok) {
                const exemplarData = await response.json();
                setLivros(prevLivros => [...prevLivros, exemplarData]);
                verificarAtrasos(exemplarData); // Verifica os atrasos após buscar os empréstimos
            } else {
                console.error("Erro ao buscar empréstimos:", response.status);
            }
        } catch (error) {
            console.error("Erro ao buscar empréstimos:", error);
        }
    };

    // Função para verificar se há exemplares atrasados
    const verificarAtrasos = (emprestimos) => {
        const hoje = new Date();
        const atrasados = emprestimos.filter(livro => {
            const dataDevolucao = new Date(livro.dataDevolucao);
            return dataDevolucao < hoje; // Verifica se a data de devolução é anterior a hoje
        });
        setExemplaresAtrasados(atrasados);
    };

    // Função para converter string de data em objeto Date
    const converterData = (dataStr) => {
        const data = new Date(dataStr);
        return !isNaN(data.getTime()) ? data : null; // Verifica se a data é válida
    };

    // Função para ajustar a data adicionando um dia
    const ajustarData = (data) => {
        const novaData = new Date(data);
        novaData.setDate(novaData.getDate() + 1); // Adiciona um dia (24 horas)
        return novaData;
    };

    // Usar useEffect para buscar os empréstimos e verificar atrasos quando o componente é montado
    useEffect(() => {
        buscarEmprestimos();
    }, []);

    return (
        <>
            <div className={Styles.container}>
                <h3>Exemplares Atrasados</h3>
                <table className={Styles.userTable}>
                    <thead>
                        <tr>
                            <th>Exemplar</th>
                            <th>RM</th>
                            <th>CPF</th>
                            <th>Data Emprestimo</th>
                            <th>Data Devolução</th>
                            <th>Dias de Atraso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exemplaresAtrasados.length > 0 ? (
                            exemplaresAtrasados.map((livro, index) => {
                                const dataEmprestimo = ajustarData(converterData(livro.dataEmprestimo)) || 'Data inválida';
                                const dataDevolucao = ajustarData(converterData(livro.dataDevolucao)) || 'Data inválida';

                                const dataEmprestimoFormatada = dataEmprestimo instanceof Date && !isNaN(dataEmprestimo)
                                    ? dataEmprestimo.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                                    : dataEmprestimo;

                                const dataDevolucaoFormatada = dataDevolucao instanceof Date && !isNaN(dataDevolucao)
                                    ? dataDevolucao.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                                    : dataDevolucao;

                                // Calcular os dias de atraso
                                const hoje = new Date();
                                const diasAtraso = Math.floor((hoje - dataDevolucao) / (1000 * 60 * 60 * 24)); // Diferença em dias

                                return (
                                    <tr key={index}>
                                        <td>{livro.Exemplar}</td>
                                        <td>{livro.RM}</td>
                                        <td>{livro.CPF}</td>
                                        <td>{dataEmprestimoFormatada}</td>
                                        <td>{dataDevolucaoFormatada}</td>
                                        <td>{diasAtraso > 0 ? diasAtraso : 0}</td> {/* Mostra os dias de atraso */}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6">Nenhum exemplar em atraso.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Notificacao;
