import {TicketStatus} from "@/types/models/tickets.ts";

interface CreateTicketDTO {
    senderUserId: number;
    receiverUserIds: number[];
    title: string;
    status?: TicketStatus; // default to open
}


export type {
    CreateTicketDTO
}