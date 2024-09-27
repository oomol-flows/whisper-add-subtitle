import re
import base64

from oocana import Context
from llm import AITranslator

def main(inputs: dict, context: Context):
  timestamps: list[str] = []
  texts: list[str] = []
  ai = inputs["ai"]
  model: str
  api_url: str
  
  if ai == "DeepSeek":
    model = "deepseek-chat"
    api_url = "https://api.deepseek.com/chat/completions"
  elif ai == "ChatGPT":
    model = "gpt-3.5-turbo"
    api_url = "https://aigptx.top/v1/chat/completions"
  else:
    raise Exception(f"unknown AI: {ai}")

  with open(inputs["srt_file"], "r", encoding="utf-8") as file:

    for chunk in file.read().split("\n\n"):
      lines = chunk.split("\n")
      if len(lines) < 3:
        continue
      timestamp = strip_text(lines[1])
      text = strip_text("\n".join(lines[2:]))
      timestamps.append(timestamp)
      texts.append(text)
  
  group_size = inputs["group_size"]
  translater = AITranslator(
    model=model,
    api_url=api_url,
    auth_token=inputs["ai_token"],
    source_lan=inputs["source_lan"],
    target_lan=inputs["target_lan"],
  )
  target_texts: list[str] = []

  for offset in range(0, len(texts), group_size):
    sub_texts = texts[offset:offset + group_size]
    sub_target_texts = translater.translate(sub_texts)
    target_texts.extend(sub_target_texts)
    context.report_progress(float(offset) / float(len(texts)) * 100.0)

  context.report_progress(100.0)
  files_lines: list[str] = []

  for i, text in enumerate(target_texts):
    timestamp = timestamps[i]
    files_lines.append(f"{i + 1}\n{timestamp}\n{text}")

  bin = "\n\n".join(files_lines).encode("utf-8")
  base64_str = base64.b64encode(bin)

  return { "bin": base64_str }

def strip_text(text: str) -> str:
  return re.sub(r"^[\s\n]+|[\s\n]+$", "", text)
