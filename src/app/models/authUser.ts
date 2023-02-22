export class AuthUser{
  
    public returnSecureToken=true;
    constructor(
        public email:string,
        public password:string
    ){

    }
}