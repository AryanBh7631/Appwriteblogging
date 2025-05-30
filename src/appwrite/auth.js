import conf from '../conf/conf';
import { Client, Account, ID } from "appwrite";

export class authService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        console.log(email, password, name)
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                // console.log("bhakk")
                return userAccount
            }
        } catch (error) {
            return error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {

        try {
            return await this.account.get();
        } catch (error) {
            console.log(error, "This is error")
            throw error
        }

        return null;
    }

    async logout() {

        try {
            return this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const AuthService = new authService()

export default AuthService

