using Azure.Data.Tables;

namespace PocTableStorage1
{
    public class Log
    {
        public string Id { get; set; }
        public string Application { get; set; }
        public string Enviroment { get; set; }
        public string Thread { get; set; }
        public string Level { get; set; }
        public string Logger { get; set; }
        public string Message { get; set; }
        public string Exception { get; set; }

        public Log()
        {
        }
    }
}
