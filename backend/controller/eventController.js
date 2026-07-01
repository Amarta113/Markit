import { Shop } from "../models/shop.js";
import cloudinary from "../config/cloudinary.js";
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import Event from "../models/event.js";

export async function createEvent(req, res) {
    try {
        const shopId = req.body.shopId
        const shop = await Shop.findById(shopId)
        if (!shop) {
            return res.status(400).json({ message: "ShopID for event is invalid!" })
        }
        const files = req.files
        const imgData = files.map(file => ({
            public_id: file.filename.split('.')[0],
            url: file.path
        }))
        const eventData = {
            ...req.body,
            images: imgData,
            shop: shop._id
        }
        const event = await Event.create(eventData)
        res.status(201).json({ success: true, event })
    }
    catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}

export async function getAllEventsShop(req, res) {
    try {
        const events = await Event.find({ shopId: req.params.id })
        res.status(201).json({
            success: true,
            events
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function getAllEvents(req, res) {
    try {
        const events = await Events.find()
        res.status(201).json({success: true, events}) 
    }
    catch(error){
        console.error(error)
        res.status(500).json({success: false, message: "Internal server error!"})
    }
}

export async function deleteEvents(req, res) {
    try {
        const eventId = req.params.id;
        const eventData = await Event.findById(eventId)
        if (!eventData) {
            return res.status(404).json({ success: false, message: "Events not found with this id!" })
        }
        const deletionPromises = eventData.images.map(img => {
            const publicId = img.public_id;
            return cloudinary.uploader.destroy(`ecommerce_uploads/${publicId}`)
        })
        await Promise.all(deletionPromises);
        await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            success: true,
            message: "Event deleted succesffully!"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server Error" })
    }
}
