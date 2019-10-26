@echo off
cd ..
git add .
set /P id="Enter commit text: "
git commit -am %id%
git push