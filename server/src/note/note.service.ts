import { Injectable } from '@nestjs/common';
import { Note, NoteDocument } from './schemas/note.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async createNote() {}

  async getNotes() {
    return 'GET ALL NOTES FROM DB';
  }

  async getNote() {}

  async updateNote() {}

  async deleteNote() {}
}
