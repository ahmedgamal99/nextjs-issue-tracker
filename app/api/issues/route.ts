import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createIssueSchema } from "../../validationSchemas";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Create the new issue in the database using Prisma
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description
    }
  });

  return NextResponse.json(newIssue, { status: 201 });
}
