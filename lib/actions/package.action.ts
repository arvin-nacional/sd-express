/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import { createPackageParams } from "./shared.types";
import Package from "@/database/package.model";
import Order from "@/database/order.model";
import Counter from "@/database/counter.model";
import Address from "@/database/address.model";
import { revalidatePath } from "next/cache";

async function getNextSequence(name: string): Promise<number> {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

export async function createPackage(params: createPackageParams) {
  try {
    dbConnect();

    const {
      clerkId,
      trackingNumber,
      address,
      description,
      value,
      vendor,
      type,
      orderId,
    } = params;

    const user = await User.findOne({ clerkId });

    const newPackage = await Package.create({
      trackingNumber,
      description,
      value,
      vendor,
    });

    if (type === "singleOrder") {
      const orderNumber = await getNextSequence("orderNumber");
      const orderName = `SD-#${orderNumber + 1000}`;

      const newOrder = await Order.create({
        name: orderName,
        user: user._id,
        status: "Pending",
        packages: [newPackage._id],
        address: address,
      });

      const formatOrder = {
        ...newOrder.toObject(),
        _id: newOrder._id.toString(),
        user: newOrder.user.toString(),
        packages: newOrder.packages.map((p: any) => p.toString()),
        address: newOrder.address.toString(),
      };

      const formatPackage = {
        ...newPackage.toObject(),
        _id: newPackage._id.toString(),
      };

      return { order: formatOrder, package: formatPackage };
    } else if (type === "consolidation") {
      await Order.findByIdAndUpdate(orderId, {
        $push: { packages: newPackage._id },
      });

      const formatPackage = {
        ...newPackage.toObject(),
        _id: newPackage._id.toString(),
      };
      return { package: formatPackage };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error creating package");
  }
}

export async function getPackagesWithAddressDetails(clerkId: string) {
  const user = await User.findOne({ clerkId });
  try {
    // Fetch orders and populate the packages and their addresses
    const orders = await Order.find({ user })
      .populate({
        path: "packages",
        model: Package,
      })
      .populate({
        path: "address",
        model: Address,
      });

    // Extract packages from orders and include the order name
    const packages = orders.flatMap((order) =>
      order.packages.map(
        (pkg: { toObject: () => any; _id: { toString: () => any } }) => ({
          ...pkg.toObject(),
          _id: pkg._id.toString(),
          orderName: order.name, // Include the order name
          address: order.address.toObject(),
          packageId: order._id.toString(),
        })
      )
    );

    return packages;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving packages");
  }
}

export async function removePackage(packageId: string, pathname: string) {
  try {
    // Find the package by ID
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      throw new Error("Package not found");
    }

    // Find the order that references this package
    const order = await Order.findOne({ packages: packageId });

    if (order) {
      // Remove the package from the order
      order.packages.pull(packageId);
      await order.save();
    }

    // Delete the package
    await Package.findByIdAndDelete(packageId);

    // Revalidate the path
    revalidatePath(pathname);

    return { message: "Package removed successfully" };
  } catch (error) {
    console.log(error);
    throw new Error("Error removing package");
  }
}