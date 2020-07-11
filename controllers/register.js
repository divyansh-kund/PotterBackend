const registerHandle= (req,res,bcrypt,db)=>{
	const {email,password,name,house}= req.body;
    if (!email || !password || !name ) {
       return res.status(400).json('incorrect FORM')
    } else{
        const hash = bcrypt.hashSync(password);
        db.transaction(trx=>{
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(LOGemail=>{
                return trx('users')
                .returning('*')
                .insert({
                    name:name,
                    email:LOGemail[0],
                    joined: new Date(),
                    house: house
                }).then(user=>{
                    res.json(user[0]);
                }).catch(err=>{
                    res.status(400).json("There was a problem Registering")
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
            .catch(err=>{
                res.status(400).json("The user already exists")
            })
        })
        .catch(err=> res.status[400].json('Completely unable to register'))
    }
}
module.exports = {
    registerHandle: registerHandle
};
