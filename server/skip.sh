HOST='127.0.0.1'

(
echo open "$HOST $1"
sleep 2
echo "$2"
sleep 2
echo "exit"
) | telnet