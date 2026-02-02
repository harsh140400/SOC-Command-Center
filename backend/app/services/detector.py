from collections import defaultdict

def detect_alerts(events):
    alerts = []

    # RULE 1: Bruteforce Detection
    failed_by_ip = defaultdict(list)
    for e in events:
        if e.get("event_type") == "FAILED_LOGIN":
            failed_by_ip[e.get("ip_address")].append(e)

    for ip, failed_events in failed_by_ip.items():
        if ip and len(failed_events) >= 5:
            users = list(set([x.get("username") for x in failed_events]))
            alerts.append({
                "rule_name": "Brute Force Suspected",
                "description": f"Detected {len(failed_events)} failed logins from IP {ip}",
                "severity": "HIGH",
                "status": "OPEN",
                "source_ip": ip,
                "target_user": ", ".join([u for u in users if u]),
                "evidence": "\n".join([x.get("raw_line") for x in failed_events[:12]])
            })

    # RULE 2: Privilege Escalation
    for e in events:
        if e.get("event_type") == "PRIVILEGE_ESCALATION":
            alerts.append({
                "rule_name": "Privilege Escalation Attempt",
                "description": f"Special privileges assigned to user {e.get('username')} from IP {e.get('ip_address')}",
                "severity": "CRITICAL",
                "status": "OPEN",
                "source_ip": e.get("ip_address"),
                "target_user": e.get("username"),
                "evidence": e.get("raw_line")
            })

    # RULE 3: Malware Activity
    for e in events:
        if e.get("event_type") == "MALWARE_ACTIVITY":
            alerts.append({
                "rule_name": "Possible Malware Activity",
                "description": f"Malware indicators detected for user {e.get('username')}",
                "severity": "CRITICAL",
                "status": "OPEN",
                "source_ip": e.get("ip_address"),
                "target_user": e.get("username"),
                "evidence": e.get("raw_line")
            })

    return alerts
