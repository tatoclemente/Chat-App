


const { Schema, model } = require('mongoose')


const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})



MessageSchema.method('toJSON', function() {

  const { __v, ...object } = this.toObject()

  return object

})

module.exports = model( 'Message', MessageSchema )