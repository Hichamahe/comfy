import { NextResponse } from "next/server";
import { connectMongoDB } from "@/backend/lib/mongodb";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const LoadDB = async () => {
  await connectMongoDB();
};

LoadDB();

export const NewUser = async (request) => {
  try {
    const { name, email, phone, password } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await newuser.save();
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User registration failed", error: error.message },
      { status: 500 }
    );
  }
};

export const NewUserGoogle = async (request) => {
  const { name, email } = await request.json();
  const user = await User.create({ name, email });
  return NextResponse.json(user, { status: 201 });
};

export const updateUser = async (request) => {
  const { id, name, email, phone } = await request.json();
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const SendEmail = async (request) => {
  try {
    const { name, email, message } = await request.json();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const mailOption = {
      from: email,
      to: process.env.SMTP_EMAIL,
      subject: "Send Email",
      html: `
            <h3>name: ${name}</h3>        
            <li> email: ${email}</li>
            <li> message: ${message}</li> 
            `,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
};
