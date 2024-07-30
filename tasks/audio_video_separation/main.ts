import type { Context } from "@oomol/oocana-types";
import {FfmpegCommand} from "fluent-ffmpeg";

type Inputs = Readonly<{ 
  ffmpeg_source: FfmpegCommand,
 }>;
type Outputs = Readonly<{
  ffmpeg_only_video: FfmpegCommand,
  ffmpeg_only_audio: FfmpegCommand,
}>;

export default async function(inputs: Inputs, context: Context): Promise< Outputs> {

  const video = inputs.ffmpeg_source.clone().noAudio();
  const audio = inputs.ffmpeg_source.clone().noVideo();


  return { ffmpeg_only_video: video, ffmpeg_only_audio: audio};
};