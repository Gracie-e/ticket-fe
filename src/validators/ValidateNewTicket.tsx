import {z} from "zod";
import {TicketStatus} from "@/types/models/tickets.ts";

const createTicketSchema = z.object({
    senderUserId: z.number().int().positive(),
    receiverUserIds: z.array(z.number().positive()),
    title: z.string().min(3, 'Title is required'),
    status: z.nativeEnum(TicketStatus).optional().default(TicketStatus.OPEN)
})


export default createTicketSchema;