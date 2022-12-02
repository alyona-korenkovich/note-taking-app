export class UpdateNoteDto {
  readonly _id: string;
  readonly update_note: {
    readonly title: string;
    readonly content: string;
    readonly isPinned: boolean;
  };
  readonly dateCreated: Date;
}
