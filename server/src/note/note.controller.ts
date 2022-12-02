import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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

  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  search(@Query('query') query: string, @Req() req: any) {
    const user = req.user as UserDto;
    return this.noteService.search(query, user);
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

  @Put('/pin/:id')
  @UseGuards(AuthGuard('jwt'))
  pinNote(@Param('id') id: ObjectId) {
    return this.noteService.pinNote(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteNote(@Param('id') id: ObjectId) {
    return this.noteService.deleteNote(id);
  }
}
