using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;

public class Receiver
{
    public static void Main()
    {
        var factory = new ConnectionFactory() { HostName = "localhost" };
        
        using (var connection = factory.CreateConnection())
        using (var channel = connection.CreateModel())
        {
            Console.WriteLine(" [*] Waiting for messages.");

            while (true)
            {
                channel.QueueDeclare(queue: "queue_message_id", durable: false, exclusive: false, autoDelete: false, arguments: null);

                var consumer = new EventingBasicConsumer(channel);

                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine("\r\nMessage received: {0}", message);
                };
                channel.BasicConsume(queue: "queue_message_id", autoAck: true, consumer: consumer);
            }
        }
    }
}