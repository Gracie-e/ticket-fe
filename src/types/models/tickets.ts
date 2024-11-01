interface Ticket {
    id: number;
    title: string;
    createdAt: Date;
    status: TicketStatus
    ReceiverUserIds: number[];
    SenderUserId: number;
}


export enum TicketStatus {
    OPEN = 0,
    IN_PROGRESS = 1,
    RESOLVED = 2,
    CLOSED = 3,
}

export type {
    Ticket
}