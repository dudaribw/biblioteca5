'use client';

import { useState } from "react";
import Styles from '@/app/ConsultarReserva/page.module.css';

export default function Emprestimo() {
    const [Exemplar, setExemplar] = useState('');
    const [reserva, setReserva] = useState(null);
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemErroAluno, setMensagemErroAluno] = useState('');
    const [mensagemErroExemplar, setMensagemErroExemplar] = useState('');
    const [mensagemErroColaborador, setMensagemErroColaborador] = useState('');



    const buscarExemplar = async () => {
        if (!Exemplar) {
            setMensagemErroExemplar('O campo Exemplar não pode estar vazio.');
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            return; // Retorna para não prosseguir com a requisição
        }

        try {
            // Primeiro, busque a reserva com base no exemplar
            const reservaResponse = await fetch(`https://backend-5o6b.onrender.com/todasreservas/${Exemplar}`);

            if (reservaResponse.ok) {
                const reservaData = await reservaResponse.json();
                if (reservaData) { // Verifica se a reservaData não está vazia
                    setReserva(reservaData); // Armazena as informações da reserva
                    setMensagemErroExemplar(''); // Limpa a mensagem de erro, se houver
                } else {
                    setMensagemErroExemplar('Exemplar não encontrado.');
                    setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
                }
            } else {
                const errorMessage = `Erro ao buscar Reserva: ${reservaResponse.status}`;
                setMensagemErroExemplar(errorMessage);
                setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            }
        } catch (error) {
            setMensagemErroExemplar('Erro ao buscar Exemplar: ' + error);
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };



    const limparExemplar = () => {
        setExemplar('');
        setReserva('')
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
            {mensagemErroColaborador && (
                <div className={Styles.notificacaoErro}>
                    {mensagemErroColaborador}
                </div>
            )}


            <div className={Styles.divBusca}>
                <div className={Styles.divInput}>

                    <h3>Busque um exemplar para consultar uma reserva</h3>


                    <input
                        className={Styles.inputBox}
                        type="text"
                        placeholder="Exemplar"
                        value={Exemplar}
                        onChange={(e) => setExemplar(e.target.value)}
                    />
                </div>
                <button className={Styles.inputButton} type="button" onClick={() => { buscarExemplar() }}>Buscar</button>
                <button className={Styles.inputButton} type="button" onClick={limparExemplar}>Limpar</button>
            </div>

            <div className={Styles.infoAlunoColabExem}>
                <div className={Styles.agruparLista}>
                    <h3>Informações sobre a reserva</h3>
                    <table className={Styles.userTable}>
                        <thead>
                            <tr>
                                <th>Exemplar</th>
                                <th>Credencial RM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reserva && reserva.length > 0 ? (
                                reserva.map((reserva, index) => (
                                    <tr key={index}>
                                        <td>{reserva.exemplar}</td>
                                        <td>{reserva.rm}</td>
                                        
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    
                                </tr>
                            )}
                        </tbody>
                        
                    </table>
                </div>
            </div>


        </form>
    );
}
