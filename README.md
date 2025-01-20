# Node.js Server Hang: Client Closes Connection Early

This repository demonstrates a bug in a Node.js HTTP server where the server hangs if a client closes the connection before the server has finished sending the response.  The bug arises from not properly handling the 'close' event on the request object.

## Bug Description
The server simulates a long-running task. If a client closes the connection before the task completes and the response is sent, the server will hang. This happens because the 'end' event of the response is fired only after the long-running task is complete, but the connection has already been closed.

## Solution
The solution checks if the socket is already ended before writing the response. If the socket is ended, it prevents sending the response, thereby resolving the hang issue.

## How to Reproduce
1. Clone this repository.
2. Run `node bug.js`
3. Use a tool like `curl` or `wget` to make a request to `http://localhost:3000`.  Interrupt the request before it completes (e.g., using Ctrl+C).
4. Observe the server hanging.
5. Run `node bugSolution.js` and repeat steps 3 and 4. Observe that the server now handles the premature connection closure gracefully.