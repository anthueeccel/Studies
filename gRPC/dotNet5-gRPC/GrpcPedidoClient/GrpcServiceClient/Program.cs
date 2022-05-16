using Grpc.Core;
using Grpc.Net.Client;
using GrpcProduto;
using System;
using System.Threading.Tasks;

namespace GrpcProdutoClient
{
    class Program
    {
        static async Task Main(string[] args)
        {
            //// The port number(5001) must match the port of the gRPC server.
            //using var channel = GrpcChannel.ForAddress("https://localhost:5001");
            //var client = new Greeter.GreeterClient(channel);

            //var message = "ServiceCliente message";

            //Console.WriteLine("Press any key to send the message to gRPC server: " + message);
            //Console.ReadKey();
            //var reply = await client.SayHelloAsync(
            //                  new HelloRequest { Name = message });
            //Console.WriteLine("Replied message: " + reply.Message);

            var channel = GrpcChannel.ForAddress("https://localhost:5001");
            var ProdutoClient = new Produto.ProdutoClient(channel);

            Console.Write("Digite o Id do Produto: ");            
            var ProdutoId = new ProdutoLookupModel { Id = Convert.ToInt32(Console.ReadLine()) };

            var Produto = await ProdutoClient.GetProdutoInfoAsync(ProdutoId);

            var ativo = Produto.Ativo ? "Ativo" : "Inativo";
            Console.WriteLine($"GetProdutoInfo: {ProdutoId.Id} | {Produto.Produto} - {Produto.Tipo} - {Produto.Preco} - {ativo}");

            Console.WriteLine("");
            Console.WriteLine("Lista de Produtos:");
            using (var call = ProdutoClient.GetNewProdutos(new NewProdutoRequest()))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    var ProdutoAtual = call.ResponseStream.Current;
                    ativo = ProdutoAtual.Ativo ? "Ativo" : "Inativo";
                    Console.WriteLine($"{ProdutoAtual.Produto} - {ProdutoAtual.Tipo} - {ProdutoAtual.Preco} - {ativo}");
                }
            }

            Console.WriteLine("");
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }
}
