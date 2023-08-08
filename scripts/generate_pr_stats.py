import pandas as pd
import json
pull_requests = json.load(open("pr.json"))
# We're going to use json_normalize, but it has fewer options, so we have to do
# more manipulation after we load it.
df = pd.json_normalize(pull_requests)

# We only want the ones that are closed ...
df = df[(~df["closedAt"].isna()) & (df["state"] == "MERGED")]

df[["createdAt", "closedAt"]] = df[["createdAt", "closedAt"]].apply(pd.to_datetime)
df["duration"] = (df["closedAt"] - df["createdAt"]).dt.total_seconds()

pr_count = df.groupby("author.login").size()

df["author"] = df["author.name"]
df["author"].fillna(df["author.login"])
df["author"].fillna(df["author.id"])
df["author"].fillna("Automated Bot")

df.to_csv("content/images/pr_stats.csv", columns = ["createdAt", "closedAt", "author", "number", "duration"])
