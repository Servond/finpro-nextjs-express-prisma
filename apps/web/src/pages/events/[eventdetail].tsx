import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/app/global/components/navbar/Navbar';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import Reviews from '@/view/events/component/createform-view/components/formReview';
import Head from 'next/head';
import TransactionModal from '@/view/events/component/transaction-view/transactionModal';

const EventDetailPage = () => {
  const router = useRouter();
  const { eventdetail } = router.query;

  const [event, setEvent] = useState<any>(null);
  const [ticketCounts, setTicketCounts] = useState<{ [key: string]: number }>(
    {},
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const ticketsRef = useRef<HTMLDivElement>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [selectedTickets, setSelectedTickets] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [voucherCode, setVoucherCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState('');

  useEffect(() => {
    const fetchEventAndPromotions = async () => {
      try {
        if (!eventdetail) return;

        // Fetch event data
        const eventResponse = await fetch(
          `http://localhost:8080/api/events/${eventdetail}`,
        );
        if (!eventResponse.ok) {
          throw new Error('Failed to fetch event');
        }
        const eventData = await eventResponse.json();
        setEvent(eventData);

        // Fetch promotions data
        const promotionResponse = await fetch(
          `http://localhost:8080/api/events/${eventdetail}/promotions`,
        );
        if (!promotionResponse.ok) {
          throw new Error('Failed to fetch promotions');
        }
        const promotionData = await promotionResponse.json();
        setPromotions(promotionData);
      } catch (error) {
        console.error('Error fetching event or promotions:', error);
      }
    };

    fetchEventAndPromotions();
  }, [eventdetail]);

  const handleAddTicket = (ticketId: string, ticketPrice: number) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [ticketId]: (prevCounts[ticketId] || 0) + 1,
    }));

    setSelectedTickets((prevTickets) => {
      const existingTicketIndex = prevTickets.findIndex(
        (ticket) => ticket.id === ticketId,
      );

      if (existingTicketIndex !== -1) {
        const updatedTickets = [...prevTickets];
        updatedTickets[existingTicketIndex].count++;
        return updatedTickets;
      }

      const ticketToAdd = {
        id: ticketId,
        price: ticketPrice,
        count: 1,
      };

      return [...prevTickets, ticketToAdd];
    });

    setTotalPrice((prevTotal) => prevTotal + ticketPrice);
  };

  const handleRemoveTicket = (ticketId: string, ticketPrice: number) => {
    if (ticketCounts[ticketId] === 0 || !ticketCounts[ticketId]) {
      return;
    }

    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [ticketId]: (prevCounts[ticketId] || 0) - 1,
    }));

    setSelectedTickets((prevTickets) => {
      const existingTicketIndex = prevTickets.findIndex(
        (ticket) => ticket.id === ticketId,
      );

      if (existingTicketIndex !== -1) {
        const updatedTickets = [...prevTickets];
        updatedTickets[existingTicketIndex].count--;
        if (updatedTickets[existingTicketIndex].count === 0) {
          updatedTickets.splice(existingTicketIndex, 1);
        }
        return updatedTickets;
      }

      return prevTickets;
    });

    setTotalPrice((prevTotal) => prevTotal - ticketPrice);
  };

  const handleCheckout = () => {
    if (event.tickets && event.tickets.length === 0) {
      console.log('Checkout for free event');
      setCheckoutMessage('Your cart is free');
      setIsCheckoutModalOpen(true);
    } else if (Object.keys(ticketCounts).length === 0) {
      setCheckoutMessage('Please select your ticket type first');
      setIsCheckoutModalOpen(true);
      ticketsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsCheckoutModalOpen(true);
    }
  };

  const handleApplyVoucher = () => {
    const matchedPromotion = promotions.find(
      (promo) => promo.code === voucherCode && promo.type === 'discount',
    );

    if (matchedPromotion) {
      setDiscountPercentage(matchedPromotion.amount);
      setVoucherMessage('Voucher code applied successfully!');
    } else {
      setVoucherMessage('Invalid voucher code');
      setDiscountPercentage(0);
    }
  };

  const calculateDiscountedPrice = (total: number) => {
    const discountAmount = total * (discountPercentage / 100);
    return total - discountAmount;
  };

  const proceedToCheckout = () => {
    console.log('Proceeding to checkout logic here');
    router.push(`/events/${eventdetail}/checkout`);
  };

  const formatPrice = (price: number | null | undefined) => {
    if (!price || price === 0) {
      return 'Free';
    }
    return price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.ico" />
        <title>Eventify - Event Detail Page</title>
        <meta name="description" content="Discover Your Next Event" />
      </Head>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4">
          {event.imagePath ? (
            <Image
              src={`http://localhost:8080${event.imagePath}`}
              alt={event.eventTitle}
              width={940}
              height={470}
              className="w-[940px] h-[470px] object-cover rounded-lg"
            />
          ) : (
            <p className="text-center text-gray-600">No image available</p>
          )}
        </div>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-600 mb-2">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div>
            <button
              onClick={handleCheckout}
              className={`${
                totalPrice > 0
                  ? 'bg-red-500 hover:bg-red-400'
                  : 'bg-red-500 hover:bg-red-400'
              } text-white font-bold py-2 px-10 rounded`}
            >
              {totalPrice > 0
                ? `Checkout (${formatPrice(totalPrice)})`
                : 'Checkout'}
            </button>
          </div>
        </div>

        <div className="mb-2">
          <h1 className="text-5xl font-bold mb-2">{event.eventTitle}</h1>
          <div className="flex items-center mb-2">
            <p className="text-sm text-gray-600 font-bold">
              Organizer: {event.organizerName}
            </p>
            <p className="ml-4 text-sm font-bold text-gray-600">
              Price: {formatPrice(event.price)}
            </p>
          </div>
          <h2 className="text-xl font-bold mb-2">Event Details</h2>
          <p className="text-sm text-gray-600 mb-1">
            Location: {event.location}, {event.address}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            Category: {event.category ? event.category.name : 'Uncategorized'}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            Start Time: {event.startTime}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            End Time: {event.endTime}
          </p>
          <p className="text-sm text-gray-600 mb-1">Venue: {event.venueName}</p>
          <p className="text-sm text-gray-600 mb-1">
            Capacity: {event.capacity}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">About Event</h2>
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {event.description}
          </p>
        </div>

        <div ref={ticketsRef} className="mt-4">
          <h2 className="text-xl font-bold mb-2">Tickets</h2>
          {event.tickets && event.tickets.length > 0 ? (
            <div>
              {event.tickets.map((ticket: any) => {
                const ticketCount = ticketCounts[ticket.id] || 0;

                return (
                  <div key={ticket.id} className="mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 font-bold">
                          Type: {ticket.type}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          {ticket.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleAddTicket(ticket.id, ticket.price)
                          }
                          className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            handleRemoveTicket(ticket.id, ticket.price)
                          }
                          disabled={ticketCount === 0}
                          className={`${
                            ticketCount > 0
                              ? 'bg-red-500 hover:bg-red-400'
                              : 'bg-gray-300 cursor-not-allowed'
                          } text-white font-bold py-1 px-4 rounded ml-2`}
                        >
                          -
                        </button>
                        <p className="ml-4 text-sm text-gray-600">
                          {ticketCount} selected
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Price: {formatPrice(ticket.price)}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No tickets available</p>
          )}
        </div>

        <div className=" mb-10 text-black rounded-lg">
          <h2 className="text-md font-bold mb-4 mt-4 text-lg">
            Voucher and Discounts
          </h2>

          {promotions.length > 0 ? (
            promotions.map((promotion) => (
              <div
                key={promotion.id}
                className="border-2 border-black p-4 mb-4"
              >
                <p className="text-lg font-bold mb-2">
                  {promotion.type === 'referral' ? 'Referral Code' : 'Discount'}
                </p>
                <p className="text-md text-black mb-2">
                  {promotion.description}
                </p>
                <div className="grid grid-cols-2 gap-x-4 mb-2">
                  <p className="text-md text-black">
                    <span className="font-bold">
                      {promotion.type === 'discount'
                        ? 'Discount'
                        : 'Referral Code'}
                      :
                    </span>{' '}
                    {promotion.amount}%
                  </p>
                  <p className="text-md text-black">
                    <span className="font-bold">Code:</span> {promotion.code}
                  </p>
                  <p className="text-md text-black">
                    <span className="font-bold">Max Uses:</span>{' '}
                    {promotion.maxUses}
                  </p>
                  <p className="text-md text-black">
                    <span className="font-bold">Valid From:</span>{' '}
                    {new Date(promotion.startDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-md text-black">
                    <span className="font-bold">Expired:</span>{' '}
                    {new Date(promotion.endDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No promotions available</p>
          )}
        </div>
        <div className="mt-8">
          <Reviews eventId={Number(eventdetail)} />
        </div>
      </div>

      {isCheckoutModalOpen && (
        <TransactionModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          selectedTickets={selectedTickets}
          eventTickets={event.tickets}
          totalPrice={totalPrice}
          discountPercentage={discountPercentage}
          voucherCode={voucherCode}
          voucherMessage={voucherMessage}
          setVoucherCode={setVoucherCode}
          setDiscountPercentage={setDiscountPercentage}
          setVoucherMessage={setVoucherMessage}
          handleApplyVoucher={handleApplyVoucher}
          calculateDiscountedPrice={calculateDiscountedPrice}
          formatPrice={formatPrice}
        />
      )}
    </div>
  );
};

export default EventDetailPage;
