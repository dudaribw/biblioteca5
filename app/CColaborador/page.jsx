'use client';  // Especifica que este componente será renderizado no lado do cliente

import { useState } from "react";
import styles from '@/app/CColaborador/colaborador.module.css';

// Função principal que define o componente da página de criação de usuário
export default function CreateUserPage() {
  const [telefone, setTelefone] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [cpf, setCPF] = useState('');
  const [nome, setNome] = useState('');  // Declara o estado para o nome do usuário, inicialmente vazio
  const [email, setEmail] = useState('');  // Declara o estado para o email do usuário, inicialmente vazio
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Função para lidar com a mudança do telefone
  const testetele = (e) => {
    const value = e.target.value;
    if (value.length < 15) {
      setTelefone(value);
    }
  };

  const testecpf = (e) => {
    const value = e.target.value;
    if (value.length < 15) {
      setCPF(value);
    }
  };

  // Função assíncrona para criar um novo usuário ao submeter o formulário
  const createUser  = async (e) => {
    e.preventDefault();

    try {
      // Formata a data para o formato desejado
      const formattedDataNasc = new Date(dataNasc).toISOString().replace('T', ' ').replace('Z', '');

      const response = await fetch('https://backend-5o6b.onrender.com/registrarcolaborador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          cpf,
          dataNasc: formattedDataNasc
        }),
      });

      if (response.ok) {
        setMensagemSucesso('Colaborador criado com sucesso!');
        setTimeout(() => {
          setMensagemSucesso(''); // Limpa a mensagem de sucesso
          window.location.reload(); // Recarrega a página
        }, 2000); // Espera 2 segundos antes de recarregar
      } else {
        const errorMessage = `Erro ao criar colaborador, dados inválidos`;
        setMensagemErro(errorMessage);
        setTimeout(() => setMensagemErro(''), 3000);
      }
    } catch (error) {
      setMensagemErro('Erro ao criar usuário: ' + error);
      setTimeout(() => setMensagemErro(''), 3000);
    }
  };

  return (
    <>
      <p className={styles.title}>
        <label>Cadastro de Colaborador</label>
      </p>

      <form className={styles.form} onSubmit={createUser }>
        {mensagemSucesso && (
          <div className={styles.notificacao}>
            {mensagemSucesso}
          </div>
        )}
        {mensagemErro && (
          <div className={styles.notificacaoErro}>
            {mensagemErro}
          </div>
        )}
        <br />
        <label>Nome Completo:</label>
        <input type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)} required />

        <br />

        <label>Telefone:</label>
        <input type="text"
          value={telefone}
          onChange={testetele}  // Agora testetele está definido no escopo do componente
          required
          maxLength={15}
          placeholder="Digite seu telefone" />
        <br />

        <label>CPF:</label>
        <input type="text"
          value={cpf}
          onChange={testecpf}
          required
          maxLength={14}
          placeholder="Digite seu CPF" />

        <br />

        <label>Data de Nascimento:</label>
        <input
          className={styles.inputBox}
          type="date"
          value={dataNasc}
          onChange={(e) => setDataNasc(e.target.value)}
          min="1979-12-31"
          max="2020-01-02"
          required
        /> <br />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}  // O valor do campo é controlado pelo estado email
          onChange={(e) => setEmail(e.target.value)} required // Atualiza o estado email com o valor digitado pelo usuário
          className={styles.input}  /* Aplica o estilo de input definido no CSS Module */
        />
        <br />



        <br />
        <div className={styles.inputContainer}>
          <button className={styles.inputButton} onClick={createUser} type="submit">Criar</button>
        </div>
      </form>
    </>
  );
}