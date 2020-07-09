import * as mongoose from 'mongoose';

export default class Db {
    private mongoDb: string = 'mongodb+srv://annapurna:zdZfMCCmUgIDMKa7@cluster0-1jruh.mongodb.net/annapurna?retryWrites=true&w=majority';

    static async setupDb(db: Db): Promise<any> {
        return await mongoose.connect(db.mongoDb, {useNewUrlParser: true, useUnifiedTopology: true});
    }
}