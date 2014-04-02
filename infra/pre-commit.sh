#!/bin/sh
PATH="/usr/local/bin:$PATH"
echo PRE COMMIT HOOK - BUMPING PATCH VERSION
/usr/local/bin/node ./infra/preCommitHook.js
git add package.json
grunt release
git add dist/

# INSTRUCTIONS
#
# 1- Create this file at .git/hooks/pre-commit (create 'hooks' folder in case it does not exist and leave the file extension-less)
# 2- Go to .git/hooks and run the command 'chmod +x pre-commit' to make sure this file is executable
# 3- For testing you can commit testing changes locally then unstage with the following command: 'git reset HEAD^'