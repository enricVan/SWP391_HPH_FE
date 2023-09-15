const Validation = (values) =>{
    let errors ={}
    if(!values.name){
        errors.name = "Username is wrong"
    }
    else if(values.name.length < 5){
        errors.name ="Username is wrong"
    }
    if(!values.password){
        errors.password = "Password is wrong"
    }
    else if(values.password.length < 5){
        errors.password ="Password is wrong"
    }
    return errors;
}
export default Validation