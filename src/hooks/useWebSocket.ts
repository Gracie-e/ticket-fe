import { useEffect, useCallback, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import {Ticket, TicketStatus} from "@/types/models/tickets.ts";


interface UseWebSocketReturn {
    connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
    sendTicket: (ticket: Ticket) => Promise<void>;
    updateTicketStatus: (ticketId: number, status: TicketStatus) => Promise<void>;
    lastReceivedTicket: Ticket | null;
    lastStatusUpdate: { ticketId: number; status: TicketStatus } | null;
}

export const useWebSocket = (userId: number): UseWebSocketReturn => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<UseWebSocketReturn['connectionStatus']>('disconnected');
    const [lastReceivedTicket, setLastReceivedTicket] = useState<Ticket | null>(null);
    const [lastStatusUpdate, setLastStatusUpdate] = useState<{ ticketId: number; status: TicketStatus } | null>(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_BASE_URL}/hubs/tickets`)
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: retryContext => {
                    if (retryContext.previousRetryCount === 0) {
                        return 0;
                    } else if (retryContext.previousRetryCount < 3) {
                        return 2000;
                    } else {
                        return 5000;
                    }
                },
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        setConnection(newConnection);

        return () => {
            newConnection.stop().catch(err => console.error('Error stopping connection:', err));
        };
    }, []);

    useEffect(() => {
        if (!connection) return;

        const startConnection = async () => {
            try {
                setConnectionStatus('connecting');
                await connection.start();
                await connection.invoke('RegisterUser', userId);
                setConnectionStatus('connected');
            } catch (err) {
                console.error('Error starting connection:', err);
                setConnectionStatus('error');
            }
        };

        // Set up event listeners
        connection.on('ReceiveTicket', (ticket: Ticket) => {
            setLastReceivedTicket(ticket);
        });

        connection.on('TicketStatusUpdated', (ticketId: number, status: TicketStatus) => {
            setLastStatusUpdate({ ticketId, status });
        });

        connection.onclose(() => {
            setConnectionStatus('disconnected');
        });

        connection.onreconnecting(() => {
            setConnectionStatus('connecting');
        });

        connection.onreconnected(() => {
            setConnectionStatus('connected');
        });

        startConnection();

        // Cleanup function
        return () => {
            if (connection) {
                connection.off('ReceiveTicket');
                connection.off('TicketStatusUpdated');
            }
        };
    }, [connection, userId]);

    const sendTicket = useCallback(async (ticket: Ticket): Promise<void> => {
        if (!connection || connectionStatus !== 'connected') {
            throw new Error('Connection is not established');
        }
        await connection.invoke('SendTicket', ticket);
    }, [connection, connectionStatus]);

    const updateTicketStatus = useCallback(async (ticketId: number, status: TicketStatus): Promise<void> => {
        if (!connection || connectionStatus !== 'connected') {
            throw new Error('Connection is not established');
        }
        await connection.invoke('UpdateTicketStatus', ticketId, status);
    }, [connection, connectionStatus]);

    return {
        connectionStatus,
        sendTicket,
        updateTicketStatus,
        lastReceivedTicket,
        lastStatusUpdate,
    };
};