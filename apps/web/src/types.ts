import { ReactNode } from "react";
import { Key } from "readline";

export interface Event {
  eventId: Key | null | undefined;
  eventName: ReactNode;
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  availableSeats: number;
  
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  availableSeats: number;
}

export interface Registration {
  name: ReactNode;
  position: ReactNode;
  office: ReactNode;
  age: ReactNode;
  startDate: ReactNode;
  salary: ReactNode;
  id: number;
  eventId: number;
  attendeeName: string;
  attendeeEmail: string;
  registrationDate: string;
}

export interface Transaction {
  id: number;
  eventId: number;
  userId: number;
  amount: number;
  date: string;
}

export interface Statistic {
  value: any;
  id: any;
  eventId: number;
  totalRegistrations: number;
  totalRevenue: number;
}

export interface Report {
  id: number;
  name: string;
  eventId: number;
  reportDate: string;
  details: string;
}

