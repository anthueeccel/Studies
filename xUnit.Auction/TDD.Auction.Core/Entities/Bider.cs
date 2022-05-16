namespace TDD.AuctionSys.Core
{
    public class Bider
    {
        public string Name { get; }
        public Auction Auction { get; }

        public Bider(string name, Auction auction)
        {
            Name = name;
            Auction = auction;
        }
    }
}
