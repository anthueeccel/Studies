# dotNet5-gRPC Example
Simple implementation of a new entity in gRPC bases: "Pedido"

### gRPC Server project
* Create Protocol Buffer file. Into Protos folder >  Add > new Item > Protocol Buffer File > pedido.proto
Create models to communicate from server to client

* pedido.proto > Properties > gRPC Stub Classes > Server only

* Build > Rebuild GrpcPedidoServer

* Create Service. Into Services folder > Add new Item > Class > PedidosService.cs

* Build > Rebuild Solution
* Build > Rebuild GrpcPedidoServer

### gRPC Client project
* copy pedido.proto and paste it in Proto folder.
* pedido.proto > Properties > gRPC Stub Classes > Client only
Obs: you can point to the same file if you want it, then let the properties as Client and Server.

* Build > Rebuild Solution
* Build > Rebuild GrpcPedidoClient

Remeber to set in the csproj file Protobuf tag as Client or Server in both projects.

# Other Examples

This directory contains examples for all the C-based gRPC implementations. 
Each language subdirectory contains a Hello World example and more:

* [C#](csharp)
* protos

For a complete list of supported languages, see [Supported languages][lang].

For comprehensive documentation, including an [Introduction to gRPC][intro] and tutorials that use this example code, visit [grpc.io](https://grpc.io).

[intro]: https://grpc.io/docs/what-is-grpc/introduction
[lang]: https://grpc.io/docs/languages/
