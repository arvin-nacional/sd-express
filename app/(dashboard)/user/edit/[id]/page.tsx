import Profile from "@/components/forms/Profile";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getUserByClerkId } from "@/lib/actions/user.action";
import React from "react";

type tParams = Promise<{ id: string }>;

const Page = async ({ params }: { params: tParams }) => {
  const { id } = await params;
  const result = await getUserByClerkId({ clerkId: id });

  return (
    <div className="w-full p-12 min-h-[90vh]">
      <div className="w-full flex justify-center items-center ">
        <div className="w-full max-sm:w-full">
          <Breadcrumb className="mb-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/user/profile">Profile</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit Profile</BreadcrumbPage>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator /> */}
              {/* <BreadcrumbItem>
              <BreadcrumbPage>Add</BreadcrumbPage>
            </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
          <Profile type="Edit" profileDetails={JSON.stringify(result.user)} />
        </div>
      </div>
    </div>
  );
};

export default Page;