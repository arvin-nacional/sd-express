import { Schema, model, models, Document } from "mongoose";

export interface IAddress extends Document {
  userId: Schema.Types.ObjectId;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  contactNumber: string;
  name: string;
  isDefault: boolean;
}

const AddressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true },
  contactNumber: { type: String, required: true },
  name: { type: String, required: true },
  isDefault: { type: Boolean },
});

const Address = models.Address || model("Address", AddressSchema);
export default Address;
