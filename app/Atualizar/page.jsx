"use client"

import React, { useState } from 'react'
import Styles from '@/app/Atualizar/atualizacao.module.css'

export default function Catalogo() {
    const [autor, setAutor] = useState('')
    const [titulo, setTitulo] = useState('')
    const [assunto, setAssunto] = useState('')
    const [numero, setNumero] = useState('')
    const [acervo, setAcervo] = useState('')
    const [ISBN, setISBN] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [Exemplar, setExemplar] = useState('');
    const [mensagemErroExemplar, setMensagemErroExemplar] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    const buscarExemplar = async () => {
        try {
            const response = await fetch(`https://backend-5o6b.onrender.com/buscaracervo/${Exemplar}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar o exemplar: ' + response.status);
            }

            const exemplarData = await response.json();
            // Preencher os inputs com os dados do exemplar
            setAutor(exemplarData.Autor);
            setTitulo(exemplarData.Título);
            setAssunto(exemplarData.Assunto);
            setNumero(exemplarData.nChamada);
            setAcervo(exemplarData.Acervo);
            setISBN(exemplarData.ISBN);
            setQuantidade(exemplarData.Quantidade);
            setMensagemSucesso('Exemplar encontrado com sucesso!');
            setTimeout(() => setMensagemSucesso(''), 3000); // Limpa a mensagem de sucesso após 3 segundos
        } catch (error) {
            setMensagemErroExemplar('Erro ao buscar o exemplar: ' + error);
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };

    const registrarExemplar = async () => {
        const situacao = 'Atualizado'; // Defina a situação que você deseja
        await atualizarExemplar(autor, assunto, numero, acervo, ISBN, quantidade, titulo, situacao);
    };

    const atualizarExemplar = async (autor, assunto, nChamada, acervo, ISBN, quantidade, titulo, situacao) => {
        try {
            const updatedData = {
                Autor: autor,
                Título: titulo,
                Assunto: assunto,
                nChamada: nChamada,
                Acervo: acervo,
                ISBN: ISBN,
                Quantidade: quantidade,
                Situacao: situacao,
            };

            const updateResponse = await fetch(`https://backend-5o6b.onrender.com/atualizaracervo/${Exemplar}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (!updateResponse.ok) {
                const errorMessage = `Erro ao atualizar a situação do exemplar`;
                setMensagemErroExemplar(errorMessage);
                setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
            } else {
                setMensagemSucesso('Exemplar atualizado com sucesso!');
                setTimeout(() => {
                    setMensagemSucesso(''); // Limpa a mensagem de sucesso
                    window.location.reload(); // Recarrega a página
                }, 2000); // Espera 2 segundos antes de recarregar
            }
        } catch (error) {
            setMensagemErroExemplar('Erro ao atualizar a situação do exemplar: ' + error);
            setTimeout(() => setMensagemErroExemplar(''), 3000); // Limpa a mensagem de erro após 3 segundos
        }
    };


    return (
        <>
        
            <form onSubmit={(e) => e.preventDefault()}>
                {mensagemSucesso && (
                    <div className={Styles.notificacao}>
                        {mensagemSucesso}
                    </div>
                )}

                {mensagemErroExemplar && (
                    <div className={Styles.notificacaoErro}>
                        {mensagemErroExemplar}
                    </div>
                )}

               

                <div className={Styles.div1}>
                    <h3 className={Styles.h3}>Atualize acervo</h3>
                    <br />
                    
                    <label className={Styles.form}>

                    
                        <input
                            className={Styles.inputB}
                            type="text"
                            name="codigodolivro"
                            placeholder="Código do Livro"
                            onChange={(e) => setExemplar(e.target.value)}
                            value={Exemplar} required />
                    </label>
                    <button onClick={buscarExemplar} type="button">Buscar</button>
                    <button onClick={() => setExemplar('')} type="button">Limpar</button>
                </div>

                <div className={Styles.inputContainer}>
                    <p>
                        Nome do autor:
                    </p>
                    <input
                        value={autor}
                        onChange={(ev) => setAutor(ev.target.value)}
                        className={Styles.inputBox}>
                    </input>
                </div>
                <div className={Styles.inputContainer}>
                    <p>
                        Título do exemplar:
                    </p>
                    <input
                        value={titulo}
                        onChange={(ev) => setTitulo(ev.target.value)}
                        className={Styles.inputBox} required>
                    </input>
                </div>
                <div className={Styles.inputContainer}>
                    <p>
                        Código do assunto:
                    </p>
                    <input
                        value={assunto}
                        onChange={(ev) => setAssunto(ev.target.value)}
                        className={Styles.inputBox} required>
                    </input>
                </div>

                <div className={Styles.inputContainer}>
                    <p>
                        Número de chamada:
                    </p>
                    <input
                        value={numero}
                        onChange={(ev) => setNumero(ev.target.value)}
                        className={Styles.inputBox} required>
                    </input>
                </div>

                <div className={Styles.inputContainer}>
                    <p>
                        Acervo:
                    </p>
                    <input
                        value={acervo}
                        onChange={(ev) => setAcervo(ev.target.value)}
                        className={Styles.inputBox} required>
                    </input>
                </div>

                <div className={Styles.inputContainer}>
                    <p>
                        ISBN:
                    </p>
                    <input
                        value={ISBN}
                        onChange={(ev) => setISBN(ev.target.value)}
                        className={Styles.inputBox} required>
                    </input>
                </div>

                <div className={Styles.inputContainer}>
                    <p>
                        Quantidade:
                    </p>
                    <input
                        value={quantidade}
                        onChange={(ev) => setQuantidade(ev.target.value)}
                        className={Styles.inputBox} required>
                    </input>
                </div>

                <div className={Styles.inputContainer}>
                    <input className={Styles.inputButton} type="button" value={'Registrar'} onClick={registrarExemplar} />
                </div>
            </form>
        </>
    )
}