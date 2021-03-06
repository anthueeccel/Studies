using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Htttp2ServiceBus
{
    public static class Http2ServiceBusFunction
    {
        [FunctionName("Http2ServiceBusFunction")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            [ServiceBus("teste-queue", Connection = "ServiceBusConnection")] IAsyncCollector<string> collector,
            ILogger log)
        {
            log.LogInformation($"{nameof(Http2ServiceBusFunction)} requested.");

            string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name ??= data?.name;

            await collector.AddAsync(name);

            string responseMessage = string.IsNullOrEmpty(name)
                ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
                : $"{nameof(Http2ServiceBusFunction)} requested and function executed successfully.";

            return new OkObjectResult(responseMessage);
        }
    }
}
