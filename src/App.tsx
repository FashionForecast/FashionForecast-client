import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import styles from './App.module.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className={styles.logo} alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img
            src={reactLogo}
            className={`${styles.logo} ${styles.react}`}
            alt='React logo'
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <button
          onClick={() => setCount((count) => count + 1)}
          aria-activedescendant='sadf'
          aria-atomic
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <span className={styles.nesting}>scss nesting</span>
      </div>

      <div className={`${styles.box} ${styles.yellow}`} />
      <div className={`${styles.box} ${styles.blue}`} />

      <p className={styles['read-the-docs']}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
