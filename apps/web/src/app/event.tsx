import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './page.module.css';
import { Event } from '../types'; 

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios.get<Event[]>('/api/events').then(response => {
      setEvents(response.data);
    });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        {events.map(event => (
          <div key={event.id} className={styles.card}>
            <h2>{event.name} &rarr;</h2>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
