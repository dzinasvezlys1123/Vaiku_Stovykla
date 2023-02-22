export class Registration{
  public id:string|null=null;
  constructor(
    public name:string,
    public surname:string,
    public year:number,
    public gender:string,
    public email:string,
    public phone:string,
    public Class:number
  ) {
  }

}
