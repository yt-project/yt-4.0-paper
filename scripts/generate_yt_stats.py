# Meant to be run from the root yt-4.0-paper directory, which should live next to a yt directory.

mapping = {}

repo_loc = "../yt/"

with open(repo_loc + ".mailmap", 'r') as mailmap:
    for line in mailmap.readlines():
        try:
            val, key = line.split('>', 1)
            key = key.strip()
            val = val.strip() + '>'
            mapping[key] = val
        except ValueError:
            print(line)

import pandas as pd
import git

yt_repo = git.repo.Repo(repo_loc)

attributes = ("author", "committed_datetime", "hexsha")

data = {_:[] for _ in attributes}

for i, c in enumerate(yt_repo.iter_commits()):
    if i % 1000 == 0:
        print(i)
    for attr in attributes:
        data[attr].append(getattr(c, attr))

new_authors = []
for author in data["author"]:
    author_str = f"{author.name} <{author.email}>"
    try:
        author_str = mapping[author_str]
    except KeyError:
        pass
    new_authors.append(author_str)
        
data["author"] = new_authors
df = pd.DataFrame(data)
df.to_json("content/images/yt_repo.json", orient="records")
