import JenisTicket from '@/data/ticket.json'
import ReviewUser from '@/components/ReviewUser/ReviewUser'
import RegularTicketsDay1 from '@/components/RegularTickets/RegularTicketsDay1'
import RegularTicketsDay2 from '@/components/RegularTickets/RegularTicketDay2'

const Tickets = () => {
    return (
        <>
            <div className="">
                <div className="mx-auto my-20 max-w-lg text-center">
                    <p className="text-4xl font-serif lg:text-5xl">Ticket Category</p>
                </div>

                {/* Ticket Day 1 */}
                <div key={JenisTicket[0].mal_id}>
                    <RegularTicketsDay1 />
                </div>


                {/* Ticket Day 2 */}
                <div key={JenisTicket[1].mal_id}>
                    <RegularTicketsDay2 />
                </div>
            </div>

            <ReviewUser />
        </>
    )
}

export default Tickets;