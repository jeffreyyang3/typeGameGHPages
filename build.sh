#! /bin/bash
yarn build &&
cd dist &&
cp ../index.html . &&
git init &&
git add -A &&
git commit -m "deploy" &&
git push -f git@github.com:jeffreyyang3/typeGameGHPages.git master:dist



