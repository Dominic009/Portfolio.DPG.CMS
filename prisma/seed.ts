// prisma/seed.ts
import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  const rawPassword = process.env.ADMIN_PASSWORD;

  if (!rawPassword) {
    throw new Error("❌ Check pass in env");
  }

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: "dominic@admin.com" },
  });

  await prisma.admin.upsert({
    where: { email: "dominic@admin.com" },
    update: {
      name: "Dominic",
      password: hashedPassword,
    },
    create: {
      email: "dominic@admin.com",
      password: hashedPassword,
      name: "Dominic",
    },
  });

  // if (!existingAdmin) {
  //   await prisma.admin.create({
  //     data: {
  //       email: "dominic@admin.com",
  //       password: hashedPassword,
  //       name: "Admin",
  //     },
  //   });
  //   console.log("✅ Admin created");
  // } else {
  //   console.log("ℹ️ Admin already exists, skipping creation");
  // }

  // Seed Skill Categories & Skills
  const skillsData = [
    {
      category: "Languages",
      skills: [
        { name: "JavaScript", icon: "logos:javascript", level: 90 },
        { name: "TypeScript", icon: "logos:typescript-icon", level: 80 },
        { name: "HTML5", icon: "vscode-icons:file-type-html", level: 95 },
        { name: "CSS3", icon: "vscode-icons:file-type-css", level: 90 },
      ],
    },
    {
      category: "Frontend",
      skills: [
        { name: "React.js", icon: "logos:react", level: 90 },
        { name: "Next.js", icon: "logos:nextjs-icon", level: 85 },
        {
          name: "Tailwind CSS",
          icon: "vscode-icons:file-type-tailwind",
          level: 92,
        },
        { name: "Redux", icon: "logos:redux", level: 75 },
        { name: "Redux Toolkit", icon: "logos:redux", level: 75 },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", icon: "logos:nodejs-icon", level: 85 },
        { name: "Express.js", icon: "simple-icons:express", level: 80 },
        { name: "MongoDB", icon: "logos:mongodb", level: 85 },
        { name: "Firebase", icon: "logos:firebase", level: 75 },
        { name: "MySQL", icon: "logos:mysql", level: 75 },
      ],
    },
    {
      category: "UI/UX & Animation",
      skills: [
        { name: "Figma", icon: "logos:figma", level: 70 },
        { name: "Framer Motion", icon: "logos:framer", level: 85 },
        { name: "AOS", icon: "bi:magic", level: 80 },
        { name: "Responsive Design", icon: "mdi:responsive", level: 95 },
      ],
    },
    {
      category: "Tools & Workflow",
      skills: [
        { name: "Git", icon: "logos:git-icon", level: 90 },
        { name: "GitHub", icon: "uil:github", level: 85 },
        { name: "Vite", icon: "logos:vitejs", level: 80 },
        { name: "Postman", icon: "logos:postman-icon", level: 75 },
        { name: "VS Code", icon: "logos:visual-studio-code", level: 95 },
      ],
    },
    {
      category: "Deployment",
      skills: [
        { name: "Vercel", icon: "logos:vercel-icon", level: 85 },
        { name: "Netlify", icon: "logos:netlify", level: 80 },
        { name: "Firebase Hosting", icon: "logos:firebase", level: 75 },
      ],
    },
  ];
  for (const category of skillsData) {
    const existingCategory = await prisma.skillCategory.findUnique({
      where: { name: category.category },
    });

    if (!existingCategory) {
      const cat = await prisma.skillCategory.create({
        data: {
          name: category.category,
          skills: {
            create: category.skills,
          },
        },
      });
      console.log(`✅ Created category: ${cat.name}`);
    } else {
      console.log(`ℹ️ Skipped existing category: ${existingCategory.name}`);
    }
  }

  // Seed Education
  const educationData = [
    {
      year: "2012",
      title: "Secondary School Certificate (SSC)",
      institution: "Bandura Holy Cross High School",
      gpa: null,
      certificateAtt:
        "https://marketplace.canva.com/EAFy42rCTA0/1/0/1600w/canva-blue-minimalist-certificate-of-achievement-_asVJz8YgJE.jpg",
    },
    {
      year: "2012",
      title: "Higher Secondary Certificate (HSC)",
      institution: "Tejgaon College",
      gpa: null,
      certificateAtt:
        "https://sertifier.com/blog/wp-content/uploads/2020/10/certificate-text-samples.jpg",
    },
    {
      year: "2016 - 2020",
      title: "Bachelor's of Business Administration",
      institution: "Ideal Institute of Business and Science",
      gpa: null,
      certificateAtt:
        "https://sertifier.com/blog/wp-content/uploads/2020/10/certificate-text-samples.jpg",
    },
    {
      year: "2023",
      title: "Web Development Course",
      institution: "Programming Hero",
      gpa: null,
      certificateAtt:
        "https://sertifier.com/blog/wp-content/uploads/2020/10/certificate-text-samples.jpg",
    },
  ];
  await prisma.education.createMany({ data: educationData });
  console.log(`✅ Inserted ${educationData.length} education records`);

  // Seed Projects
  const projects = [
    {
      title: "IFLBH",
      projectFor: "Client project",
      description:
        "This project was made for a company who works with leather distribution and exporting items. It was a static website",
      image: "/Project/IFLBH.png",
      techStack: [
        { name: "React", icon: "skill-icons:react-dark" },
        { name: "Tailwind", icon: "skill-icons:tailwindcss-dark" },
      ],
      projectType: "Frontend",
      liveLink: "https://remarkable-pegasus-34d478.netlify.app",
      features: [
        "Informative",
        "Service descriptions",
        "Contact information",
        "Responsive design",
        "Modern UI/UX",
      ],
    },
    {
      title: "EchelonRealty",
      projectFor: "Personal project",
      description:
        "A project for real-estate company for showcasing their locations and services...",
      image: "/Project/Echelon.png",
      techStack: [
        { name: "React", icon: "skill-icons:react-dark" },
        { name: "Tailwind", icon: "devicon:firebase" },
        { name: "Firebase", icon: "logos:javascript" },
      ],
      projectType: "Full Stack",
      liveLink: "https://stately-cocada-ee3223.netlify.app",
      features: [
        "Full stack",
        "User login & registration",
        "API handling",
        "Responsive design",
        "Modern UI/UX",
      ],
    },
    {
      title: "Chefs Table",
      projectFor: "Personal project",
      description:
        "This project idea came to me when one of my friend wanted to start a restaurant...",
      image: "/Project/ChefsTable.png",
      techStack: [
        { name: "React", icon: "skill-icons:react-dark" },
        { name: "Tailwind", icon: "skill-icons:tailwindcss-dark" },
      ],
      projectType: "Frontend",
      liveLink: "https://chefstabel.netlify.app/",
      features: [
        "Service descriptions",
        "Contact information",
        "Responsive design",
        "Modern UI/UX",
      ],
    },
    {
      title: "Ticket",
      projectFor: "Personal project",
      description: "This was a personal project idea...",
      image: "/Project/Ticket.com.png",
      techStack: [
        { name: "HTML5", icon: "vscode-icons:file-type-html" },
        { name: "CSS3", icon: "vscode-icons:file-type-css" },
        { name: "JavaScript", icon: "logos:javascript" },
      ],
      projectType: "UI/UX",
      liveLink: "https://dominic009.github.io/Ticket.com-Ass-5",
      features: [
        "Service descriptions",
        "Contact information",
        "Responsive design",
        "Modern UI/UX",
      ],
    },
    {
      title: "Forum",
      projectFor: "Personal project",
      description: "This was a personal project idea...",
      image: "/Project/image copy.png",
      techStack: [
        { name: "HTML5", icon: "vscode-icons:file-type-html" },
        { name: "CSS3", icon: "vscode-icons:file-type-css" },
        { name: "JavaScript", icon: "logos:javascript" },
      ],
      projectType: "Frontend",
      liveLink: "https://mellifluous-panda-dd0ad2.netlify.app",
      features: [
        "Service descriptions",
        "Contact information",
        "Responsive design",
        "Modern UI/UX",
      ],
    },
    {
      title: "G3 architect",
      projectFor: "Personal project",
      description: "This was a starter project...",
      image: "/Project/G3.png",
      techStack: [
        { name: "HTML5", icon: "vscode-icons:file-type-html" },
        { name: "CSS3", icon: "vscode-icons:file-type-css" },
      ],
      projectType: "Frontend",
      liveLink: "https://leafy-belekoy-be649f.netlify.app",
      features: [
        "Service descriptions",
        "Contact information",
        "Responsive design",
        "Modern UI/UX",
      ],
    },
    {
      title: "Wander Quest",
      projectFor: "Personal project",
      description:
        "This site was made to use database (MongoDB) and Express.js...",
      image: "/Project/wq1.png",
      techStack: [
        { name: "React", icon: "skill-icons:react-dark" },
        { name: "Tailwind", icon: "skill-icons:tailwindcss-dark" },
        { name: "Express.js", icon: "skill-icons:expressjs-light" },
        { name: "MongoDB", icon: "skill-icons:mongodb" },
      ],
      projectType: "Full Stack",
      liveLink: "https://wanderquestfs.netlify.app",
      features: [
        "User login and registration",
        "API's",
        "Responsive design",
        "Modern UI/UX",
      ],
    },
    {
      title: "Test project 01",
      projectFor: "Personal project",
      description: "This one is made to test delete",
      image: "/Project/wq1.png",
      techStack: [
        { name: "React", icon: "skill-icons:react-dark" },
        { name: "Tailwind", icon: "skill-icons:tailwindcss-dark" },
        { name: "Express.js", icon: "skill-icons:expressjs-light" },
        { name: "MongoDB", icon: "skill-icons:mongodb" },
      ],
      projectType: "Full Stack",
      liveLink: "https://wanderquestfs.netlify.app",
      features: [
        "User login and registration",
        "API's",
        "Responsive design",
        "Modern UI/UX",
      ],
    },
    {
      title: "Test project 02",
      projectFor: "Personal project",
      description: "This one is made to test delete",
      image: "/Project/wq1.png",
      techStack: [
        { name: "React", icon: "skill-icons:react-dark" },
        { name: "Tailwind", icon: "skill-icons:tailwindcss-dark" },
        { name: "Express.js", icon: "skill-icons:expressjs-light" },
        { name: "MongoDB", icon: "skill-icons:mongodb" },
      ],
      projectType: "Full Stack",
      liveLink: "https://wanderquestfs.netlify.app",
      features: [
        "User login and registration",
        "API's",
        "Responsive design",
        "Modern UI/UX",
      ],
    },
  ];
  for (const project of projects) {
    const existing = await prisma.project.findFirst({
      where: {
        title: project.title,
        projectFor: project.projectFor,
      },
    });

    if (existing) {
      await prisma.project.update({
        where: { id: existing.id },
        data: { ...project },
      });
    } else {
      await prisma.project.create({
        data: project,
      });
    }
  }

  console.log(`✅ Inserted ${projects.length} projects`);

  console.log("🌱 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
