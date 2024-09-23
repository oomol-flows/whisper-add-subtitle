import type { Context } from "@oomol/types/oocana";
import ffmpeg, {FfmpegCommand} from "fluent-ffmpeg";

type Inputs = Readonly<{ video_source: string }>;
type Outputs = Readonly<{ ffmpeg_source: FfmpegCommand, file_address: string }>;

export default async function(inputs: Inputs, context: Context): Promise<Outputs> {
  const source =  ffmpeg(inputs.video_source);
  return { ffmpeg_source: source, file_address: inputs.video_source };
};