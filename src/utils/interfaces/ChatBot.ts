import { ITracking } from ".";
import { EChatBotType } from "../enums/chat-bot.enum";

export interface IChatBot extends ITracking {
  question: string;
  answer: string;
  keywords: string;
  type: EChatBotType;
}
