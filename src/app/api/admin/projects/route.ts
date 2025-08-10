// app/api/projects/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/projects failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate data here as needed

    const newProject = await prisma.project.create({
      data: {
        title: data.title,
        projectFor: data.projectFor,
        description: data.description,
        image: data.image,
        techStack: data.techStack, // Assuming it's JSON
        projectType: data.projectType,
        liveLink: data.liveLink,
        features: data.features,
      },
    });

    return NextResponse.json(
      { message: "New project has been added", newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
