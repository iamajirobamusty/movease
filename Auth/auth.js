import express from 'express'

const app = express()

class Auth {
    require_auth(path, excluded_path) {
        if (excluded_path.include(path)) {
            return false; 
        }
        return true;
    }

    authorization_header(req) {
        header = req.headers.keys();
        if (header.include('Authorization')) {
            return true;
        }
        return false;
    }

    current_user(req) {
        return;
    }
}

class BasicAuth extends Auth{
    
}

export const Auth = Auth();
export const BasicAuth = BasicAuth();


