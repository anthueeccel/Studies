using Azure.Data.Tables;

namespace PocTableStorage1
{
    public class TableService
    {
        public TableClient _tableClient;

        public TableService(TableClient tableClient)
        {
            _tableClient = tableClient;
        }

        public void InsertTableEntity(TableStorageInsert tableInsert)
        {

            TableEntity entity = new TableEntity();
            entity.PartitionKey = tableInsert.Id;
            entity.RowKey = tableInsert.Application;

            for (int i = 0; i < tableInsert.Dictionary?.Count; i++)
            {
                var row = tableInsert.Dictionary.ElementAt(i);
                entity[row.Key] = row.Value;
            }

            _tableClient.AddEntity(entity);
        }

        public void GetTableEntity(Log log)
        {

            TableEntity entity = new TableEntity();
            entity.PartitionKey = log.Id;
            entity.RowKey = $"{log.Application}";

            // The other values are added like a items to a dictionary
            entity["Enviroment"] = log.Enviroment;
            entity["Thread"] = log.Thread;
            entity["Level"] = log.Level;
            entity["Logger"] = log.Logger;
            entity["Message"] = log.Message;
            entity["Exception"] = log.Exception;

        }

        public List<TableEntity> GetAllLog(LogRequestDto log)
        {
            TableEntity entity = new();
            entity.RowKey = log.Application;

            //_tableStorageRepository.GetAllEntities(log)

            return _tableClient.Query<TableEntity>()
                .Where(x => x.RowKey == entity.RowKey && x.Timestamp > DateTime.UtcNow.AddMinutes(-150))
                .ToList();
        }

        public void UpdateApplication(ApplicationRequestDto application)
        {
            var entity = new TableEntity
            {
                PartitionKey = application.Application,
                RowKey = application.TeamsChannel
            };


            _tableClient.UpdateEntity(entity, Azure.ETag.All, TableUpdateMode.Merge);            
        }
    }
}
