import {TicketList} from "@/components/tickets/TicketList.tsx";
import CreateTicket from "@/components/tickets/CreateTicket.tsx";
import {TicketSearch} from "@/components/tickets/TicketSearch.tsx";
import { useMemo, useState} from "react";
import debounce from 'lodash.debounce';

export default function Tickets() {
    const [search, setSearch] = useState<string>("");

    const debouncedSearch = useMemo(
        () => debounce((value: string) => {
            setSearch(value);
        }, 300),
        []
    );

    return (
        <>
            <div className={'flex mb-3 flex-row gap-2 justify-between'}>
                <CreateTicket/>
                <TicketSearch onChange={debouncedSearch} />
            </div>
            <TicketList searchValue={search} />
        </>
    );
}