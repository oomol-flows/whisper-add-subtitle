import type { Context } from "@oomol/types/oocana";
import ffmpeg, {FfmpegCommand} from "fluent-ffmpeg";

type Inputs = Readonly<{
  name: string,
  file_address: string,
  srt_address: string,
  folder_address: string,
 }>;
type Outputs = Readonly<{ output_address: string }>;

export default async function(inputs: Inputs, context: Context<Inputs, Outputs>): Promise<Outputs> {
  
  const save_address = `${inputs.folder_address}/${inputs.name}.mp4`;
  try {
    await new Promise((resolve, reject) => {
      ffmpeg(inputs.file_address)
        .input(inputs.srt_address)
        .outputOptions([
            '-vf', 'subtitles=' + inputs.srt_address,
            // 可选的：调整字幕显示位置
            // '-vf', 'subtitles=' + subtitlesPath + ':force_style=\'FontName=Arial,Fontsize=20,PrimaryColour=&H00FFFF&\''
        ])
        .on('end', function() {
          resolve("ok");
          console.log('视频处理完成');
        })
        .on('error', function(err) {
          console.log("ffmpeg error")
          reject(err);
        })
        .save(save_address);
        });
    console.log('Conversion complete');
  } catch (err) {
      console.error('Error during conversion:', err);
  } finally {
    console.log(save_address);
    context.preview({
      type: "video",
      data: save_address,
    })
    return { output_address: save_address };
  }
};