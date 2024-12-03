"use client"

import { useState } from "react";
import Styles from '@/app/SituacaoDoLivro/SituacaoLivro.module.css'

function Devolucao() {
  const [Exemplar, setExemplar] = useState('');
  const [livros, setLivros] = useState(null);
  const [mensagemErroExemplar, setMensagemErroExemplar] = useState('');

  const limparExemplar = () => {
    setLivros(null); // Corrigido para null ao invés de ''
    setExemplar('');
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

  return (
    <>
      <form>

        {mensagemErroExemplar && (
          <div className={Styles.notificacaoErro}>
            {mensagemErroExemplar}
          </div>
        )}

        <div className={Styles.divBusca}>
          <div className={Styles.divInput}>

            <h3>Busque pela situação do livro</h3>

            <input
              className={Styles.inputBox}
              type="text"
              placeholder="Exemplar"
              value={Exemplar}
              onChange={(e) => setExemplar(e.target.value)} // Atualiza o estado com o valor do input
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
                      <td>{livros.Exemplar}</td>
                    </tr>
                    <tr>
                      <td>Número de Chamada</td>
                      <td>{livros.nChamada}</td>
                    </tr>
                    <tr>
                      <td>Assunto</td>
                      <td>{livros.Assunto}</td>
                    </tr>
                    <tr>
                      <td>ISBN</td>
                      <td>{livros.ISBN}</td>
                    </tr>
                    <tr>
                      <td>Título</td>
                      <td>{livros.Título}</td>
                    </tr>
                    <tr>
                      <td>Autor</td>
                      <td>{livros.Autor}</td>
                    </tr>
                    <tr>
                      <td>Acervo</td>
                      <td>{livros.Acervo}</td>
                    </tr>
                    <tr>
                      <td>Situação</td>
                      <td>{livros.Situacao}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </form>
    </>
  )
}

export default Devolucao;