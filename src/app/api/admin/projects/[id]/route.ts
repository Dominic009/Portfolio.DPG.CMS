import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

// GET Unique
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } // id is string from URL
) {
  const id = Number(params.id); // convert to number

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id },
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
export async function DELETE(
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const deletedProject = await prisma.project.delete({
      where: { id },
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
