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
        <div className="space-y-4 max-h-screen overflow-auto pr-2 custom-scroll">
            {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket: Ticket) => (
                    <div key={ticket.id}>
                        <TicketCard ticket={ticket} />
                    </div>
                ))
            ) : (
                <p>No tickets found.</p>
            )}
        </div>
    );
}