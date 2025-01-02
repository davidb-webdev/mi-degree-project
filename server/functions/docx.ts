import * as fs from "fs";
import { Document, HeadingLevel, ImageRun, Packer, Paragraph } from "docx";

export const generateDocument = () => {
  const doc = new Document({
    creator: "TODOcreator",
    description: "TODOdesc",
    title: "TODOtitle",
    sections: [
      {
        children: [
          new Paragraph({
            text: "Besiktningsprotokoll",
            heading: HeadingLevel.TITLE
          }),
          new Paragraph({
            text: "Kontrollant: TODO"
          }),
          new Paragraph({
            text: "Datum: "
          }),
          new Paragraph({
            text: "Anmärkningar",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            text: "Anteckning: Titel",
            heading: HeadingLevel.HEADING_2
          }),
          new Paragraph({
            text: "Anteckning: Beskrivning"
          }),
          new Paragraph({
            children: [
              new ImageRun({
                type: "png",
                data: fs.readFileSync("files/floorplans/fp.png"),
                transformation: {
                  width: 400,
                  height: 400
                }
              })
            ]
          }),
          new Paragraph({
            text: "Beskrivning"
          })
        ]
      }
    ]
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("files/documents/test.docx", buffer);
  });
};
