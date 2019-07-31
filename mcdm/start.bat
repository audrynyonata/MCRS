@echo off
setlocal
  CALL env\Scripts\activate
  set FLASK_ENV=development
  set FLASK_APP=app.py
  python -m flask run
endlocal
