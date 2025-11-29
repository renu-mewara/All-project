const mongoose = require('mongoose');

const faqschema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    minlength: [2, 'Minimum 2 characters required'],
    maxlength: [300, 'Maximum 300 characters allowed'],
    validate: {
      validator: async function (v) {
        const data = await this.constructor.findOne({
          question: v,
          deleted_at: null,
        });
        return !data;
      },
      message: props => `This question is already added.`,
    },
  },

  answer: {
    type: String,
    required: true,
  },

  status: {
    type: Boolean,
    default: true, // better than 1
  },

  order: {
    type: Number,
    default: 0,
    min: [0, 'minimum value is 0'],
    max: [1000, 'maximum value is 1000'],
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },

  deleted_at: {
    type: Date,
    default: null,
  },
});

const faqmodel = mongoose.model('faq', faqschema);
module.exports = faqmodel;
