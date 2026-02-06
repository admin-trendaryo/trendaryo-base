@echo off
echo ========================================
echo Starting Trendaryo - Frontend + Backend
echo ========================================
echo.
echo Installing dependencies if needed...
call npm install
echo.
echo Starting servers...
echo Frontend: http://localhost:8081
echo Backend API: http://localhost:3001
echo Admin Panel: http://localhost:8081/admin/login
echo.
echo Press Ctrl+C to stop all servers
echo ========================================
echo.
call npm run dev:all
