// blog.gateway.ts
import { WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class BlogGateway {
  @WebSocketServer()
  server: Server;


  // Handle events here
  // @SubscribeMessage("message")
  handleNewBlogPost(newBlogPost: any) {
    this.server.emit('newBlogPost', newBlogPost);
  }
}
