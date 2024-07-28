git submodule add https://github.com/BlazerYoo/SignMan SignMan
echo ------------------------------------------------------------------
git status
echo ------------------------------------------------------------------
git add .gitmodules path/to/desired/sub-repo
echo ------------------------------------------------------------------
git commit -m "add signman as submodule"
echo ------------------------------------------------------------------
git push