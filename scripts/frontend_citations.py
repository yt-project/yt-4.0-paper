import csv, yaml

with open("content/frontends.yaml", "r") as f:
    frontend_info = yaml.load(f, yaml.SafeLoader)

with open("old_frontends.yaml", "w") as f:
    yaml.dump(frontend_info, f)

frontends = set(_['name'] for _ in frontend_info['frontends'])

cols = ["timestamp", "email", "frontend", "citation_type",
        "citation", "comments"]
data = {_: [] for _ in cols}
frontend_citations = {_: {'use': [], 'method': []} for _ in frontends}
citation_type = {'A': 'use', 'C': 'method'}
with open("frontend_form.csv", "r") as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        # Catch 'other'
        if row[2] not in frontend_citations: continue
        frontend_citations[row[2]][citation_type[row[3][0]]].append(
            row[4].strip())

for frontend in frontend_info['frontends']:
    new_citations = frontend_citations[frontend['name']]
    frontend['usage_citations'].extend(new_citations['use'])
    frontend['citations'].extend(new_citations['method'])

with open("new_frontends.yaml", "w") as f:
    yaml.dump(frontend_info, f)
