'use client';

import { useState, useEffect } from "react";
import Styles from '@/app/Emprestimo/page.module.css';

export default function Emprestimo() {
    const [Exemplar, setExemplar] = useState('');
    const [RM, setRM] = useState('');
    const [aluno, setAluno] = useState(null);
    const [livros, setLivros] = useState(null);
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemErroAluno, setMensagemErroAluno] = useState('');
    const [mensagemErroExemplar, setMensagemErroExemplar] = useState('')



    const formatarData = (data) => {
        const dataObj = new Date(data);
        dataObj.setDate(dataObj.getDate() + 1); // Adiciona um dia
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return dataObj.toLocaleDateString('pt-BR', options);
    };


    const createReserva = async (e) => {
        e.preventDefault();

        // Verifique se o exemplar está emprestado
        if (livros && livros.Situacao === 'Emprestado') {
            // Atualizar a coluna Reserva para 'Reservado'
            const requestBody = {
                Exemplar: Exemplar,
                RM: RM || null,
                Reserva: 'Reservado' // Adiciona a coluna Reserva
            };

            try {
                const response = await fetch('https://backend-5o6b.onrender.com/reservar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {

                    // Atualizar o estado local para refletir a nova situação
                    setLivros(prevLivros => ({
                        ...prevLivros,
                        Situacao: 'Emprestado'
                    }));

                    setMensagemSucesso('Reserva criada com sucesso!');
                    setTimeout(() => {
                        setMensagemSucesso(''); // Limpa a mensagem de sucesso
                        window.location.reload(); // Recarrega a página
                    }, 3000); // Espera 3 segundos antes de recarregar

                } else {
                    const errorMessage = `Erro ao criar reserva, dados inválidos`;
                    setMensagemErro(errorMessage);
                    setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
                }
            } catch (error) {
                setMensagemErro('Erro ao criar reserva: ' + error);
                setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
            return; // Impede a criação do empréstimo
        }

        // Se não estiver emprestado, mostrar mensagem de erro
        setMensagemErro('O exemplar não está emprestado. Não é possível criar a reserva.');
        setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
    };



    const buscarAluno = async () => {

        try {
            const response = await fetch(`https://backend-5o6b.onrender.com/alunos/${RM}`);
            if (response.ok) {
                const alunoData = await response.json();
                setAluno(alunoData);
                setMensagemErroAluno(''); // Limpa a mensagem de erro, se houver
            } else {
                const errorMessage = `Erro ao buscar aluno: ${response.status}`;
                setMensagemErroAluno(errorMessage);
                setTimeout(() => setMensagemErroAluno(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErroAluno('Erro ao buscar aluno: ' + error);
            setTimeout(() => setMensagemErroAluno(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }

    };


    const buscarExemplar = async () => {
        try {
            const response = await fetch(`https://backend-5o6b.onrender.com/buscaracervo/${Exemplar}`);
            if (response.ok) {
                const exemplarData = await response.json();
                setLivros(exemplarData);
                setMensagemErroExemplar(''); // Limpa a mensagem de erro, se houver


            } else {
                const errorMessage = `Erro ao buscar Exemplar: ${response.status}`;
                setMensagemErroExemplar(errorMessage);
                setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErroExemplar('Erro ao buscar Exemplar: ' + error);
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    const limparCredenciais = () => {
        setRM('');
        setAluno(null);

    };

    const limparExemplar = () => {
        setLivros('');
        setExemplar('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede a ação padrão do Enter
        }
    };

    const handleNumericInput = (e, setValue) => {
        const value = e.target.value;
        // Filtra apenas números
        const numericValue = value.replace(/[^0-9]/g, '');
        setValue(numericValue);
    };


    return (
        <form onKeyDown={handleKeyDown}>
            {mensagemSucesso && (
                <div className={Styles.notificacao}>
                    {mensagemSucesso}
                </div>
            )}
            {mensagemErro && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErro}
                </div>
            )}
            {mensagemErroAluno && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErroAluno}
                </div>
            )}
            {mensagemErroExemplar && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErroExemplar}
                </div>
            )}

            

            <div className={Styles.divBusca}>
                <div className={Styles.divInput}>
                <h3>Busque aluno por RM</h3>
                    <input
                        className={Styles.inputBox}
                        type="text"
                        placeholder="RM"
                        value={RM}
                        onChange={(e) => handleNumericInput(e, setRM)}
                        required
                    />

                </div>
                <button className={Styles.inputButton} type="button" onClick={buscarAluno}>Buscar</button>
                <button className={Styles.inputButton} type="button" onClick={limparCredenciais}>Limpar</button>
            </div>

            <div className={Styles.infoAlunoColabExem}>
                <div className={Styles.agruparLista}>
                    <h3>Informações leitor</h3>
                    <table className={Styles.userTable}>
                        <thead>
                            <tr>
                                <th>Campo</th>
                                <th>Credencial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aluno && (
                                <>
                                    <tr>
                                        <td>Nome</td>
                                        <td>{aluno.nome}</td>
                                    </tr>
                                    <tr>
                                        <td>RM</td>
                                        <td>{aluno.rm}</td>
                                    </tr>
                                    <tr>
                                        <td>Sexo</td>
                                        <td>{aluno.sexo}</td>
                                    </tr>
                                    <tr>
                                        <td>Data Nascimento</td>
                                        <td>{formatarData(aluno.data_nascimento)}</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            

            <div className={Styles.divBusca}>
                <div className={Styles.divInput}>
                <h3>Busque livro por exemplar</h3>
                    <input
                        className={Styles.inputBox}
                        type="text"
                        placeholder="Exemplar"
                        value={Exemplar}
                        onChange={(e) => setExemplar(e.target.value)}
                    />
                </div>
                <button className={Styles.inputButton} type="button" onClick={buscarExemplar}>Buscar</button>
                <button className={Styles.inputButton} type="button" onClick={limparExemplar}>Limpar</button>
            </div>

            <div className={Styles.infoAlunoColabExem}>
                <div className={Styles.agruparLista}>
                    <h3>Informações sobre o exemplar</h3>
                    <table className={Styles.userTable}>
                        <thead>
                            <tr>
                                <th>Campo</th>
                                <th>Credencial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros && (
                                <>
                                    <tr>
                                        <td>Exemplar</td>
                                        <td>{livros.exemplar}</td>
                                    </tr>
                                    <tr>
                                        <td>Número de Chamada</td>
                                        <td>{livros.nchamada}</td>
                                    </tr>
                                    <tr>
                                        <td>Assunto</td>
                                        <td>{livros.assunto}</td>
                                    </tr>
                                    <tr>
                                        <td>ISBN</td>
                                        <td>{livros.isbm}</td>
                                    </tr>
                                    <tr>
                                        <td>Título</td>
                                        <td>{livros.título}</td>
                                    </tr>
                                    <tr>
                                        <td>Autor</td>
                                        <td>{livros.autor}</td>
                                    </tr>
                                    <tr>
                                        <td>Acervo</td>
                                        <td>{livros.acervo}</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className={Styles.divCreate}>
                <button className={Styles.inputButton} onClick={createReserva} type="submit">Reservar</button>
            </div>

        </form>
    );
}
