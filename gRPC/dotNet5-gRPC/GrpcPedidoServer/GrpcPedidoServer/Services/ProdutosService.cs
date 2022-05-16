using Grpc.Core;
using GrpcProduto;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GrpcProdutoServer.Services
{
    public class ProdutosService : Produto.ProdutoBase
    {
        private readonly ILogger<ProdutosService> _logger;

        public ProdutosService(ILogger<ProdutosService> logger)
        {
            _logger = logger;
        }

        public override Task<ProdutoModel> GetProdutoInfo(ProdutoLookupModel request, ServerCallContext context)
        {
            ProdutoModel output = new ProdutoModel();

            if (request.Id == 1)
            {
                output.Produto = "Becks";
                output.Tipo = "pack6";
                output.Preco = 11.98;
                output.Ativo = false;
            }
            else if (request.Id == 2)
            {
                output.Produto = "Franziskaner";
                output.Tipo = "gfa600";
                output.Preco = 4.90;
                output.Ativo = true;
            }
            else if (request.Id == 3)
            {
                output.Produto = "Pepsi";
                output.Tipo = "gfa200";
                output.Preco = 0.90;
                output.Ativo = true;
            }
            else
            {
                output.Produto = "Corona";
                output.Tipo = "longneck350";
                output.Preco = 1.18;
                output.Ativo = true;
            }

            return Task.FromResult(output);
        }

        public override async Task GetNewProdutos(NewProdutoRequest request, IServerStreamWriter<ProdutoModel> responseStream, ServerCallContext context)
        {
            var Produtos = new List<ProdutoModel>
            {
                new ProdutoModel
                {
                    Produto = "Guaraná 2L",
                    Tipo = "pack4",
                    Ativo = true,
                    Preco = 12.50
                },
                new ProdutoModel
                {
                    Produto = "Brahma Duplo Malte Lata 355ml",
                    Tipo = "pack8",
                    Ativo = true,
                    Preco = 9.90
                },
                new ProdutoModel
                {
                    Produto = "Franziskaner 600ml",
                    Tipo = "pack20",
                    Ativo = true,
                    Preco = 44.00
                },
                new ProdutoModel
                {
                    Produto = "Skol 355ml",
                    Tipo = "pack12",
                    Ativo = true,
                    Preco = 6.90
                }
            };

            foreach (var Produto in Produtos)
            {
                await Task.Delay(500); //apenas para verificar a busca da lista
                await responseStream.WriteAsync(Produto);
            }
        }
    }
}
