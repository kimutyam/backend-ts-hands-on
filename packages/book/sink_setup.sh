export json="{
  \"Sink\": \"https://enkb1keveb5r.x.pipedream.net\"
}"

curl -i \
  -H "Content-Type: application/json" \
  -u "admin:changeit" \
  -d $json \
  https://localhost:2113/connectors/my-connector

