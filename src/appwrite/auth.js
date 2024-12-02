
import config from "../conf/config"
import { Client, Account, ID} from "appwrite";

 export class AuthService{

    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.url)
        .setProjectId(config.ProjectId);
            this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //login user direct
                return this.logIn(email,password)
            }else{
                return userAccount;
            }
        }catch(err){
            throw err;
        }
    }

    async logIn ({email,password}){
        try{
            return await this.account.createEmailSession(email,password)
        }catch(err){
            throw err;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch(err){
            throw err
        }
    }

    async logOut(){
        try{
            await this.account.deleteSession()
        }catch(err){
            throw err;
        }
    }
}

const authService = new AuthService();

export default authService;