import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import CreateTicketForm from "@/forms/CreateTicketForm.tsx";


const CreateTicket = () => {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>New Ticket</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Ticket</DialogTitle>
                    <DialogDescription>
                        <CreateTicketForm />
                    </DialogDescription>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    );
}

export default CreateTicket;