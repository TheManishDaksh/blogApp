
import conf from "../conf/config"
import { Client, Account, ID} from "appwrite";

 export class AuthService{

    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.url)
        .setProjectId(conf.ProjectId);
            this.account = new Account(this.client);
        
    }
}

const authService = new AuthService();

export default authService;