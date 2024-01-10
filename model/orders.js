const mongoose = require("mongoose");
const orders = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId, ref: 'users'
        },
        totalAmount: {
            type: Number
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
        
    },
    {timestamps: true}
)
module.exports = mongoose.model("orders",orders)