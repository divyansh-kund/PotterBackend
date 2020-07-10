const GetProfile=(req,res,db)=>{
	const {id} = req.params;
	db.select('*').from('users').where({
		id: id
	})
	.then(user=>{
		if (user.length>0) {
			res.json(user[0])
		}
		else{
			res.status(400).json('Error getting the user')
		}
	}).catch(err=>{
		res.status(400).json('ERRRR')
	})
}

module.exports = {
    GetProfile:GetProfile
};

