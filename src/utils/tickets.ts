import {TicketStatus} from "@/types/models/tickets.ts";

 function getTicketStatusString(status: number): string {
    if (status === TicketStatus.OPEN) {
        return "Open";
    } else if (status === TicketStatus.IN_PROGRESS) {
        return "In Progress";
    } else if (status === TicketStatus.RESOLVED) {
        return "Resolved";
    } else if (status === TicketStatus.CLOSED) {
        return "Closed";
    } else {
        return "Unknown";
    }
}



export {
     getTicketStatusString
}