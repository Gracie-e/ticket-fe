import {
    Dialog,
    DialogContent, DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import CreateTicketForm from "@/forms/CreateTicketForm";
import {useState} from "react";

const CreateTicket = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
                <Button>New Ticket</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogDescription />
                    <DialogTitle>New Ticket</DialogTitle>
                </DialogHeader>
                <CreateTicketForm onSuccess={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

export default CreateTicket;