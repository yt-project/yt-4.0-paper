import json
import pandas as pd
import git

# Commit info

mapping = {}

repo_loc = "./yt/"

with open(repo_loc + ".mailmap", 'r') as mailmap:
    for line in mailmap.readlines():
        try:
            val, key = line.split('>', 1)
            key = key.strip()
            val = val.strip() + '>'
            mapping[key] = val
        except ValueError:
            print("ValueError", line)

yt_repo = git.repo.Repo(repo_loc)

attributes = ("author", "committed_datetime", "hexsha")

data = {_:[] for _ in attributes}

for i, c in enumerate(yt_repo.iter_commits()):
    for attr in attributes:
        data[attr].append(getattr(c, attr))

new_authors = []
for author in data["author"]:
    author_str = f"{author.name} <{author.email}>"
    try:
        author_str = mapping[author_str]
    except KeyError:
        pass
    new_authors.append(author_str.split(" <")[0])


data["author"] = new_authors
df_commits = pd.DataFrame(data)
df_commits.rename(columns = {'committed_datetime':'datetime'}, inplace=True)
df_commits["type"] = "commit"
df_commits["duration"] = pd.NA

pull_requests = json.load(open("pr.json"))
# We're going to use json_normalize, but it has fewer options, so we have to do
# more manipulation after we load it.
df_pr = pd.json_normalize(pull_requests)


# In[5]:


# We only want the ones that are closed ...
df_pr = df_pr[(~df_pr["closedAt"].isna()) & (df_pr["state"] == "MERGED")]

df_pr[["createdAt", "closedAt"]] = df_pr[["createdAt", "closedAt"]].apply(pd.to_datetime)
df_pr["duration"] = (df_pr["closedAt"] - df_pr["createdAt"]).dt.total_seconds()

df_pr["author"] = df_pr["author.name"]
df_pr["author"].fillna(df_pr["author.login"])
df_pr["author"].fillna(df_pr["author.id"])
df_pr["author"].fillna("Automated Bot")
df_pr["author"][df_pr["author"] == ""] = "Automated Bot"
df_pr["type"] = "pull-request"
df_pr.rename(columns = {'closedAt': 'datetime'}, inplace=True)

df_pr = df_pr[["author", "datetime", "type", "duration"]]

df = pd.concat([df_commits, df_pr])

df.to_csv("content/images/yt_repo.csv", columns=["author", "datetime", "type", "duration"])
