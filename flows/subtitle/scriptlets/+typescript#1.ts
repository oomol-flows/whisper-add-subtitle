import type { Context } from "@oomol/types/oocana";
import ffmpeg from "fluent-ffmpeg";

type Inputs = Readonly<{
  name: string;
  file_address: string;
  srt_address: string;
  folder_address: string;
}>;
type Outputs = Readonly<{ output_address: string }>;

export default async function (
  inputs: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const save_address = `${inputs.folder_address}/${inputs.name}.mp4`;
  try {
    await new Promise((resolve, reject) => {
      ffmpeg(inputs.file_address)
        .inputOption([
          "-vsync 0",
          "-hwaccel cuvid",
          "-hwaccel_output_format cuvid",
          "-c:v h264_cuvid",
        ])
        .inputFormat("mp4")
        .audioCodec("copy") // 音频流直接复制
        .videoCodec("h264_nvenc") // 编码使用nvenc
        .outputOptions(["-vf", "subtitles=" + inputs.srt_address])
        .on("end", function () {
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
