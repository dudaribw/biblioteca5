import Image from 'next/image';
import React from 'react';
import Style from '@/app/PagInicial/pagInicial.module.css';
import Link  from 'next/link';




const PagInicialSemCadastro = (props) => {
    return (

        <>
            <div className={Style.flexGrupo}>

                <div className={Style.flexBotao}>

                    <div className={Style.box}>

                        <button className={Style.botao}>
                        <Link href="./Devolucao">
                            <Image src="/devolução.jpg" alt="Button Image" width={200} height={200} />
                        </Link>
                        </button>
                        <label>Devolução</label>
                    </div>

                    <div className={Style.box}>

                        <button className={Style.botao}>
                        <Link href="./ConsultarReserva">
                            <Image src="/Consultar.png" alt="Button Image" width={200} height={200} />
                        </Link>
                        </button>
                        <label>Consultar Reserva</label>
                    </div>

                    <div className={Style.box}>

                        <button className={Style.botao}>
                        <Link href="./ConsultarSituacao">
                            <Image src="/livros.png" alt="Button Image" width={200} height={200} />
                        </Link>
                        </button>
                        <label>Consultar Todas Situações</label>
                    </div>


                    <div className={Style.box}>
                        <button className={Style.botao}>
                        <Link href="./Emprestimo">
                            <Image src="/Emprestimo.png" alt="Button Image" width={200} height={200} />
                        </Link>
                        </button>
                        <label>Empréstimo</label>
                    </div>

                    <div className={Style.box}>

                        <button className={Style.botao}>
                        <Link href="./Catalogo">
                            <Image src="/catalogo.jpg" alt="Button Image" width={200} height={200} />
                        </Link>
                        </button>
                        <label>Catalogação</label>
                    </div>
                </div>
                <br/>


                <div className={Style.flexBotao1}>

                    <div className={Style.box}>

                        <button className={Style.botao}>
                        <Link href="./SituacaoDoLivro">
                            <Image src="/situação do livro.avif" alt="Button Image" width={200} height={200} />
                        </Link>
                        </button>
                        <label>Situação do Livro</label>
                    </div>
                    <br/>

                    <div className={Style.box}>

                        <button className={Style.botao}>
                        <Link href="./ConsultarTitulo">
                            <Image src="/titulo.avif" alt="Button Image" width={200} height={200} />
                        </Link>
                        </button>
                        <label>Consultar Titulo</label>
                    </div>
                    <br/>
                    <div className={Style.box}>

                        <button className={Style.botao}>
                        <Link href="./Reserva">
                            <Image src="/reserva livro.webp" alt="Button Image" width={200} height={200} />
                        </Link>
                        </button>
                        <label>Reserva</label>
                    </div>
                    <br/>
                    <div className={Style.box}>

                        <button className={Style.botao}>
                        <Link href="./CColaborador">
                            <Image src="/cadastro.avif" alt="Button Image" width={200} height={200} />
                        </Link>
                        </button>
                        <label>Cadastrar colaborador</label>
                    </div> 
                    <br/>
                    <div className={Style.box}>

                        <button className={Style.botao}>
                        <Link href="./Atualizar">
                            <Image src="/atualização.jpg" alt="Button Image" width={200} height={200} />
                        </Link>
                        </button>
                        <label>Atualizar Acervo</label>
                    </div>

                </div>

            </div>
        </>
    )
}

export default PagInicialSemCadastro;

