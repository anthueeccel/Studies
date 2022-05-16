namespace PocTableStorage1
{
    public class LogRequestDto
    {
        public string Application { get; set; }
        public string Level { get; set; }
        public string Logger { get; set; }
        public string Exception { get; set; }
        public int QuantityLogs { get; set; }

        public LogRequestDto()
        {
        }
    }
}
