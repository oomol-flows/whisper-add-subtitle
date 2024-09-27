import type { Context } from "@oomol/types/oocana";
import { FfmpegCommand } from "fluent-ffmpeg";
type BlockContext = Context<Inputs, Outputs>;
type Inputs = Readonly<{ ffmepg_source: FfmpegCommand }>;
type Outputs = Readonly<{ ffmepg_source: FfmpegCommand }>;

export default async function (
  inputs: Inputs,
  context: BlockContext
): Promise<Outputs> {

  const outSource = inputs.ffmepg_source
    .inputOption([
      "-vsync 0",
      "-hwaccel cuvid",
      "-hwaccel_output_format cuvid",
      "-c:v h264_cuvid",
    ])
    .inputFormat("mp4")
    .audioCodec("copy") // 音频流直接复制
    .videoCodec("h264_nvenc"); // 编码使用nvenc

  return {
    ffmepg_source: outSource,
  };
}
