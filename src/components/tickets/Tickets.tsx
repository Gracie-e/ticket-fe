import useSWR from "swr";
import {Ticket} from "@/types.ts";
import fetcher from "@/lib/fetcher.ts";
import TicketCard from "@/components/tickets/TicketCard.tsx";

export const Tickets = () => {
    const { data: tickets, error, isLoading } = useSWR<Ticket[] | null>(
        `http://localhost:5015/api/Ticket/received/${1}`,
        fetcher
    );

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