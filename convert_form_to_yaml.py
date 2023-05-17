import csv
import yaml

with open("yt-4.0 Paper Authorship (Responses) - Form Responses 1.csv", "r") as f:
    r = csv.reader(f)
    authors = []
    header = next(r)
    # We want github, name, initials, orcid, email, affiliations, funders
    for _, name, orcid, affil, email, github, *_ in r:
        orcid = orcid.replace("https://orcid.org/", "").replace("/", "").replace("]", "")
        github = github.replace("https://github.com/", "").replace("/", "")
        authors.append({
            'github': github,
            'name': name,
            'initials': "".join(_[0].upper() for _ in name.split()),
            'orcid': orcid,
            'email': email,
            'affiliations': [affil],
            'funders': []
        })

with open("content/addl_authors.yaml", "w") as f:
    yaml.dump(authors, f)
