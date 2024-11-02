import {TicketList} from "@/components/tickets/TicketList.tsx";
import CreateTicket from "@/components/tickets/CreateTicket.tsx";

export default function Tickets() {
    return (
        <>
            <CreateTicket/>
            <TicketList />
        </>
    );
}