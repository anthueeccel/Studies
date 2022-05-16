namespace TDD.AuctionSys.Core
{
    public class Bid
    {
        public Bider Bider { get; set; }
        public double Value { get; set; }

        public Bid(Bider bider, double value)
        {
            Bider = bider;
            Value = value;
        }
    }
}
