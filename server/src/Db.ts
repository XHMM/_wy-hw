import { mongoose } from "@typegoose/typegoose";

export default class Db {
  async connect(uri: string): Promise<void> {
    await mongoose.connect(uri);
  }
}
