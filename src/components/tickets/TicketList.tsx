import TicketCard from "@/components/tickets/TicketCard.tsx";
import {Ticket} from "@/types/models/tickets.ts";
import useTickets from "@/hooks/tickets/useTickets.ts";
import React, {useMemo} from "react";

interface TicketListProps {
    searchValue: string;
}

export const TicketList: React.FC<TicketListProps> = ({searchValue}) => {
    const { data: tickets, error, isLoading } = useTickets();

    const filteredTickets = useMemo(() => {
        if (!tickets) return [];
        if (!searchValue.trim() || searchValue.length === 0) return tickets;

        return tickets.filter(ticket =>
        ticket.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [searchValue, tickets])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <div >
            {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket: Ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))
            ) : (
                <p>No tickets found.</p>
            )}
        </div>
    );
}