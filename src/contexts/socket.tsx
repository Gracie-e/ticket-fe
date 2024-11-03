import React, { createContext, useContext } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Ticket, TicketStatus } from '@/types/models/tickets';

interface SocketContextValue {
    connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
    sendTicket: (ticket: Ticket) => Promise<void>;
    updateTicketStatus: (ticketId: number, status: TicketStatus) => Promise<void>;
    lastReceivedTicket: Ticket | null;
    lastStatusUpdate: { ticketId: number; status: TicketStatus } | null;
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const userId = 1;

    const {
        connectionStatus,
        sendTicket,
        updateTicketStatus,
        lastReceivedTicket,
        lastStatusUpdate
    } = useWebSocket(userId);

    return (
        <SocketContext.Provider
            value={{
                connectionStatus,
                sendTicket,
                updateTicketStatus,
                lastReceivedTicket,
                lastStatusUpdate
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket(): SocketContextValue {
    const context = useContext(SocketContext);

    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }

    return context;
}