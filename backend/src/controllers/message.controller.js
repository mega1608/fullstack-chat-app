import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId , io} from "../lib/socket.js"

export const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
       console.log("Error in getUsersForSidebar",error.message) 
       res.status(500).json({message:"Internal Server error"})
    }
}
export const getMessages = async (req,res)=>{
    try {
      const {id:userToChatId} = req.params
      const myId = req.user._id
      const messages = await Message.find({
        $or: [
            {senderId: myId, receiverId: userToChatId},
            {senderId: userToChatId,receiverId: myId}
        ]
      })
      res.status(200).json(messages)
    } catch (error) {
        console.log("Error in Get messages Controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // Send response only once
        res.status(201).json(newMessage);  

        // Emit socket event (AFTER response is sent)
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

    } catch (error) {
        console.log("Error in Send Message Controller", error.message);
        if (!res.headersSent) { // Prevent multiple responses
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};
