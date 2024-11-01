import useSWR from "swr";
import {Ticket} from "@/types/models/tickets.ts";
import {ticketAPI} from "@/api-client/ticket-client.ts";

export default function useTickets(){
    return useSWR<Ticket[]>(
        ticketAPI.getAllKey(),
        () => ticketAPI.getAll()
    );
}