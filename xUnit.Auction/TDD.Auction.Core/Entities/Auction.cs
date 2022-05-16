using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TDD.AuctionSys.Core
{
    public class Auction
    {
        private IList<Bid> _bids;
        public IEnumerable<Bid> Bids => _bids;
        public string Item { get; }
        public Bid Winner { get; private set; }

        public Auction(string item)
        {
            Item = item;
            _bids = new List<Bid>();
        }

        public void GetBid(Bider bider, double value)
        {
            _bids.Add(new Bid(bider, value));
        }

        public void StartAuction()
        {

        }

        public void StopAuction()
        {
            Winner = Bids
                .OrderBy(v => v.Value)
                .Last();
        }
    }
}