"use client";

import { useState } from "react";
import Styles from '@/app/Devolucao/page.module.css';

function Devolucao() {
    const [Exemplar, setExemplar] = useState('');
    const [livros, setLivros] = useState([]); // Mudei para um array
    const [mensagemErroExemplar, setMensagemErroExemplar] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede a ação padrão do Enter
        }
    };

    const buscarEmprestimo = async () => {
        // Verifica se o exemplar já está na lista
        const exemplarExistente = livros.find(livro => livro.Exemplar === Exemplar);
        if (exemplarExistente) {
            setMensagemErroExemplar('Exemplar já identificado');
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            return; // Sai da função se o exemplar já estiver na lista
        }

        try {
            const response = await fetch(`https://backend-5o6b.onrender.com/buscaremprestimo/${Exemplar}`, {
                method: 'GET',
            });

            if (response.ok) {
                const exemplarData = await response.json();
                setLivros(prevLivros => [...prevLivros, exemplarData]); // Adiciona o novo exemplar à lista
                setMensagemErroExemplar(''); // Limpa a mensagem de erro, se houver
            } else {
                const errorMessage = `Erro ao buscar exemplar: ${response.status}`;
                setMensagemErroExemplar(errorMessage);
                setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErroExemplar('Erro ao buscar exemplar: ' + error);
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    const limparExemplar = () => {
        setExemplar('');
    };
    const limparTodos = () => {
        setLivros([]);
    };

    const removerExemplar = (index) => {
        setLivros(prevLivros => prevLivros.filter((_, i) => i !== index)); // Remove o exemplar pelo índice
    };

    // Função para formatar a data no formato brasileiro
    const formatarData = (data) => {
        const dataComAjuste = new Date(new Date(data).setDate(new Date(data).getDate() + 1));
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return dataComAjuste.toLocaleDateString('pt-BR', options);
    };

    const deletarEmprestimo = async (Exemplar) => {
        try {
            const response = await fetch(`https://backend-5o6b.onrender.com/deletaremprestimo/${Exemplar}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar o empréstimo: ' + response.status);
            }
        } catch (error) {
            setMensagemErro('Erro ao deletar o empréstimo: ' + error);
            setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    const devolverExemplar = async (Exemplar, index) => {
        try {
            // Buscar o exemplar atual
            const response = await fetch(`https://backend-5o6b.onrender.com/buscaracervo/${Exemplar}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar o exemplar: ' + response.status);
            }

            const exemplarData = await response.json();

            // Atualizar apenas o campo Situacao
            const updatedData = {
                ...exemplarData,
                Situacao: 'Disponivel',
                // Inclua outros campos que você deseja preservar
            };

            // Enviar a atualização para o servidor
            const updateResponse = await fetch(`https://backend-5o6b.onrender.com/atualizaracervo/${Exemplar}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (updateResponse.ok) {
                // Deletar o empréstimo
                await deletarEmprestimo(Exemplar);
                // Remover o exemplar da lista
                removerExemplar(index);
                setMensagemSucesso('Devolução feita com sucesso!');
                setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem após 3 segundos
            } else {
                const errorMessage = `Erro ao realizar devolução`;
                setMensagemErro(errorMessage);
                setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErro('Erro ao realizar devolução: ' + error);
            setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    const devolverTodosExemplares = async () => {
        try {
            for (let i = 0; i < livros.length; i++) {
                await devolverExemplar(livros[i].Exemplar, i); // Chama devolverExemplar para cada exemplar
            }
            setMensagemSucesso('Todos os exemplares devolvidos com sucesso!');
            setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem após 3 segundos
        } catch (error) {
            setMensagemErro('Erro ao devolver todos os exemplares: ' + error);
            setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    const handleNumericInput = (e, setValue) => {
        const value = e.target.value;
        // Filtra apenas números
        const numericValue = value.replace(/[^0-9]/g, '');
        setValue(numericValue);
    };

    return (
        <>
    
            <form onKeyDown={handleKeyDown}>
                {mensagemErroExemplar && (
                    <div className={Styles.notificacaoErro}>
                        {mensagemErroExemplar}
                    </div>
                )}
                {mensagemSucesso && (
                    <div className={Styles.notificacao}>
                        {mensagemSucesso}
                    </div>
                )}

                <div className={Styles.box1}>

                    <label className={Styles.form}>
                    <h3>Busque um exemplar para devolução</h3>

                    <br />

                        <input
                            className={Styles.inputBox}
                            type="text"
                            placeholder="Exemplar"
                            value={Exemplar}
                            onChange={(e) => setExemplar(e.target.value)}
                            required
                        />
                    </label>


                </div>

                <div className={Styles.bot}>
                    <button className={Styles.inputButton} type="button" onClick={buscarEmprestimo}>Buscar</button>
                    <button className={Styles.inputButton} type="button" onClick={limparExemplar}>Limpar</button>
                </div>

            </form>

            <div className={Styles.container}>
                <div className={Styles.agruparLista}>
                    <h3>Exemplares a Devolver:</h3>
                    <table className={Styles.userTable}>
                        <thead>
                            <tr>
                                <th>Exemplar</th>
                                <th>RM</th>
                                <th>CPF</th>
                                <th>Data Emprestimo</th>
                                <th>Data Devolução</th>
                                <th>Devolver Unidade</th>
                                <th>Remover</th>
                               

                            </tr>
                        </thead>
                        <tbody>
                            {livros.map((livro, index) => (
                                <tr key={index}>
                                    <td>{livro.exemplar}</td>
                                    <td>{livro.rm}</td>
                                    <td>{livro.cpf}</td>
                                    <td>{formatarData(livro.dataemprestimo)}</td>
                                    <td>{formatarData(livro.datadevolucao)}</td>

                                    <td className={Styles.ajuste}>
                                        <button
                                            className={Styles.devolvesolo}
                                            onClick={() => devolverExemplar(livro.Exemplar, index)}
                                        >
                                            Devolver
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={Styles.removerButton}
                                            onClick={() => removerExemplar(index)}
                                        >
                                            X
                                        </button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button className={Styles.devolveTodos} onClick={async () => {
                await devolverTodosExemplares(Exemplar);
                limparTodos();
            }}>Devolver Todos</button>
            <button className={Styles.devolveTodos} onClick={limparTodos}>Limpar Todos</button>
        </>
    );
}

export default Devolucao;