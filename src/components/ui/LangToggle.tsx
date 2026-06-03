import { useLang } from '@/context/LangContext';
import styles from './LangToggle.module.css';

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className={styles.wrap} role="group" aria-label="Language switcher">
      <button
        id="lbtn-en"
        className={`${styles.btn} ${lang === 'en' ? styles.on : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        id="lbtn-hi"
        className={`${styles.btn} ${styles.hi} ${lang === 'hi' ? styles.on : ''}`}
        onClick={() => setLang('hi')}
        aria-pressed={lang === 'hi'}
      >
        हिं
      </button>
    </div>
  );
}
