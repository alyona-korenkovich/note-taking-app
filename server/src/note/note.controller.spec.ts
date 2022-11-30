import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

describe('NoteController', () => {
  let appController: NoteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService],
    }).compile();

    appController = app.get<NoteController>(NoteController);
  });

  describe('root', () => {
    it('should return "GET ALL NOTES FROM DB"', () => {
      expect(appController.getNotes()).toBe('GET ALL NOTES FROM DB');
    });
  });
});
