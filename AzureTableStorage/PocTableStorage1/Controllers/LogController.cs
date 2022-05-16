using Microsoft.AspNetCore.Mvc;

namespace PocTableStorage1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogController : ControllerBase
    {
        public TableService _tableService;

        public LogController(TableService tableService)
        {
            _tableService = tableService;
        }

        [HttpPost]
        public void CreateLog([FromBody] Log log)
        {
            var dictionary = new Dictionary<string, object>
            {
                {"Enviroment", log.Enviroment },
                {"Thread", log.Thread },
                {"Level", log.Level },
                {"Logger", log.Logger },
                {"Message", log.Message },
                {"Exception", log.Exception }
            };

            var tableInsert = new TableStorageInsert()
            {
                Id = log.Id,
                Application = log.Application,
                Dictionary = dictionary
            };

            _tableService.InsertTableEntity(tableInsert);
        }

        [HttpGet]
        [Route("buscar-logs")]
        public IActionResult GetAllLog([FromBody] LogRequestDto log)
        {
            return Ok(_tableService.GetAllLog(log));            
        }

        [HttpPost]
        [Route("atualizar-application")]
        public IActionResult UpdateApplication([FromBody] ApplicationRequestDto application)
        {
            _tableService.UpdateApplication(application);

            return Ok();
        }

        [HttpPost]
        [Route("generico")]
        public void CreateApplication([FromBody] TableStorageInsert application)
        {          
            _tableService.InsertTableEntity(application);
        }
    }
}
