import { Base } from './base';
import { User } from '../models/user';

class Users extends Base {
    constructor() {
        super();

        this.url = '/admin/api/v1/users';
        this.model = User;
    }
}

export { Users };
