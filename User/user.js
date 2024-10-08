export class User {
    constructor(username, email, password) {
        this._username = username;
        this._email = email;
        this._password = password;
    }

    get username() {
        return this.username
    }

    set username(value) {
        this._username = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value)  {
        this._password = value;
    }


}

export class Admin extends User {
    constructor(name, email, password) {
        super(name, email, password);
    }


}

export class Driver extends User {
    constructor(name, email, password) {
        super(name, email, password);
    }
}