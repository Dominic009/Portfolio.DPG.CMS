import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

// GET Unique
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, context: any) {
  const { id } = await context.params as { id: string };
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: numericId },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET project by id failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params as { id: string };
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const deletedProject = await prisma.project.delete({
      where: { id: numericId },
    });

    return NextResponse.json(
      { message: "Project has been deleted", deletedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete project failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
