import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import PackageListItem from "@/components/ui/packageListItem";
import { PackageFilters } from "@/constants/filters";
import Filter from "@/components/shared/search/Filter";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getPackagesWithAddressDetails } from "@/lib/actions/package.action";
import { formatDate } from "@/lib/utils";

const page = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User ID is null");
  }

  const result = await getPackagesWithAddressDetails(userId);
  console.log(result);

  return (
    <div className="p-12 w-full" style={{ minHeight: "90vh" }}>
      <p className="h2-semibold text-primary-500 mb-5">All Packages</p>
      <div className="mb-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/user/packages"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search Items"
          otherClasses="flex-1"
        />
        <Filter
          filters={PackageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      {result?.map((item) => (
        <div key={item._id}>
          <PackageListItem
            recipient={item.address.name}
            date={formatDate(item.createdAt)}
            packageName={item.orderName}
            status={item.status}
            paymentStatus={item.paymentStatus}
            trackingNumber={item.trackingNumber}
            description={item.description}
            packageId={item.packageId}
          />
        </div>
      ))}
    </div>
  );
};

export default page;