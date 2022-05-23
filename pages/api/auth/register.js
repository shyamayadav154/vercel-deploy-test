
// Users import user modal from db



export default function handler(req,res){
    const body = req.body
    // const user = await 
    // if(user){
    //     res.status(200).json({message:'Already registered'})
    //     return
    // }
    // const user = new Users(body);
    // generate salt to hash password using bycrypt or any other lib
    // const salt = wait bcrypt.genSalt(10);
    // user.password = await bcrypt.has(user.password,salt)
    // user.save()
    // res.status(200).json({message: 'Registered Successfully})  


             res.redirect(307, '/');
  


}