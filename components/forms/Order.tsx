"use client";
import React, { use, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CreateOrderSchema } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createPackage } from "@/lib/actions/package.action";
import { useUser } from "@clerk/nextjs";

interface Props {
  type?: string;
  orderDetails?: string;
  address?: string;
}

const Order = ({ type, orderDetails, address }: Props) => {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const form = useForm<z.infer<typeof CreateOrderSchema>>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      vendor: "",
      trackingNumber: "",
      value: "",
      description: "",
      address: "",
    },
  });

  const parsedAddress = JSON.parse(address || "{}");

  // todo
  // create a new package
  // create new order
  // edit an existing package

  async function onSubmit(data: z.infer<typeof CreateOrderSchema>) {
    startTransition(async () => {
      try {
        if (user) {
          await createPackage({
            clerkId: user.id,
            vendor: data.vendor,
            trackingNumber: data.trackingNumber,
            value: data.value,
            description: data.description,
            address: data.address,
          });
        } else {
          console.error("User is not authenticated");
        }
        router.push("/user/dashboard");
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="vendor"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Vendor Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter vendor name"
                />
              </FormControl>
              {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Value (PHP) <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter item value"
                />
              </FormControl>
              {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Description <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter item description"
                />
              </FormControl>
              {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tracking Number <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  placeholder="Enter tracking number"
                />
              </FormControl>
              {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Address <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-light-900">
                    {parsedAddress?.addresses.map((item: any) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name} - {item.contactNumber} - {item.addressLine1}
                        , {item.addressLine2}, {item.city}, {item.province},{" "}
                        {item.postalCode}
                      </SelectItem>
                    ))}

                    {/* <SelectItem value="defaultAddress">
                      Profile Address
                    </SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem> */}
                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription className="body-regular mt-2.5 text-light-500">
                Create a title for your post.
              </FormDescription> */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
        >
          {isPending ? (
            <>{type === "Edit" ? "Saving..." : "Submitting"}</>
          ) : (
            <>{type === "Edit" ? "Save" : "Submit"}</>
          )}
        </Button>
      </form>{" "}
    </Form>
  );
};

export default Order;