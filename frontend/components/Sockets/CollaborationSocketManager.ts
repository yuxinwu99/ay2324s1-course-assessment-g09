import { io, Socket } from "socket.io-client";

class SocketManager {
	private socket: Socket | null = null;
	private socketId: string | null = null;
	private room: string | null = null;
	constructor() {
		this.initialize();
	}

	private initialize() {
		this.socket = io({
			path: "/collaboration_service/socket.io/",
		});

		this.socket.on("connect", () => {
			this.socketId = this.socket?.id || null;
			console.log(`collab socket connected on: ${this.socketId}`);
		});
	}

	public setRoom(r: string | null) {
		this.room = r;
	}

	public getRoom(): string | null {
		return this.room;
	}

	public subscribeToEvent(eventName: any, callback: any) {
		this.socket.on(eventName, callback);
	}

	public emitEvent(eventName: any, data: any) {
		this.socket.emit(eventName, data);
	}
}

const collabSocketManager = new SocketManager();
export default collabSocketManager;
