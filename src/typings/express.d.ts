import { PostDocument, UserDocument } from "src/common/schemas";

declare module 'express' {
  interface Request {
    user?: UserDocument;
    post?: PostDocument;
  }
}
