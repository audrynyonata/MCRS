@echo off
setlocal
  set FLASK_ENV=development
  set FLASK_APP=app.py
  flask run
endlocal
