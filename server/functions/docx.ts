import * as fs from "fs";
import { Document, HeadingLevel, ImageRun, Packer, Paragraph } from "docx";
import { ObjectId } from "mongodb";
import DatabaseConnection from "../database/DatabaseConnection";
import { imageSize } from "image-size";
import en from "../language/en.json";
import sv from "../language/sv.json";

export const generateDocument = async (
  projectId: string,
  language: "en" | "sv"
) => {
  const floors = await DatabaseConnection.getInstance().getFloorsByProjectId(
    new ObjectId(projectId)
  );

  let translation;
  switch (language) {
    case "en": {
      translation = en;
      break;
    }
    case "sv": {
      translation = sv;
      break;
    }
  }

  const project = await DatabaseConnection.getInstance().getProjectById(
    new ObjectId(projectId)
  );

  let docFloorPlans: Paragraph[] = [];
  let docNotes: Paragraph[] = [];
  for (const floor of floors) {
    const meta = imageSize(floor.floorPlanPath);
    let calculatedHeight = 0;
    let fileType = "jpg";
    if (
      !meta.width ||
      !meta.height ||
      !meta.type ||
      !(
        meta.type === "jpg" ||
        meta.type === "png" ||
        meta.type === "gif" ||
        meta.type === "bmp"
      )
    ) {
      throw new Error("Incorrect image metadata");
    }
    const aspectRatio = meta.width / meta.height;
    calculatedHeight = 400 * aspectRatio;
    fileType = meta.type;

    docFloorPlans.push(
      new Paragraph({
        text: floor.title,
        heading: HeadingLevel.HEADING_2,
        spacing: {
            before: 200,
        }
      }),
      new Paragraph({
        children: [
          new ImageRun({
            type: fileType as "jpg" | "png" | "gif" | "bmp",
            data: fs.readFileSync(floor.floorPlanPath),
            transformation: {
              width: 400,
              height: calculatedHeight ?? 300
            }
          })
        ],
        spacing: {
          after: 100
        }
      })
    );

    const notes = await DatabaseConnection.getInstance().getNotesByFloorId(
      new ObjectId(floor._id)
    );

    for (const note of notes) {
      docNotes.push(
        new Paragraph({
          text: note.title,
          heading: HeadingLevel.HEADING_2,
          spacing: {
            before: 100
          }
        }),
        new Paragraph({
          text: note.description,
          spacing: {
            after: 100
          }
        })
      );
    }
  }

  const doc = new Document({
    title: project.title,
    description: translation.title,
    sections: [
      {
        children: [
          new Paragraph({
            text: translation.title,
            heading: HeadingLevel.TITLE
          }),
          new Paragraph({
            text: project.title,
            heading: HeadingLevel.HEADING_1,
            spacing: {
                before: 100,
            }
          }),
          new Paragraph({
            text: `${translation.inspector}: `
          }),
          new Paragraph({
            text: `${translation.date}: `
          }),
          new Paragraph({
            text: translation.projectDescription,
            heading: HeadingLevel.HEADING_2,
            spacing: {
              before: 100
            }
          }),
          new Paragraph({
            text: project.description
          }),
          new Paragraph({
            text: translation.floorPlans,
            heading: HeadingLevel.HEADING_1,
            spacing: {
                before: 100,
            }
          }),
          ...docFloorPlans,
          new Paragraph({
            text: translation.notes,
            heading: HeadingLevel.HEADING_1,
            spacing: {
                before: 100,
            }
          }),
          ...docNotes
        ]
      }
    ]
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("files/documents/test.docx", buffer);
  });
};
