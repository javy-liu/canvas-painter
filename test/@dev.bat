@echo off
echo [Pre-Requirement] Makesure install Node JS and set PATH.

set NODE=node

echo [INFO] Start projects at http://localhost:3000
call %NODE% app
if errorlevel 1 goto error

goto end
:error
echo Error Happen!!
:end
pause