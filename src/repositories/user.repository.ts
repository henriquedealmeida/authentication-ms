import { query } from "express";
import db from "../db";
import User from "../models/user.model";
import DatabaseError from "../models/database.error.models";

class UserRepository {
    async findAllUsers(): Promise<User[]> {
        const query = 'SELECT uuid, username FROM app_users';
        const {rows} = await db.query<User>(query);
        return rows || [];
    }

    async findUserById(uuid: String): Promise<User> {
        try {
            const query = 'SELECT uuid, username FROM app_users WHERE uuid = $1';
            const values = [uuid];
            const {rows} = await db.query<User>(query, values);
            const [user] = rows;
            return user;
        } catch (error) {
            throw new DatabaseError('Erro na busca por ID', error);
        }
    }

    async create(user: User): Promise<String> {
        const script = 'INSERT INTO app_users (username, password) VALUES ($1, crypt($2, my)) RETURNING uuid';
        const values = [user.username, user.password];
        const {rows} = await db.query<{uuid: String}>(script, values);
        const [newUser] = rows;
        return newUser.uuid;
    }

    async update(user: User): Promise<void> {
        const script = 'UPDATE app_users SET username = $1, password = crypt($2, my) WHERE uuid = $3';
        const values = [user.username, user.password, user.uuid];
        await db.query(script, values);
    }

    async remove(uuid: String): Promise<void> {
        const script = 'DELETE FROM app_users WHERE uuid = $1';
        const values = [uuid];
        await db.query(script, values);
    }
}

export default new UserRepository();