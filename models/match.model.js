const { Schema, model } = require('mongoose');
const matchSchema = new Schema(
    {
    status: {
        type: String,
        enum: ["pending", "confirmed", "declined"],
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    //conversation: [{senderId}, {message}]
    
    },
    {
        timestamps: true
    }
)

module.exports = model('match', userSchema)