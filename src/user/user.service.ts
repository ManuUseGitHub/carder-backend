import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { User } from '../models/user.entity';
import { SyncUser } from '../dtos/syncUser';

@Injectable()
export class UserService {
  async getUserByUid(uid: string) {
    return await this.prisma.user.findFirst({
      where: { uid: uid },
    });
  }
  constructor(private prisma: PrismaService) {}

  async signUp(user: SyncUser) {
    const newUSer: User = { ...user, dateJoin: new Date(), dateOfBirth: null };
    return this.prisma.user.create({ data: newUSer });
  }

  async sync(user: User) {
    let found;
    try {
      found = await this.prisma.user.findFirst({
        where: { uid: user.uid },
      });
    } catch (err) {}

    if (!found) {
      try {
        found = await this.prisma.user.findFirst({
          where: { email: user.email },
        });
      } catch (err) {}
      if (found) {
        await this.prisma.user.update({
          data: { ...user, dateJoin: new Date() },
          where: { email: user.email },
        });
      }
    }

    return found ? found : await this.signUp(user as SyncUser);
  }
}
