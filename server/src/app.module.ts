import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { MongooseModule } from '@nestjs/mongoose';

// temporal
import { DB_USERNAME, DB_PASSWORD } from './const/config';

@Module({
  imports: [
    NoteModule,
    MongooseModule.forRoot(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.tbht77d.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
})
export class AppModule {}
