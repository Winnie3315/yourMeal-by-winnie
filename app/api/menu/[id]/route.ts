

// import clientPromise from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";

// export const GET = async (res: NextResponse, req: NextRequest) => {
//     try {
//         const client = await clientPromise
//         const db = client.db('mydatabase')
//         const menu = await db.collection('menu').find().toArray()

//         return NextResponse.json({ success: true, data: menu, message: "got menu" })
//     } catch (e: any) {
//         return NextResponse.json({ success: false, message: e.message }, { status: 500 })
//     }
// }
export const PATCH = async (req: NextRequest, { params }: {params : {id: string}}) => {
    try {
        const client = await clientPromise;

        const db = client.db("mydatabase");
        const body = await req.json()

        const menuItems = await db.collection("menu").findOneAndUpdate({_id: new ObjectId(params.id)}, { $set: body})
        return NextResponse.json({ success: true, data: menuItems });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message }, { status: 500 });
    }
}


export const DELETE = async (req: NextRequest, { params }: {params : {id: string}}) => {
    try {
        const client = await clientPromise;

        const db = client.db("mydatabase");

        const menuItems = await db.collection("menu").findOneAndDelete({_id: new ObjectId(params.id)})
        return NextResponse.json({ success: true, data: menuItems });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message }, { status: 500 });
    }
}



import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (res: NextResponse, req: NextRequest) => {
    try {
        const client = await clientPromise;
        const db = client.db("mydatabase");
        const menuItems = await db.collection("menu").find({}).toArray()

        return NextResponse.json({ success: true, data: menuItems });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message }, { status: 500 });
    }
};

// export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db("mydatabase");
//     const body = await req.json();

//     const result = await db.collection("menu").updateOne(
//       { _id: new ObjectId(params.id) },
//       { $set: { ...body.updates } }
//     );

//     if (result.modifiedCount === 0) {
//       return NextResponse.json({ success: false, message: "No items were updated" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, message: "menu item updated" });
//   } catch (e: any) {
//     return NextResponse.json({ success: false, message: e.message }, { status: 500 });
//   }
// };

// export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db("mydatabase");

//     const result = await db.collection("menu").deleteOne({ _id: new ObjectId(params.id) });

//     if (result.deletedCount === 0) {
//       return NextResponse.json({ success: false, message: "No items were deleted" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, message: "menu item deleted" });
//   } catch (e: any) {
//     return NextResponse.json({ success: false, message: e.message }, { status: 500 });
//   }
// };