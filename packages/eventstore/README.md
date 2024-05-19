https://hub.docker.com/r/eventstore/eventstore/tags?page=&page_size=&ordering=&name=arm

docker run --name esdb-node -it -p 2113:2113 \                                              ~/workdir/backend-ts-hands-on/packages/eventstore [feature/eventstore]
eventstore/eventstore:latest --insecure --run-projections=All
--enable-atom-pub-over-http


商用でないとBrowserからstreamを確認できない


https://developers.eventstore.com/clients/grpc/#connection-details でNodeURLでlocalhostを指定

$correlationId はトレース用のIDっぽい
