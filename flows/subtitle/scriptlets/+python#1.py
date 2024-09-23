import whisper
import math

def main(inputs: dict):
  mode = inputs["mode"]
  audio_file = inputs["audio_file"]
  prompt = inputs["prompt"]
  if prompt.strip() == "null":
    prompt = None

  model = whisper.load_model(mode)
  result = model.transcribe(
    audio_file, 
    initial_prompt=prompt,
    word_timestamps=True,
  )
  segments: list[dict] = []

  for segment in result["segments"]:
    words: list[dict] = []
    segments.append({
      "begin": to_ms(segment["start"]),
      "end": to_ms(segment["end"]),
      "text": segment["text"],
      "words": words,
    })
    for word in segment["words"]:
      words.append({
        "word": word["word"],
        "begin": to_ms(word["start"]),
        "end": to_ms(word["end"]),
      })

  return { 
    "language": result["language"],
    "text": result["text"],
    "segments": segments,
  }

def to_ms(timestamp: float):
  return math.floor(timestamp * 1000.0)