import Image from "next/image";
import Styles from '@/app/page.module.css';
import Link from 'next/link';

const HeaderCADASTRO = () => {
    return (
      <header>
        <nav>
          <div className={Styles.header}> 
        <Image 
        width={200}
        height={100}
        src='/sesi.png'
        alt="SESI" />
        <div className={Styles.title2}>
        <ul> Indústria - SÃO PAULO </ul>
        <ul>CE242 - Vinhedo</ul>
        </div>
        <div className={Styles.title}>
        <button> Cadastre-se (A)</button>
        
        </div>
        </div>
        </nav>
      </header>
    );
  };
  
  export default HeaderCADASTRO;