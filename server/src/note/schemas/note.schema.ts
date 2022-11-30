import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const NoteSchema = SchemaFactory.createForClass(Note);
