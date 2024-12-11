import mongoose, { Schema } from "mongoose";

// Define an interface for the blacklist entry
interface IBlacklist {
  time: Date;
  userId: string;
  iat: number;
  exp: number;
  token: string;
}

// Create the schema for each blacklist entry
const BlacklistSchema = new Schema<IBlacklist>(
  {
    time: { type: Date, required: true },
    userId: { type: String, required: true },
    iat: { type: Number, required: true },
    exp: { type: Number, required: true },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true, collection: "Blacklist", versionKey: false }
);

// Export the Blacklist model
const BlackListModel = mongoose.model<IBlacklist>(
  "BlacklistModel",
  BlacklistSchema
);

export { BlackListModel };
