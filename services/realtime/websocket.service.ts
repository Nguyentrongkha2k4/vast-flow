export function connectCameraSocket(onMessage: (data: any) => void) {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  };

  return ws;
}