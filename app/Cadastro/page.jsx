
"use client"

import { useState } from "react";
import Style from '@/app/Cadastro/cadastro.module.css';

const CADASTRO = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [Cemail, setCemail] = useState("");
    const [Dnasc, setDnasc] = useState("");
    const [Senha, setSenha] = useState("");
    const [Csenha, setCsenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Cadastro finalizado com sucesso! ${name}`);
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>

            <p className={Style.title} >
                <label>NOVO CADASTRO</label>
            </p>

            <form className={Style.form}>
                <label>Nome Completo:</label>
                <input type="text"
                    className={Style.inputBox}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <br />
                <label>Email:</label>
                <input type="text"
                    className={Style.inputBox}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />


                <br />
                <label>Confirmar email:</label>
                <input type="text"
                    className={Style.inputBox}
                    value={Cemail}
                    onChange={(e) => setCemail(e.target.value)}
                    required
                />

                <br />
                <label>Data de Nascimento:</label>
                <input type="date"
                    className={Style.inputBox}
                    value={Dnasc}
                    onChange={(e) => setDnasc(e.target.value)}
                    required
                />
                <br/>
                <label>Sexo: </label>
                <select className={Style.option}>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Outro">Outro</option>

                </select>

                <br />
                <label>Senha:</label>
                <input
                    className={Style.inputBox}
                    type={showPassword ? "text" : "password"}
                    value={Senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <br />

                <label>Confirmar Senha:</label>
                <input
                    className={Style.inputBox}
                    type={showPassword ? "text" : "password"}
                    value={Csenha}
                    onChange={(e) => setCsenha(e.target.value)}

                />

                <br />

                <br />
                <button className={Style.inputButton} onSubmit={handleSubmit} type="submit">Enviar</button>
            </form>

        </>
    );
};

export default CADASTRO;
