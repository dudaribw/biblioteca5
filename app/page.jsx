'use client';
import { useState } from 'react';
import Styles from "@/app/Login/login.module.css";

const SignIn = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [msgError, setMsgError] = useState('');

  const handleEntrar = () => {
    const usuarioFixo = 'BIBLIOTECA';
    const senhaFixa = 'sesi242biblioteca';

    if (!usuario || !senha) {
      setMsgError('Por favor, preencha todos os campos.');
      return;
    }

    if (usuario === usuarioFixo && senha === senhaFixa) {
      const token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2) + "Amamos_DS_;-)";
      localStorage.setItem("token", token);
      localStorage.setItem("userLogado", JSON.stringify({ userCad: usuarioFixo, senhaCad: senhaFixa }));
      window.location.href = "../PagInicial"; // Redirecionar após login
    } else {
      setMsgError('Usuário ou senha incorretos');
      setUsuario('');
      setSenha('');
    }
  };

  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.titleContainer}>
        <h5>Entrar</h5>
      </div>
      <br />
      <div className={Styles.inputContainer}>
        <p>Usuário</p>
        <input
          value={usuario}
          placeholder="Usuário"
          required
          onChange={(ev) => setUsuario(ev.target.value)}
          className={Styles.inputBox}
        />
      </div>
      <br />
      <div className={Styles.inputContainer}>
        <p>Senha</p>
        <input
          type="password"
          value={senha}
          placeholder="Senha"
          required
          onChange={(ev) => setSenha(ev.target.value)}
          className={Styles.inputBox}
        />
      </div>
      <br />
      <div className={Styles.inputContainer}>
        <input
          className={Styles.inputButton}
          type="submit"
          onClick={handleEntrar}
          value={'Entrar'}
        />
      </div>
      {msgError && <div style={{ color: 'red' }}>{msgError}</div>}
    </div>
  );
};

export default SignIn;