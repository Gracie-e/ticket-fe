import useSWR from 'swr';
import {Ticket} from "@/types/models/tickets.ts";
import {ticketAPI} from "@/api-client/ticket-client.ts";

export function useTicket(id: number) {
    return useSWR<Ticket>(
        ticketAPI.getKeyById(id),
        () => ticketAPI.getOne(id)
    );
}

