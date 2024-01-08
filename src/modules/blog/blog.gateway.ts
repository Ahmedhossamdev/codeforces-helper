


import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class BlogGateway {
  @WebSocketServer()
  server: Server;

  notifyVoteUpdate(blogData: any) {
    this.server.emit('voteUpdate', blogData);
  }
}
