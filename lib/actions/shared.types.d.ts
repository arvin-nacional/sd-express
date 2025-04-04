export interface CreateUserParams {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export interface createAddressParams {
  clerkId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
  contactNumber: string;
  path: string;
  name: string;
  isDefault: boolean;
}

export interface createPackageParams {
  clerkId: string;
  trackingNumber: string;
  address: string;
  description: string;
  value: string;
  vendor: string;
  type: string;
  orderId: string;
}

export interface GetUserByClerkIdParams {
  clerkId: string;
}
export interface GetUserByIdParams {
  userId: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface UpdateUserParams {
  clerkId: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
  privacyPolicyAccepted: boolean;
  path: string;
  addressId?: string;
  formType?: string;
}

export interface UpdateOrderParams {
  orderId: string;
  status: string;
  finalAmount: string;
  paymentStatus: string;
  insurance: string;
  miscellaneousFee: string;
  localDeliveryFee: string;
  path: string;
  discount: string;
  airwayBillNumber: string;
}

export interface PaymentImages {
  src: string;
  alt: string;
}

export interface SubmitPaymentParams {
  orderId: string;
  paymentImages: PaymentImages[];
  path: string;
}

export interface UpdatePackageParams {
  packageId: string;
  vendor: string;
  trackingNumber: string;
  value: string;
  description: string;
  shipmentPrice: string;
  status: string;
}

export interface FilterQueryParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface userPackagesParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
  clerkId: string;
}

export interface GetUserOrderParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
  clerkId?: string;
  userId?: string;
}
