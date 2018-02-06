@echo off

call git checkout master

set current=%cd%
pushd ..
set parent=%cd%
popd

echo current %current%
echo parent %parent%

if not x%current:angular-client=%==x%current% goto start;

goto usage_error:

:start

if exist ../docs (
  rd /s /q ..\docs 
) 

mkdir ..\docs

call ng build --prod 

call xcopy /s .\dist\*.* ..\docs

call git add ../docs/*
call git commit ../docs/* -m "Release angular client"

echo.
echo ***********************************************************************************************************************************
echo *                                                                                                                                 *
echo *   Warning: this next step will release the angular client to current production. Are you sure you want to go ahead with this?   *
echo *                                                                                                                                 *
echo ***********************************************************************************************************************************
echo.

call git push origin master

goto end


:usage_error 

echo Please run this script from the angular-client folder.

:end