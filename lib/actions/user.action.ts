"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  FilterQueryParams,
  GetUserByClerkIdParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Address from "@/database/address.model";
import { FilterQuery } from "mongoose";
import { clerkClient } from "@clerk/nextjs/server";

export async function createUser(userData: CreateUserParams) {
  try {
    dbConnect();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating user");
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    dbConnect();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // delete address from database
    // delete orders from database

    return { user };
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting user");
  }
}

export async function getUserIdByClerkId(params: GetUserByClerkIdParams) {
  try {
    dbConnect();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    return { userId: user._id.toString() }; // Convert ObjectId to string
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user ID");
  }
}

export async function getUserByClerkId(params: GetUserByClerkIdParams) {
  try {
    dbConnect();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId }).populate({
      path: "address",
      model: Address,
    });
    if (!user) {
      throw new Error("User not found");
    }
    const userWithFormattedDate = {
      ...user.toObject(),
      _id: user._id.toString(), // Convert ObjectId to string
      joinedAt: user.joinedAt.toISOString(), // Format Date to ISO string
    };
    return { user: userWithFormattedDate };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user");
  }
}

export async function getUserByClerkIdFromCreate(
  params: GetUserByClerkIdParams
) {
  try {
    dbConnect();

    const { clerkId } = params;

    // Retry logic to wait for the user to be created
    const maxRetries = 60; // Maximum number of retries
    const retryInterval = 1000; // Interval between retries in milliseconds

    let user = null;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      user = await User.findOne({ clerkId }).populate("address");
      if (user) {
        break; // Exit loop if the user exists
      }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
      } else {
        throw new Error("User not found after maximum retries");
      }
    }

    const userWithFormattedDate = {
      ...user.toObject(),
      _id: user._id.toString(), // Convert ObjectId to string
      joinedAt: user.joinedAt.toISOString(), // Format Date to ISO string
    };

    return { user: userWithFormattedDate };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user");
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    dbConnect();

    const {
      clerkId,
      firstName,
      lastName,
      contactNumber,
      email,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      privacyPolicyAccepted,
      path,
      addressId,
      formType,
    } = params;

    if (formType === "Create") {
      const client = await clerkClient();

      await client.users.updateUserMetadata(clerkId, {
        publicMetadata: {
          verified: true,
        },
      });
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.privacyPolicyAccepted = privacyPolicyAccepted;
    user.verified = true;
    

    // Create or update address in the address collection
    const address = {
      name: `${firstName} ${lastName}`,
      userId: user._id,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      contactNumber,
      
    };

    let userAddress;
    if (addressId) {
      userAddress = await Address.findByIdAndUpdate(addressId, address, {
        new: true,
      });
    } else {
      userAddress = await Address.create({...address, isDefault: true});
    }
    user.address = userAddress._id;
    await user.save();

    const userWithFormattedDate = {
      ...user.toObject(),
      _id: user._id.toString(), // Convert ObjectId to string
      joinedAt: user.joinedAt.toISOString(), // Format Date to ISO string
      address: user.address.toString(),
    };
    revalidatePath(path);

    return { user: userWithFormattedDate };
  } catch (error) {
    console.log(error);
    throw new Error("Error updating user");
  }
}

export async function isUserVerified(params: GetUserByClerkIdParams) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    const { clerkId } = params;

    // Log the clerkId being searched
    console.log("Checking verification status for Clerk ID:", clerkId);

    // Query the user from the database
    const user = await User.findOne({ clerkId });

    // Log the user data for debugging
    console.log("User found:", user);

    if (!user) {
      // Log and throw an error if user is not found
      console.error(`User not found for Clerk ID: ${clerkId}`);
      return { verified: false }; // Return default verified status as false
    }

    // Ensure `user.verified` is a Boolean and return it
    const isVerified = Boolean(user.verified);
    console.log(
      `User verification status for Clerk ID ${clerkId}:`,
      isVerified
    );

    return { verified: isVerified };
  } catch (error) {
    // Log the error for debugging
    console.error("Error in isUserVerified:", error);
    return { verified: false }; // Return a default fallback
  }
}

export async function getUserCount() {
  try {
    dbConnect();

    const userCount = await User.countDocuments();

    return userCount;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user count");
  }
}

export async function getRecentUsers() {
  try {
    dbConnect();

    const recentUsers = await User.find()
      .sort({ joinedAt: -1 })
      .limit(5)
      .populate("address");

    const usersWithFormattedDate = recentUsers.map((user) => ({
      ...user.toObject(),
      _id: user._id.toString(), // Convert ObjectId to string
      joinedAt: user.joinedAt.toISOString(), // Format Date to ISO string
    }));

    return { users: usersWithFormattedDate };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching recent users");
  }
}

export async function getAllUsers(params: FilterQueryParams) {
  try {
    dbConnect();

    const { searchQuery, page = 1, pageSize = 7 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { firstName: { $regex: searchQuery, $options: "i" } },
        { lastName: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .populate("address")
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    const usersWithFormattedDate = users.map((user) => ({
      ...user.toObject(),
      _id: user._id.toString(), // Convert ObjectId to string
      joinedAt: user.joinedAt.toISOString(), // Format Date to ISO string
    }));

    return { users: usersWithFormattedDate, isNext };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching all users");
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    dbConnect();

    const { userId } = params;

    const user = await User.findById(userId).populate({
      path: "address",
      model: Address,
    });
    if (!user) {
      throw new Error("User not found");
    }

    const userWithFormattedDate = {
      ...user.toObject(),
      _id: user._id.toString(), // Convert ObjectId to string
      joinedAt: user.joinedAt.toISOString(), // Format Date to ISO string
    };

    return { user: userWithFormattedDate };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching user");
  }
}
