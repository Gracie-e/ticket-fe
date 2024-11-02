import TicketCard from "@/components/tickets/TicketCard.tsx";
import {Ticket} from "@/types/models/tickets.ts";
import useTickets from "@/hooks/tickets/useTickets.ts";

export const TicketList = () => {
    const { data: tickets, error, isLoading } = useTickets();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div >
            {tickets && tickets.length > 0 ? (
                tickets.map((ticket: Ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))
            ) : (
                <p>No tickets found.</p>
            )}
        </div>
    );
}