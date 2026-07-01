import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your event name']
    },
    description: {
        type: String,
        required: [true, "Please enter your event description!"]
    },
    category: {
        type: String,
        required: [true, "Please enter your event category"]
    },
    start_Date: {
        type: Date,
        required: true
    },
    Finish_Date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "Runnning"
    },
    tags: {
        type: String,
    },
    originalPrice: {
        type: Number,
    },
    discountPrice: {
        type: Number,
        required: [true, "Please enter your event price"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter your event stock"]
    },
    image: [
        {
            type: String,
        }
    ],
    shopId: {
        type: String,
        required: true
    },
    shop: {
        type: Object,
        required: true
    },
    sold_out:{
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Event = mongoose.model("Event", eventSchema)
export default Event;