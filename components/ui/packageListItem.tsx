import Link from "next/link";
import React from "react";
// import { Button } from "./button";

interface Props {
  recipient: string;
  date: string;
  paymentStatus: string;
  trackingNumber: string;
  packageName: string;
  status: string;
  description: string;
  packageId: string;
}

const PackageListItem = ({
  recipient,
  date,
  paymentStatus,
  trackingNumber,
  packageName,
  status,
  description,
  packageId,
}: Props) => {
  return (
    <div className="border-b-2 border-red-500 py-2 flex gap-2 flex-wrap justify-between">
      <div className="flex flex-col gap-2 w-[95px] ">
        <p className="small-regular ">Package Name</p>
        <Link href={`/user/packages/${packageId}`}>
          {" "}
          <p className="body-regular hover:text-primary-500">{packageName}</p>
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-[95px] ">
        <p className="small-regular">Date</p>
        <p className="body-regular">{date}</p>
      </div>
      <div className="flex flex-col gap-2 w-[150px] ">
        <p className="small-regular">Description</p>
        <p className="body-regular">{description}</p>
      </div>
      <div className="flex flex-col gap-2 w-[80px] ">
        <p className="small-regular">Status</p>
        <p className="body-regular">{status}</p>
      </div>
      <div className="flex flex-col gap-2 w-[150px] ">
        <p className="small-regular">Recipient</p>
        <p className="body-regular">{recipient}</p>
      </div>
      <div className="flex flex-col gap-2 w-[150px] ">
        <p className="small-regular">Invoice</p>
        <p className="body-regular">Invoice Details</p>
      </div>
      <div className="flex flex-col gap-2 w-[100px] ">
        <p className="small-regular">Amount</p>
        <p className="body-regular">305 PHP</p>
      </div>
      <div className="flex flex-col gap-2 w-[100px] ">
        <p className="small-regular">Payment Status</p>
        <p className="body-regular">{paymentStatus}</p>
      </div>
      <div className="flex flex-col gap-2 w-[120px] ">
        <p className="small-regular">Tracking #</p>
        <p className="body-regular">{trackingNumber}</p>
      </div>
      {/* <Button className="border border-primary-500 rounded-3xl text-primary-500 ">
        Upload Payment
      </Button> */}
    </div>
  );
};

export default PackageListItem;