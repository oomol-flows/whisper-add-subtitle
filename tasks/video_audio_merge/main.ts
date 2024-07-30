import type { Context } from "@oomol/oocana-types";
import {FfmpegCommand} from "fluent-ffmpeg";

type Inputs = Readonly<{ ffmpeg_video: FfmpegCommand, ffmpeg_audio: string }>;
type Outputs = Readonly<{ ffmpeg_source: FfmpegCommand }>;

export default async function(inputs: Inputs, context: Context): Promise<Outputs> {
  const ffmpeg_source =  inputs.ffmpeg_video.clone().addInput(inputs.ffmpeg_audio).outputOptions('-c:v copy').outputOptions('-c:a aac').outputOptions('-shortest');
  return { ffmpeg_source: ffmpeg_source };
};