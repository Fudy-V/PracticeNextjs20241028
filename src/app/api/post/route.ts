import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const todoPosts = await prisma.post.findMany();
  return NextResponse.json(todoPosts);
}

export async function POST(req: Request) {
  const { title, description } = await req.json();
  const post = await prisma.post.create({
    data: {
      title,
      description,
    },
  });
  return NextResponse.json(post);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const deleteItem = await prisma.post.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleteItem);
}
