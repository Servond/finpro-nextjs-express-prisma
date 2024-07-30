'use client'

const BuyTicketButtonDay1 = () => {
    const handleClick = () => {
        alert(`Tiket masuk kekeranjang`)
    }
    return (
        <>
            <button
                onClick={handleClick}
                className="rounded mt-8 inline-block w-full bg-white py-4 text-sm font-bold uppercase tracking-widest text-blact"
            >
                BUY TICKET
            </button>
        </>
    )
}

export default BuyTicketButtonDay1;