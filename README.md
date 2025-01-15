# Queue-Implementation-Zaven

## Updated Implementation of Queue.ts

### Enqueue Method
- **Purpose**: Adds a message to the queue.
- **How it works**: The message is pushed to the `messages` array, which represents the queue.

### Dequeue Method
- **Purpose**: Removes and returns the first message from the queue for a specific worker.
- **Changes Made**:
  - Added `workerId` as a parameter to track which worker is processing which message.
  - After dequeuing a message, its `id` is stored in the `processingMessages` map with the worker ID as the key.
- **Why this change?**: The `Worker` class explicitly calls `Dequeue` with `workerId`, so this method needs to handle the worker-message mapping.

### Confirm Method
- **Purpose**: Marks a message as processed by removing the mapping of the worker ID to the message ID.
- **Changes Made**:
  - Added `workerId` as a parameter to ensure the worker that processed the message is the one confirming it.
  - Checks if the `messageId` matches the `processingMessages` entry for the given `workerId` before removing it.
- **Why this change?**: The `Worker` class explicitly calls `Confirm` with `workerId` and `messageId`, so this method needs to validate and clean up the worker-message mapping.

### Size Method
- **Purpose**: Returns the total size of the queue, including messages that are currently being processed.
- **How it works**: Combines the length of the `messages` array with the size of the `processingMessages` map.

---

## Suggestions for Improvement

### Worker Failure Handling
- If a worker crashes or fails to confirm a message, the `processingMessages` map may retain stale entries. A timeout or retry mechanism could be added to re-enqueue unconfirmed messages after a certain period.

### Enhanced Logging
- Add logging to the `Enqueue`, `Dequeue`, and `Confirm` methods to track the state of the queue and debug issues during execution.
