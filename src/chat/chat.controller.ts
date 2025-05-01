// // chat.controller.ts
// import { Controller, Get } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// @Controller('chat')
// export class ChatController {
//   constructor(private prisma: PrismaService) {}

//   @Get('rooms')
//   async getRooms() {
//     const produits = await this.prisma.produit.findMany({
//       where: { status: 'APPROVED' },
//       select: { id: true, nom: true },
//     });
//     return produits.map((p) => ({ room: `produit_${p.id}`, name: p.nom }));
//   }
// }
