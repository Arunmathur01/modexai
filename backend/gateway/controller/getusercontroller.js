
// user controller to get the user from the request object attached by the auth middleware
const getUserController = async (req, res) => {

    try{
        return res.status(200).json(req.user)

    }
    catch(error){   
return res.status(500).json({message:"Internal server error", error:error.message})
    }
}

export default getUserController;