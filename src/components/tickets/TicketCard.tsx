import { CardContent, Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import * as React from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {Ticket} from "@/types/models/tickets.ts";
import {getTicketStatusString} from "@/utils/tickets.ts";

interface TicketCardProps {
    ticket: Ticket
}

const TicketCard: React.FC<TicketCardProps> = ({ticket}) => {
    return (
        <Card className="relative overflow-hidden">
            <CardHeader>
                <CardTitle>{ticket.title}</CardTitle>
                <CardDescription>{ticket.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground">
                    {new Date(ticket.createdAt).toLocaleTimeString('en-gb')}
                </div>
            </CardContent>
            <CardFooter>
                <Badge>{getTicketStatusString(ticket.status)}</Badge>
            </CardFooter>
            <div className="absolute -right-5 -bottom-5 w-10 h-10 transform rotate-45 bg-blue-500/30"/>
        </Card>
    )
};

export default TicketCard;