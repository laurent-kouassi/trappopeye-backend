import WebSocket from 'ws';
import queryString from "query-string";


export default (expressServer) => {
    const websocketServer = new WebSocket.Server({
        noServer: true,
        path: "/websockets"
    });

    // attached websocket server to the existing express server
    // request : inbound http request from websocket client
    // socket  : network connection between the client and the server
    // head : packet/chunk of data for the inbound request
    expressServer.on("upgrade", (request, socket, head) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
            websocketServer.emit("connection", websocket, request);
        });
    });

    // handle the connection
    websocketServer.on("connection", (connection, request) => {
        const [path, param] = request?.url?.split("?");
        const connection_params = queryString.parse(param);

        console.log(connection_params);

        connection.on("message", message => {
            const parsedMessage = JSON.parse(message);
            console.log(parsedMessage);
        })
    })

    return websocketServer;
}