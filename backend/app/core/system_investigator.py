import time
import psutil
import os
from datetime import datetime


SUSPICIOUS_PATHS = ["AppData\\Local\\Temp", "Temp", "Downloads"]


def get_process_snapshot():
    snapshot = []
    for p in psutil.process_iter(["pid", "name", "exe", "cpu_percent", "memory_info", "username"]):
        try:
            info = p.info
            exe = info.get("exe") or ""
            suspicious = any(x.lower() in exe.lower() for x in SUSPICIOUS_PATHS)

            snapshot.append({
                "pid": info.get("pid"),
                "name": info.get("name"),
                "exe": exe,
                "cpu": info.get("cpu_percent"),
                "memory": info.get("memory_info").rss if info.get("memory_info") else 0,
                "user": info.get("username"),
                "suspicious": suspicious
            })
        except:
            continue
    return snapshot


def get_network_snapshot():
    conns = []
    for c in psutil.net_connections(kind="inet"):
        try:
            conns.append({
                "pid": c.pid,
                "laddr": f"{c.laddr.ip}:{c.laddr.port}" if c.laddr else None,
                "raddr": f"{c.raddr.ip}:{c.raddr.port}" if c.raddr else None,
                "status": c.status
            })
        except:
            continue
    return conns


def auto_investigate_loop(callback_alert=None, interval=10):
    """
    Infinite monitor loop:
    - process snapshot
    - network snapshot
    - detect suspicious patterns
    """
    while True:
        ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        processes = get_process_snapshot()
        connections = get_network_snapshot()

        suspicious_procs = [p for p in processes if p["suspicious"]]

        if suspicious_procs and callback_alert:
            callback_alert({
                "timestamp": ts,
                "alert_type": "SUSPICIOUS_PROCESS_PATH",
                "severity": "HIGH",
                "message": f"Suspicious processes detected: {len(suspicious_procs)} running from Temp/Downloads paths",
                "details": suspicious_procs[:5]
            })

        # You can also trigger alerts if too many outbound connections:
        outbound = [c for c in connections if c["raddr"]]
        if len(outbound) > 150 and callback_alert:
            callback_alert({
                "timestamp": ts,
                "alert_type": "HIGH_OUTBOUND_CONNECTIONS",
                "severity": "MEDIUM",
                "message": f"High outbound connections detected: {len(outbound)}",
                "details": outbound[:5]
            })

        time.sleep(interval)
