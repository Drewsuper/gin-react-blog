cd /api
touch app.log
go mod tidy
go run main.go > app.log
echo $!
if [ $? -eq 0 ];then
    echo "start successfully"
else
    echo "start failed"
fi

