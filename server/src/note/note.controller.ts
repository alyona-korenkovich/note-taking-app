import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateNoteDto } from './dto';
import { NoteService } from './note.service';
import { UpdateNoteDto } from './dto';

import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { UserDto } from '../users/dto';

@Controller('/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createNote(@Body() createNoteDto: CreateNoteDto, @Req() req: any) {
    const user = req.user as UserDto;
    return this.noteService.createNote(createNoteDto, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getNotes(@Req() req: any) {
    const user = req.user as UserDto;
    return this.noteService.getNotes(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getNote(@Param('id') id: ObjectId) {
    return this.noteService.getNote(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  updateNote(@Param('id') id: ObjectId, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.updateNote(id, updateNoteDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteNote(@Param('id') id: ObjectId) {
    return this.noteService.deleteNote(id);
  }
}
