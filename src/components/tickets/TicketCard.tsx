import { CardContent, Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import * as React from "react";
import {Badge} from "@/components/ui/badge.tsx";
import { Ticket } from "@/types";
import {getTicketStatusString} from "@/lib/getTicketStatusString.ts";


interface TicketCardProps {
    ticket: Ticket
}

const TicketCard: React.FC<TicketCardProps> = ({ticket}) => {
    return (
        <Card className={'w-96 h-96'} >
            <CardHeader>
                <CardTitle>{ticket.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    {new Date(ticket.createdAt).toLocaleDateString()}
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Badge>{getTicketStatusString(ticket.status)}</Badge>
            </CardFooter>
        </Card>
    )
};

export default TicketCard;

