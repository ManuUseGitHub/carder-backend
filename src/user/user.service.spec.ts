import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../services/prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get(PrismaService);
    await prisma.user.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be possible to sign up', async () => {
    const registred = await service.signUp({
      uid: 'aSO3CKrmpIR52eJwxyhrCzP4isA3',
      displayName: '',
      photoUrl: '',
      phoneNumber: '',
      email: 'jean.luc.e.verhan@gmail.com',
    });

    expect(registred).not.toBe(null);
  });
});
