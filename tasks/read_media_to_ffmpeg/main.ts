import type { Context } from "@oomol/types/oocana";
import ffmpeg, { FfmpegCommand } from "fluent-ffmpeg";

type Inputs = Readonly<{ video_source: string }>;
type Outputs = Readonly<{ ffmpeg_source: FfmpegCommand, file_address: string, file_name: string }>;

function extractBaseName(path: string): string {
  let fileName = path.match(/\/([^\/]+)$/);
  if (fileName && fileName[1]) {
    return fileName[1].split('.')[0];
  } else {
    return "";
  }
}

export default async function (inputs: Inputs, context: Context): Promise<Outputs> {
  const source = ffmpeg(inputs.video_source);
  const file_name = extractBaseName(inputs.video_source);

  return { ffmpeg_source: source, file_address: inputs.video_source, file_name: file_name };
};