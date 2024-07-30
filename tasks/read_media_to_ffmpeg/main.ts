import type { Context } from "@oomol/oocana-types";
import ffmpeg, {FfmpegCommand} from "fluent-ffmpeg";

type Inputs = Readonly<{ video_source: string }>;
type Outputs = Readonly<{ ffmpeg_source: FfmpegCommand }>;

export default async function(inputs: Inputs, context: Context): Promise<Outputs> {
  const source =  ffmpeg(inputs.video_source);
  return { ffmpeg_source: source };
};