import { Base } from './base';

class User extends Base {
    static resourceUrl = /users/;
    static AVATAR_WIDTH = '256';
    static AVATAR_HEIGHT = '256';
    static DEFAULT_AVATAR = '/admin/dist/img/default-avatar.png';
    static DEFAULT_AVATAR_MINI = '/admin/dist/img/default-avatar-mini.png';

    constructor(data) {
        super();

        this.id = data.id || null;
        this.avatar = data.avatar || '';
        this.username = data.username || '';
        this.email = data.email || '';
        this.created = data.created || '';
        this.is_activated = data.is_activated || false;
        this.is_admin = data.is_admin || false;
    }

    getAvatar() {
        return this.avatar || User.DEFAULT_AVATAR;
    }

    getAvatarMini() {
        return this.avatar || User.DEFAULT_AVATAR_MINI;
    }
}

export { User };
