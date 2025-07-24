class User_basic {
 constructor(public userName: string, public email: string, public password: string) {}

}   

const basic_user = new User_basic('Max', 'email@email.com', 'password123');

console.log(basic_user);