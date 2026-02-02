import os
import re
from typing import List, Dict

WINDOWS_LOG_PATTERN = re.compile(
    r"\[(?P<time>.*?)\]\s+EventID=(?P<eventid>\d+)\s+User=(?P<user>.*?)\s+IP=(?P<ip>.*?)\s+Message=(?P<msg>.*)",
    re.IGNORECASE
)

def parse_windows_log_line(line: str):
    line = line.strip()
    m = WINDOWS_LOG_PATTERN.match(line)
    if not m:
        return None

    data = m.groupdict()
    eventid = data.get("eventid", "")
    msg = data.get("msg", "")

    event_type = "UNKNOWN"
    severity = "LOW"

    if eventid == "4625":
        event_type = "FAILED_LOGIN"
        severity = "MEDIUM"
    elif eventid == "4624":
        event_type = "SUCCESS_LOGIN"
        severity = "LOW"
    elif eventid == "4672":
        event_type = "PRIVILEGE_ESCALATION"
        severity = "HIGH"
    elif "malware" in msg.lower() or "trojan" in msg.lower() or "ransom" in msg.lower():
        event_type = "MALWARE_ACTIVITY"
        severity = "CRITICAL"

    return {
        "event_time": data.get("time"),
        "event_type": event_type,
        "username": data.get("user"),
        "ip_address": data.get("ip"),
        "severity": severity,
        "raw_line": line,
    }

def read_txt_log_file(filepath: str) -> List[Dict]:
    events = []
    if not os.path.exists(filepath):
        return events

    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            parsed = parse_windows_log_line(line)
            if parsed:
                events.append(parsed)

    return events

def read_logs_from_folder(folder_path: str) -> List[Dict]:
    events = []
    if not os.path.exists(folder_path):
        return events

    for fname in os.listdir(folder_path):
        if not fname.endswith(".txt"):
            continue

        full_path = os.path.join(folder_path, fname)
        file_events = read_txt_log_file(full_path)
        for e in file_events:
            e["source_file"] = fname
            e["source"] = "auto_ingest"
        events.extend(file_events)

    return events
