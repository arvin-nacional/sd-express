import { capitalizeWords } from "@/lib/utils";
import Link from "next/link";
import React from "react";
// import { Button } from "./button";

interface Props {
  recipient: string;
  date: string;
  finalAmount: number;
  trackingNumber: string;
  packageName: string;
  status: string;
  description: string;
  packageId: string;
  userType?: string;
  vendor?: string;
}

const PackageListItem = ({
  recipient,
  date,
  finalAmount,
  trackingNumber,
  packageName,
  status,
  description,
  packageId,
  userType,
  vendor,
}: Props) => {
  return (
    <div className="border-b-2 border-red-500 py-2 flex gap-2 flex-wrap justify-between max-sm:flex-col">
      <div className="flex flex-col gap-2 w-[95px] ">
        <p className="small-regular text-primary-400 ">Package Name</p>
        <Link
          href={
            userType === "admin"
              ? `/admin/shipping-carts/${packageId}`
              : `/user/packages/${packageId}`
          }
        >
          {" "}
          <p className="body-regular text-primary-500 hover:underline">{packageName}</p>
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-[95px] ">
        <p className="small-regular text-primary-400">Date</p>
        <p className="body-regular">{date}</p>
      </div>
      <div className="flex flex-col gap-2 w-[150px] ">
        <p className="small-regular text-primary-400">Description</p>
        <p className="body-regular">{description}</p>
      </div>
      <div className="flex flex-col gap-2 w-[120px] ">
        <p className="small-regular text-primary-400">Status</p>
        <p className="body-regular">{capitalizeWords(status)}</p>
      </div>
      <div className="flex flex-col gap-2 w-[150px] ">
        <p className="small-regular text-primary-400">Recipient</p>
        <p className="body-regular">{recipient}</p>
      </div>
      <div className="flex flex-col gap-2 w-[150px] ">
        <p className="small-regular text-primary-400">Vendor</p>
        <p className="body-regular">{vendor}</p>
      </div>
      <div className="flex flex-col gap-2 w-[100px] ">
        <p className="small-regular text-primary-400">Amount</p>
        <p className="body-regular">
          {finalAmount ? `${finalAmount} PHP` : "pending"}
        </p>
      </div>
      {/* <div className="flex flex-col gap-2 w-[100px] ">
        <p className="small-regular">Payment Status</p>
        <p className="body-regular">{paymentStatus}</p>
      </div> */}
      <div className="flex flex-col gap-2 w-[120px] ">
        <p className="small-regular text-primary-400">Tracking #</p>
        <p className="body-regular">{trackingNumber}</p>
      </div>
      {/* <Button className="border border-primary-500 rounded-3xl text-primary-500 ">
        Upload Payment
      </Button> */}
    </div>
  );
};

export default PackageListItem;
