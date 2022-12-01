import { Injectable } from '@nestjs/common';
import { Note, NoteDocument } from './schemas/note.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateNoteDto, UpdateNoteDto } from './dto';
import { UserDto } from '../users/dto';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async createNote(dto: CreateNoteDto, user: UserDto) {
    return await this.noteModel.create({
      ...dto,
      isPinned: false,
      dateCreated: new Date(),
      owner: user,
    });
  }

  async getNotes(user: UserDto) {
    return this.noteModel.find({ owner: user });
  }

  async getNote(id: ObjectId) {
    return this.noteModel.findById(id);
  }

  async updateNote(id: ObjectId, dto: UpdateNoteDto) {
    return this.noteModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteNote(id: ObjectId) {
    return this.noteModel.findByIdAndDelete(id);
  }
}
