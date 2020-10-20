const { Schema, model } = require('mongoose');
const matchSchema = new Schema(
    {
    status: {
        type: String,
        enum: ["pending", "confirmed", "declined"],
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
 
    
    },
    {
        timestamps: true
    }
)
module.exports = model("match", matchSchema)
