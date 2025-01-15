import { Message } from "./Database";

export class Queue {
    private messages: Message[];
    private processingMessages: Map<number, string>;

    constructor() {
        this.messages = [];
        this.processingMessages = new Map();
    }

    /**
     * Adds a new message to the queue.
    */
    Enqueue(message: Message): void {
        this.messages.push(message);
    }

    /**
     * Removes and returns the first message in the queue for the given worker.
     * Tracks the worker ID and the message ID in `processingMessages`.
    */
    Dequeue(workerId: number): Message | undefined {
        if (this.messages.length === 0) return undefined;
        const message = this.messages.shift();
        if (message) {
            this.processingMessages.set(workerId, message.id);
        }
        return message;
    }

    /**
     * Marks a message as processed by removing the worker-to-message mapping.
    */
    Confirm(workerId: number, messageId: string): void {
        const processingMessageId = this.processingMessages.get(workerId);
        if (processingMessageId === messageId) {
            this.processingMessages.delete(workerId);
        }
    }

    /**
     * Returns the total size of the queue, including messages being processed.
    */
    Size(): number {
        return this.messages.length + this.processingMessages.size;
    }
}
