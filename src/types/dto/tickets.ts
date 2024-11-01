import {TicketStatus} from "@/types/base.ts";

interface CreateTicketDTO {
    senderUserId: number;
    receiverUserIds: number[];
    title: string;
    status?: TicketStatus; // default to open
}


export type {
    CreateTicketDTO
}