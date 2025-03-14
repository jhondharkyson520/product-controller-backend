import { User } from "../../entities/user";

export interface UserRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<User>;
    delete(id: string): Promise<User>;
}
