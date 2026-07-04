import mongoose from 'mongoose'

const couponCodeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your coupon code name"]
    },
    value: {
        type: Number,
        required: true,
    },
    minAmount: {
        type: Number
    },
    maxAmount: {
        type: Number
    },
    shop: {
        type: Object,
        required: true,
    },
    selectedProduct: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Coupon = mongoose.model("Coupon", couponCodeSchema)
export default Coupon