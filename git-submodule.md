# Git Submodules

- https://gist.github.com/gitaarik/8735255
- https://git-scm.com/book/en/v2/Git-Tools-Submodules

```sh
## Add
git submodule add https://github.com/chaconinc/DbConnector

git status

git diff --cached DbConnector
git diff --cached --submodule

git commit -am 'Add DbConnector module'
git push origin main

## Cloning
git clone --recurse-submodules https://github.com/chaconinc/MainProject

## Pulling in Upstream Changes from the Submodule Remote
cd module-dir && git fetch
cd main-dir && git diff --submodule
## one-liner (Git will go into your submodules and fetch and update for you.)
git submodule update --remote

git submodule status

git config --global diff.submodule log
git diff

## specify default branch to point to 'stable'
git config -f .gitmodules submodule.DbConnector.branch stable

git config status.submodulesummary 1
git status
git diff
git log -p --submodule

## Pushing
## Commit in the main project and push it up with the submodule changes
git commit -m 'pull submodule changes'
git push --recurse-submodules=check
```
