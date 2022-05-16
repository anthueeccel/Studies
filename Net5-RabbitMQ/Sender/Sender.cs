using RabbitMQ.Client;
using System;
using System.Text;

public class Sender
{
    public static void Main()
    {
        var continueListening = true;

        while (continueListening)
        {
            continueListening = MainMenu();
        }

    }

    private static bool MainMenu()
    {
        Console.Clear();
        Console.WriteLine("Choose an option:");
        Console.WriteLine("1) Send message (RabbitMQ)");
        Console.WriteLine("2) Exit");
        Console.Write("\r\n Option => ");

        switch (Console.ReadLine())
        {
            case "1":
                SendMessage();
                return true;
            case "2":
                return false;
            default:
                return true;
        }
    }

    private static void SendMessage()
    {
        var factory = new ConnectionFactory() { HostName = "localhost" };

        using (var connection = factory.CreateConnection())
        using (var channel = connection.CreateModel())
        {
            channel.QueueDeclare(queue: "queue_message_id",
                                        durable: false,
                                        exclusive: false,
                                        autoDelete: false,
                                        arguments: null);

            Console.Write("\r\nType a message do send via RabbitMQ: ");
            var message = Console.ReadLine();

            var body = Encoding.UTF8.GetBytes(message);

            channel.BasicPublish(exchange: "",
                                 routingKey: "queue_message_id",
                                 basicProperties: null,
                                 body: body);
            Console.WriteLine("\r\nMessage sent: {0}", message);
            Console.WriteLine("\r\n[enter] to continue");
            Console.ReadKey();
        }
    }
}