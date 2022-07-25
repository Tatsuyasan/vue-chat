export default class Message {
  constructor({ user, content, room }) {
    this.user = user;
    this.room = room;
    this.content = content;
    this.dateCreated = new Date();
  }
}
