import { UserDto } from '../../users/dto';

export class CreateNoteDto {
  readonly _id?: string;
  readonly title: string;
  readonly content: string;
  readonly isPinned: boolean;
  readonly dateCreated: Date;
  readonly owner: UserDto;
}
