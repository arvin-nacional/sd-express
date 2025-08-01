import { z } from "zod";

export const ShippingCalculatorFormSchema = z.object({
  destination: z.string().min(1, { message: "Please select a destination" }),
  value: z.string()
    .min(1, { message: "Please enter a value" })
    .regex(/^\d+(\.\d+)?$/, { message: "Value must be a valid number" }),
  weight: z.string()
    .min(1, { message: "Please enter a weight" })
    .regex(/^\d+(\.\d+)?$/, { message: "Weight must be a valid number" }),
  type: z.string().min(1, { message: "Please select a type" }),
  length: z.string()
    .min(1, { message: "Please enter a length" })
    .regex(/^\d+(\.\d+)?$/, { message: "Length must be a valid number" }),
  width: z.string()
    .min(1, { message: "Please enter a width" })
    .regex(/^\d+(\.\d+)?$/, { message: "Width must be a valid number" }),
  height: z.string()
    .min(1, { message: "Please enter a height" })
    .regex(/^\d+(\.\d+)?$/, { message: "Height must be a valid number" }),
  insurance: z.boolean().default(false),
});

export const ProfileSchema = z.object({
  // clerkId: z.string().min(1, { message: "Please enter a clerk ID" }),

  lastName: z.string().min(1, { message: "Please enter a last name" }),

  firstName: z.string().min(1, { message: "Please enter a first name" }),
  contactNumber: z
    .string()
    .min(1, { message: "Please enter a contact number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  addressLine1: z.string().min(1, { message: "Please enter an address" }),
  addressLine2: z.string().min(1, { message: "Please enter an address" }),
  city: z.string().min(1, { message: "Please enter a city" }),
  province: z.string().min(1, { message: "Please enter a province" }),
  postalCode: z.string().min(1, { message: "Please enter a postal code" }),
  // country: z.string().min(1, { message: "Please enter a country" }),
  privacyPolicyAccepted: z.boolean(),
  addressId: z.string().optional(),
});

export const AddressSchema = z.object({
  addressLine1: z.string().min(1, { message: "Please enter an address" }),
  addressLine2: z.string().min(1, { message: "Please enter an address" }),
  city: z.string().min(1, { message: "Please enter a city" }),
  province: z.string().min(1, { message: "Please enter a province" }),
  postalCode: z.string().min(1, { message: "Please enter a postal code" }),
  contactNumber: z
    .string()
    .min(1, { message: "Please enter a contact number" }),
  name: z.string().min(1, { message: "Please enter a name" }),
  isDefault: z.boolean(),
});
export const ImageSchema = z.object({
  src: z.string().url(),
  alt: z.string().min(1, { message: "Please enter an alt text" }),
  _id: z.string().min(1).max(30),
});

export const PaymentSchema = z.object({
  images: z.array(
    z.object({
      src: z.string().url(),
      alt: z.string().min(1),
      _id: z.string().min(1).max(30),
    })
  ),
});

export const CreateOrderSchema = z.object({
  vendor: z.string().min(1, { message: "Please select a vendor" }),
  trackingNumber: z
    .string()
    .min(1, { message: "Please enter a tracking number" }),
  value: z.string().min(1, { message: "Please enter an item value" }),
  description: z.string(),
  address: z.string().min(1, { message: "Please select an address" }),
  type: z.string().min(1, { message: "Please select a type" }),
  orderId: z.string().optional(),
});

export const UpdateOrderSchema = z.object({
  status: z.string().min(1, { message: "Please select a status" }),
  paymentStatus: z
    .string()
    .min(1, { message: "Please select a payment status" }),
  finalAmount: z.string(),
  insurance: z.string(),
  miscellaneousFee: z.string(),
  localDeliveryFee: z.string(),
  discount: z.string(),
  airwayBillNumber: z.string(),
});

export const UpdatePackageSchema = z.object({
  vendor: z.string().min(1, { message: "Please select a vendor" }),
  trackingNumber: z
    .string()
    .min(1, { message: "Please enter a tracking number" }),
  value: z.string().min(1, { message: "Please enter an item value" }),
  description: z.string(),
  shipmentPrice: z.string(),
  status: z.string().min(1, { message: "Please select a status" }),
});
