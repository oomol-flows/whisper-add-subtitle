import type { Context } from "@oomol/types/oocana";
import {  writeFile } from "fs/promises";

type Inputs = Readonly<{ binary: string, file_name: string, output_folder: string}>;
type Outputs = Readonly<{ srt_address: string }>;

export default async function(inputs: Inputs, context: Context<Inputs, Outputs>): Promise<Outputs> {
  const {binary, file_name, output_folder} = inputs;

  const filePath = `${output_folder}/${file_name}.srt`;
   
  const fileBuffer = Buffer.from(binary, "base64");

  await writeFile(filePath, fileBuffer);
  return { srt_address: filePath };
};
