#!/bin/bash

echo "updating gh-pages branch" &&
git checkout gh-pages &&
git fetch &&
git reset --hard origin/master &&

echo "running webpack" &&
cd example &&
npx webpack --config webpack.config.js &&

cd ../homepage &&
npx webpack --config webpack.config.js &&

echo "moving dist files to root dir" &&
cd .. &&
cp ./example/dist/* ./example &&
cp ./homepage/dist/* ./homepage &&

echo "committing & pushing gh-pages" &&
git add ./ &&
git commit -m 'Deploy To Github Pages' &&
git push -f origin gh-pages &&

echo "returning to initial state" &&
cd - &&
git checkout -
