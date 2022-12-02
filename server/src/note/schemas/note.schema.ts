import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDto } from '../../users/dto';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  isPinned: boolean;

  @Prop()
  dateCreated: Date;

  @Prop()
  owner: UserDto;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
