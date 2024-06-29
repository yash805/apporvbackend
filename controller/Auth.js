const { User } = require("../model/User");

// exports.createUser = async (req, res) => {
//     const user = new User(req.body);
//     try {
//       const user = await user.save();
//       res.status(200).json(user);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   };

  exports.createUser = async (req, res) => {
    const user = new User(req.body);
    try {
      const doc = await user.save();
      res.status(200).json({id:doc.id,role:doc.role});
    } catch (err) {
      res.status(400).json(err);
    }
};


  exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
          res.status(401).json({message:'no such user or email'});
        }else if(user.password === req.body.password) {
            res.status(200).json({id:user.id, role:user.role} );
        }else{
            res.status(401).json({message:'invalid credentials'});
        }
        
      } catch (err) {
        res.status(400).json(err);
      }
   
  }