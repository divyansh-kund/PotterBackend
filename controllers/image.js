const ImageHandle = (req,res,db)=>{
	const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>{
		res.status(400).json('ERRRRRRR')
	})
}

module.exports = {
    ImageHandle: ImageHandle
};