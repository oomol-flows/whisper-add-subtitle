import type { Context } from "@oomol/types/oocana";
import ffmpeg, {FfmpegCommand} from "fluent-ffmpeg";

type Inputs = Readonly<{ 
  ffmpeg_source: FfmpegCommand,
  file_address: string,
  file_name: string,
  formate: string,
 }>;
type Outputs = Readonly<{ file_adress: string }>;

export default async function(inputs: Inputs, context: Context): Promise<Outputs> {

  const save_address = `${inputs.file_address}/${inputs.file_name}.${inputs.formate}`;
  try {
    await new Promise((resolve, reject) => {
      inputs.ffmpeg_source.clone().save(save_address).on("end", () => {
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
    context.preview({type: inputs.formate === "mp4" ? "video" : "audio", data: save_address})
    return { file_adress: save_address };
  }
};