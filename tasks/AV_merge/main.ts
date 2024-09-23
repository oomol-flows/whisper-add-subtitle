import type { Context } from "@oomol/types/oocana";
import ffmpeg, {FfmpegCommand} from "fluent-ffmpeg";

type Inputs = Readonly<{
  // video_address: string,
  ffmpeg_video: FfmpegCommand,
  audio_address: string,
  merge_file: string,
  name: string,
 }>;
type Outputs = Readonly<{ source_address: string }>;

export default async function(inputs: Inputs, context: Context) {
  
  const save_address = `${inputs.merge_file}/${inputs.name}.mp4`;
  try {
    await new Promise((resolve, reject) => {
        inputs.ffmpeg_video.clone().addInput(inputs.audio_address).save(save_address).on("end", () => {
        resolve("ok");
      }).on('error', (err) => {
        console.log("ffmpeg error")
        reject(err);
      });
    });
    console.log('Conversion complete');
  } catch (err) {
      console.error('Error during conversion:', err);
  } finally {
    console.log(save_address);
    context.sendMessage({type: "video", data: save_address})
    return { file_adress: save_address };
  }
};