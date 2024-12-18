import { Schema, models, model, Document } from "mongoose";

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  paymentLink: string;
}

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  paymentLink: { type: String },
});

const Order = models.Order || model("Order", OrderSchema);
export default Order;
