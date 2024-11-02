import {Input} from "@/components/ui/input.tsx";
import React from "react";

interface TicketSearchProps {
    onChange: (value: string) => void;
}

export const TicketSearch: React.FC<TicketSearchProps> = ({onChange}) => {
    return(
        <>
        <Input
            onChange={(e) => onChange(e.target.value)}
            placeholder={"Search..."} />
        </>
    )
}