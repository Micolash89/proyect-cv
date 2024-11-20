import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'; 

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const { path } = await request.json();

  if (!path) {
    return new NextResponse("Image path is required", { status: 400 });
  }

  try {
    const result = await cloudinary.uploader.upload(path, {
      folder: "cv-images",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[CLOUDINARY_UPLOAD_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}