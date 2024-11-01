/* Client API requests for tickets.ts */
import fetcher from "@/lib/fetcher.ts";
import {Ticket} from "@/types/models/tickets.ts";
import {CreateTicketDTO} from "@/types/dto/tickets.ts";
const API_BASE_URL = import.meta.env.VITE_BASE_API_URL ?? 'http://localhost:3000/api/';


class TicketAPI {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL}/tickets`;
    }

    // GET
    async getOne(id: number): Promise<Ticket> {
        return fetcher<Ticket>(this.baseUrl + `/${id}`);
    }

    async getAll(): Promise<Ticket[]> {
        return fetcher<Ticket[]>(this.baseUrl);
    }

    async getSent(userId: number): Promise<Ticket[]> {
        return fetcher<Ticket[]>(this.baseUrl + `/sent/${userId}`);
    }

    async getReceived(userId: number): Promise<Ticket[]> {
        return fetcher(this.baseUrl + `/received/${userId}`);
    }

    //POST
    async create(dto: CreateTicketDTO): Promise<Ticket> {
        return fetcher<Ticket>(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(dto),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    getKeyById(id: number): string {
        return `${this.baseUrl}/${id}`;
    }

    getAllKey(): string {
        return this.baseUrl
    }

}

export const ticketAPI = new TicketAPI();

