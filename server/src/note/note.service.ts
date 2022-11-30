import { Injectable } from '@nestjs/common';

@Injectable()
export class NoteService {
  async createNote() {}

  async getNotes() {
    return 'GET ALL NOTES FROM DB';
  }

  async getNote() {}

  async updateNote() {}

  async deleteNote() {}
}
