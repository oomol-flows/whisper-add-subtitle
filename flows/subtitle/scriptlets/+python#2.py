from oocana import Context

def main(inputs: dict, context: Context):
  lines: list[str] = []

  for index, segment in enumerate(inputs["segments"]):
    begin = segment["begin"]
    end = segment["end"]
    text = segment["text"]

    lines.append(f"{index + 1}")
    lines.append(f"{to_timestamp(begin)} --> {to_timestamp(end)}")
    lines.append(f"{text.replace("\n", " ")}\n")

  return { "srt_content": "\n".join(lines) }

def to_timestamp(time):
    total_seconds = time // 1000
    milliseconds = time % 1000
    seconds = total_seconds % 60
    total_minutes = total_seconds // 60
    minutes = total_minutes % 60
    hours = total_minutes // 60

    return f"{hours:02d}:{minutes:02d}:{seconds:02d},{milliseconds:03d}"