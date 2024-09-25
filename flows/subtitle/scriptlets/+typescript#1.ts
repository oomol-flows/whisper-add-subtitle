import type { Context } from "@oomol/types/oocana";
import {  FfmpegCommand } from "fluent-ffmpeg";

type Inputs = Readonly<{
  name: string,
  origin_source: FfmpegCommand,
  srt_address: string,
  folder_address: string,
 }>;
type Outputs = Readonly<{ output_address: string }>;

export default async function (
  inputs: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const save_address = `${inputs.folder_address}/${inputs.name}.mp4`;
  try {
    await new Promise((resolve, reject) => {
      inputs.origin_source
      .outputOptions([
        '-vf', 'subtitles=' + inputs.srt_address,
       ])
        .on('end', function() {
          resolve("ok");
          console.log("视频处理完成");
        })
        .on("error", function (err) {
          console.log("ffmpeg error");
          reject(err);
        })
        .save(save_address);
    });
    console.log("Conversion complete");
  } catch (err) {
    console.error("Error during conversion:", err);
  } finally {
    console.log(save_address);
    context.preview({
      type: "video",
      data: save_address,
    });
    return { output_address: save_address };
  }
}
