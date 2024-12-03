      "use client";

import React, { useState } from 'react';
import Styles from '@/app/Catalogo/catalogo.module.css';

export default function Catalogo() {
  const [Exemplar, setExemplar] = useState('');
  const [autor, setAutor] = useState('');
  const [assunto, setAssunto] = useState('');
  const [nChamada, setNChamada] = useState('');
  const [acervo, setAcervo] = useState('');
  const [ISBN, setISBN] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [titulo, setTitulo] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const createAcervo = async (e) => {
    e.preventDefault();

    const requestBody = {
      Exemplar: Exemplar,
      Autor: autor,
      Título: titulo,
      Assunto: assunto,
      nChamada: nChamada,
      Acervo: acervo,
      ISBN: ISBN,
      Quantidade: quantidade,
    };

    try {
      const response = await fetch('http://localhost:3001/registraracervo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Atualizar a situação do exemplar para 'Disponível'
        await atualizarSituacaoExemplar(Exemplar, 'Disponível');

        setMensagemSucesso('Catálogo criado com sucesso!');
        setTimeout(() => {
          setMensagemSucesso(''); // Limpa a mensagem de sucesso
          window.location.reload(); // Recarrega a página
        }, 3000);

      } else {
        const errorMessage = `Erro ao criar catálogo, dados inválidos`;
        setMensagemErro(errorMessage);
        setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
      }
    } catch (error) {
      setMensagemErro('Erro ao criar catálogo: ' + error);
      setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
    }
  };

  // Função para atualizar a situação do exemplar
  const atualizarSituacaoExemplar = async (exemplar, situacao) => {
    try {
      // Buscar o exemplar atual
      const response = await fetch(`https://backend-5o6b.onrender.com//buscaracervo/${exemplar}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar o exemplar: ' + response.status);
      }

      const exemplarData = await response.json();

      // Atualizar apenas o campo Situacao
      const updatedData = {
        ...exemplarData,
        Situacao: situacao,
        // Inclua outros campos que você deseja preservar
      };

      // Enviar a atualização para o servidor
      const updateResponse = await fetch(`http://localhost:3001/atualizaracervo/${exemplar}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!updateResponse.ok) {
        const errorMessage = `Erro ao atualizar a situação do exemplar`;
        setMensagemErro(errorMessage);
        setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
      }
    } catch (error) {
      setMensagemErro('Erro ao atualizar a situação do exemplar: ' + error);
      setTimeout(() => setMensagemErro(''), 3000); // Limpa a mensagem de erro após 3 segundos
    }
  };

  return (
    <>
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

     <h3 className={Styles.h3}>Catalogar um novo exemplar</h3>

      <div className={Styles.inputContainer}>
        
        <p>
          Código do exemplar:
        </p>
        <input
          value={Exemplar}
          onChange={(e) => setExemplar(e.target.value)}
          className={Styles.inputBox} required />
      </div>
      <div className={Styles.inputContainer}>
        <p>
          Nome do autor:
        </p>
        <input
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          className={Styles.inputBox} required />
      </div>
      <div className={Styles.inputContainer}>
        <p>
          Título do exemplar:
        </p>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className={Styles.inputBox} required />
      </div>
      <div className={Styles.inputContainer}>
        <p>
          Código do assunto:
        </p>
        <input
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          className={Styles.inputBox} required />
      </div>

      <div className={Styles.inputContainer}>
        <p>
          Número de chamada:
        </p>
        <input
          value={nChamada}
          onChange={(e) => setNChamada(e.target.value)}
          className={Styles.inputBox} required />
      </div>

      <div className={Styles.inputContainer}>
        <p>
          Acervo:
        </p>
        <input
          value={acervo}
          onChange={(e) => setAcervo(e.target.value)}
          className={Styles.inputBox} required />
      </div>

      <div className={Styles.inputContainer}>
        <p>
          ISBN:
        </p>
        <input
          value={ISBN}
          onChange={(e) => setISBN(e.target.value)}
          className={Styles.inputBox} required />
      </div>

      <div className={Styles.inputContainer}>
        <p>
          Quantidade:
        </p>
        <input
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className={Styles.inputBox} required />
      </div>

      <div className={Styles.inputContainer}>
        <input className={Styles.inputButton} type="button" onClick={createAcervo} value={'Registrar'} />
      </div>
    </>
  );
}