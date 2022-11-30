import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateNoteDto } from './dto/create-note.dto';
import { NoteService } from './note.service';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.createNote();
  }

  @Get()
  getNotes() {
    return this.noteService.getNotes();
  }

  @Get(':id')
  getNote(@Param('id') id: string) {
    return this.noteService.getNote();
  }

  @Put(':id')
  updateNote(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.updateNote();
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    return this.noteService.deleteNote();
  }
}
