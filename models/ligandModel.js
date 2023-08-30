const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  ligand: {
    type: String,
    required: true
  },
  LogFC_Str_vs_Con: {
    x: {
        type: Double,
        required: true
      },
      y: {
        type: Double,
        required: true
      }
  },
  logFC_StrokeP4_vs_ControlP2: {
    type: Double,
    required: true
  },
  FDR_Str_vs_Con: {
    x: {
      type: Double,
      required: true
    },
    y: {
      type: Double,
      required: true
    }
  },
  FDR_StrokeP4_vs_ControlP2: {
    type: Double,
    required: true
  },
  receptor: {
    type: String,
    required: true
  },
  species: {
    x: {
      type: String,
      required: true
    },
    y: {
      type: String,
      required: true
    }
  },
  direct_source: {
    x: {
      type: String,
      required: true
    },
    y: {
      type: String,
      required: true
    }
  },
  ligand_cell: {
    type: String,
    required: true
  },
  receptor_cell: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ligand', dataSchema);