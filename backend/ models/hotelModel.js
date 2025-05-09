const mongoose = require('mongoose');

const hotelShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A hotel must have name'],
        unique:true
    },
    address: {
        type: String,
        required: [true, 'A hotel must have address']
    },
    ranking: {
        type: Number,
        default: 4.5,
        min:[1,'Ranking mus be above 1'],
        max: [5, 'Ranking mus be below 5']
    },
    price: {
        type: Number,
        required: [true, 'A hotel must have price']
    },
    price_discount:{
        type: Number
    },
    comfort:{
        type: String,
        required: [true, 'A hotel must have stars level'],
        enum:{
            values: ['1', '2','3','4','5','6','7']
        }
    },
    summary:{
        type: String,
        trim: true,
        required: [true, 'A hotel must have summary']
    },
    description:{
        type: String,
        trim: true
    },
    image_cover:{
        type: String
    },
    createdAt:{
        type:Date,
        default: Date.now(),
        select: false
    },
    
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

hotelShema.virtual('reviews',{
    ref: "Review",
    foreignField: 'hotel',
    localField: '_id'
})

const Hotel  = mongoose.model('Hotel', hotelShema);

module.exports = Hotel;