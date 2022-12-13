class adminDTO {
  constructor({ _id, username, avatar, role }) {
    this.#_id = _id;
    this.#username = username;
    this.#avatar = avatar;
    this.#role = role;
  }
}

export { adminDTO };
