export interface UserDto {
  username: string;
}

export default class User {
  username!: string;
  constructor(dto: UserDto) {
    Object.assign(this, dto);
  }
}
