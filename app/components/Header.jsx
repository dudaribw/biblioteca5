import Image from "next/image";
import Styles from '@/app/page.module.css'
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className={Styles.header}>
        <Link

          href="./PagInicial">
          <Image
            width={200}
            height={100}
            src='/sesi.png'
            alt="SESI" />
        </Link>
        <div className={Styles.title2}>
          <ul> Serviço Social da Indústria - SÃO PAULO </ul>
          <ul>CE242 - Vinhedo</ul>
        </div>
        <div className={Styles.title}>

          <Link
            className={Styles.sino}
            href="./Notificacao">

            <Image

              width={20}
              height={20}
              src='/sino.png'
              alt="Notificacao" />

          </Link>


          <p> BEM VINDO(A) </p>
        </div>
      </div>
      <div className={Styles.naav}>

        <div>
        </div>
      </div>

    </header>

  );
};

export default Header;