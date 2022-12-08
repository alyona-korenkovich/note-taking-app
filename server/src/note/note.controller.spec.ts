import { Connection, connect, Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { Note, NoteSchema } from './schemas/note.schema';
import { ObjectId } from 'mongodb';
import { UserDto } from '../users/dto';
import { getModelToken } from '@nestjs/mongoose';

describe('NoteController', () => {
  let appController: NoteController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let noteModel: Model<Note>;

  const user: UserDto = {
    // @ts-ignore
    id: new ObjectId('6389c46e0a06c9714ca284e0'),
    email: 'example@mail.ru',
  };

  const testNote = {
    title: 'Test title',
    content: 'Test content',
  };

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    noteModel = mongoConnection.model(Note.name, NoteSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        NoteService,
        { provide: getModelToken(Note.name), useValue: noteModel },
      ],
    }).compile();

    appController = app.get<NoteController>(NoteController);
  });

  describe('postNote', () => {
    it('should return the saved note', async () => {
      const createdNote = await appController.createNote(
        {
          ...testNote,
          owner: user,
          isPinned: false,
          dateCreated: undefined,
        },
        user,
      );

      expect(createdNote).not.toBeNull();
    });
  });

  describe('getNote', () => {
    it('should return the note with given noteId', async () => {
      const createdNote = await appController.createNote(
        {
          ...testNote,
          owner: user,
          isPinned: false,
          dateCreated: undefined,
        },
        user,
      );

      // @ts-ignore
      const note = await appController.getNote(createdNote._id);

      expect(note.title).toBe(testNote.title);
    });
  });

  describe('getNotes', () => {
    it('should return all the notes for the specified user', async () => {
      const notes = await appController.getNotes({ user: user });
      expect(notes).toBeDefined();
    });
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });
});
