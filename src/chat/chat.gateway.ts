// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { PrismaService } from 'src/prisma/prisma.service';

// @WebSocketGateway({ cors: { origin: '*' } }) // À sécuriser en production
// export class ChatGateway {
//   @WebSocketServer()
//   server: Server;

//   constructor(private prisma: PrismaService) {}

//   @SubscribeMessage('joinRoom')
//   async handleJoinRoom(
//     client: Socket,
//     payload: { room: string },
//   ): Promise<void> {
//     const { room } = payload;
//     client.join(room);

//     // Récupérer les messages existants pour le salon
//     const messages = await this.prisma.message.findMany({
//       where: { room },
//       orderBy: { createdAt: 'asc' },
//       include: {
//         sender: { select: { email: true, profile: true } },
//       },
//     });

//     // Envoyer l'historique des messages au client
//     client.emit(
//       'messageHistory',
//       messages.map((msg) => ({
//         room: msg.room,
//         content: msg.content,
//         sender: { username: msg.sender.email, profile: msg.sender.profile },
//         timestamp: msg.createdAt,
//       })),
//     );

//     // Confirmer la connexion au salon
//     client.emit('message', {
//       content: `Bienvenue dans le salon "${room}" !`,
//       room,
//       timestamp: new Date(),
//     });
//   }

//   @SubscribeMessage('roomMessage')
//   async handleRoomMessage(
//     client: Socket,
//     payload: { room: string; message: string; senderId: number },
//   ): Promise<void> {
//     const { room, message, senderId } = payload;

//     // Enregistrer le message dans la base de données
//     const newMessage = await this.prisma.message.create({
//       data: {
//         content: message,
//         room,
//         senderId,
//         createdAt: new Date(),
//       },
//       include: {
//         sender: { select: { email: true, profile: true } },
//       },
//     });

//     // Préparer les données à diffuser
//     const messageData = {
//       room,
//       content: message,
//       sender: {
//         username: newMessage.sender.email,
//         profile: newMessage.sender.profile,
//       },
//       timestamp: newMessage.createdAt,
//     };

//     // Diffuser le message à tous les clients dans le salon
//     this.server.to(room).emit('message', messageData);
//   }
// }
