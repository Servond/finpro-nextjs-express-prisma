import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Event, Registration, Transaction, Statistic, Report } from '../types';
import EventList from './dashboard/EventList';
import Registrations from './dashboard/Registrations';
import Transactions from './dashboard/Transactions';
import Statistics from './dashboard/Statistics';
import Reports from './dashboard/Reports';
import styles from './page.module.css';

const DashboardPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [eventsRes, registrationsRes, transactionsRes, statisticsRes, reportsRes] = await Promise.all([
          axios.get<Event[]>('http://localhost:3000/api/events', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          axios.get<Registration[]>('http://localhost:3000/api/registrations', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          axios.get<Transaction[]>('http://localhost:3000/api/transactions', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          axios.get<Statistic[]>('http://localhost:3000/api/statistics', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          axios.get<Report[]>('http://localhost:3000/api/reports', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        ]);
        setEvents(eventsRes.data);
        setRegistrations(registrationsRes.data);
        setTransactions(transactionsRes.data);
        setStatistics(statisticsRes.data);
        setReports(reportsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/edit-event/${id}`);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Organizer Dashboard</h1>
      <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />
      <Registrations registrations={registrations} />
      <Transactions transactions={transactions} />
      <Statistics statistics={statistics} />
      <Reports reports={reports} />
    </div>
  );
};

export default DashboardPage;
