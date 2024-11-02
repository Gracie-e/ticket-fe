import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import validateNewTicket from "@/schema/CreateTicketSchema.tsx";
import { TicketStatus } from "@/types/models/tickets.ts";
import { ticketAPI } from "@/api-client/TicketClient.ts";
import { z } from "zod";
import { toast } from "@/hooks/use-toast.ts";
import { Button } from "@/components/ui/button.tsx";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input.tsx";

type FormValues = z.infer<typeof validateNewTicket>;

export const CreateTicketForm = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(validateNewTicket),
        defaultValues: {
            senderUserId: 0,
            receiverUserIds: [] as number[],
            title: "",
            description: "",
            status: TicketStatus.OPEN
        },
        mode: "onBlur"
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await ticketAPI.create(data);
            toast({
                title: "Success",
                description: "Ticket created successfully",
            });
            form.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            toast({
                title: "Error",
                description: "Failed to create ticket. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleReceiverIdsChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        try {
            const numberArray = value
                .split(",")
                .map(id => id.trim())
                .filter(Boolean)
                .map(id => {
                    const num = Number(id);
                    if (isNaN(num)) throw new Error("Invalid number");
                    return num;
                });

            form.setValue("receiverUserIds", numberArray, { shouldValidate: true });
        } catch {
            form.setError("receiverUserIds", {
                type: "manual",
                message: "Please enter valid numbers separated by commas"
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="senderUserId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sender User ID</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.value ? Number(e.target.value) : 0;
                                        field.onChange(value);
                                        form.trigger("senderUserId").catch(console.error);
                                    }}
                                    placeholder="Enter sender ID"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="receiverUserIds"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Receiver User IDs</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter receiver IDs (comma-separated)"
                                    onChange={handleReceiverIdsChange}
                                    value={field.value.join(", ")}
                                    onBlur={() => form.trigger("receiverUserIds").catch(console.error)}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter multiple IDs separated by commas
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter ticket title"
                                    onBlur={() => form.trigger("title").catch(console.error)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting || !form.formState.isValid}
                    >
                        {form.formState.isSubmitting ? 'Creating...' : 'Create Ticket'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateTicketForm;