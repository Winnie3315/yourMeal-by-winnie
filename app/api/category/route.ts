import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
      const client = await clientPromise;
      const db = client.db("mydatabase");
      const body = await req.json();
  
      const result = await db.collection("category").insertOne(body);
  
      return NextResponse.json({ success: true, message: "category item added", result });
    } catch (e: any) {
      return NextResponse.json({ success: false, message: e.message }, { status: 500 });
    }
  };


  export const GET = async (req: NextRequest) => {
    try {
      const client = await clientPromise;
      const db = client.db("mydatabase");
      const category = await db.collection("category").find().toArray();
  
      return NextResponse.json({ success: true, data: category, message: "got category" });
    } catch (e: any) {
      return NextResponse.json({ success: false, message: e.message }, { status: 500 });
    }
  };