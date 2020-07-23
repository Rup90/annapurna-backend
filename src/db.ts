import * as mongoose from 'mongoose';

export default class Db {
    private mongoDb: string = 'XXXXXX';

    static async setupDb(db: Db): Promise<any> {
        return await mongoose.connect(db.mongoDb, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    }
}